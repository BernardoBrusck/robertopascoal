/**
 * Global upload tracking store (outside React).
 * Used by UploadToast to show progress across the entire admin panel.
 */
export interface UploadItem {
  id: string;
  name: string;
  status: "uploading" | "done" | "error";
}

type Listener = () => void;

let uploads: UploadItem[] = [];
const listeners = new Set<Listener>();
let clearTimer: ReturnType<typeof setTimeout> | null = null;

function notify() {
  listeners.forEach((l) => l());
}

export const uploadStore = {
  getSnapshot: (): UploadItem[] => uploads,

  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  /** Add a new upload entry. Returns its unique ID. */
  add: (name: string): string => {
    if (clearTimer) {
      clearTimeout(clearTimer);
      clearTimer = null;
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    uploads = [...uploads, { id, name, status: "uploading" }];
    notify();
    return id;
  },

  /** Mark an upload as completed. */
  done: (id: string) => {
    uploads = uploads.map((u) => (u.id === id ? { ...u, status: "done" } : u));
    notify();
    // Auto-clear the list 4s after ALL uploads finish
    const allDone = uploads.every((u) => u.status !== "uploading");
    if (allDone) {
      clearTimer = setTimeout(() => {
        uploads = [];
        notify();
      }, 4000);
    }
  },

  /** Mark an upload as failed. */
  error: (id: string) => {
    uploads = uploads.map((u) => (u.id === id ? { ...u, status: "error" } : u));
    notify();
    // Also check if all are done
    const allDone = uploads.every((u) => u.status !== "uploading");
    if (allDone) {
      clearTimer = setTimeout(() => {
        uploads = [];
        notify();
      }, 5000);
    }
  },

  /** Immediately clear all entries. */
  clear: () => {
    if (clearTimer) {
      clearTimeout(clearTimer);
      clearTimer = null;
    }
    uploads = [];
    notify();
  },
};

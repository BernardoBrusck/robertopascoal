import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Media from "@/pages/admin/Media";

interface MediaItem {
  id: string;
  url: string;
  alt_text: string | null;
  created_at: string;
}

interface MediaPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  multiple?: boolean;
  onSelect: (items: MediaItem[]) => void;
}

const MediaPickerModal = ({ open, onOpenChange, multiple = false, onSelect }: MediaPickerModalProps) => {
  const handleSelect = (items: MediaItem[]) => {
    onSelect(items);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Biblioteca de Mídia</DialogTitle>
        </DialogHeader>
        <Media mode="modal" multiple={multiple} onSelect={handleSelect} />
      </DialogContent>
    </Dialog>
  );
};

export default MediaPickerModal;

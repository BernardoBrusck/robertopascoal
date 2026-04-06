/**
 * Compresses an image file to WebP format using the Canvas API.
 * 
 * Returns the original file unchanged if:
 * - It's not a compressible image (SVG, GIF, non-image files pass through)
 * - The compressed version is larger than the original
 */
export async function compressImage(file: File): Promise<File> {
  // Only compress raster images
  const compressibleTypes = ["image/jpeg", "image/png", "image/webp", "image/bmp"];
  if (!compressibleTypes.includes(file.type)) return file;

  return new Promise<File>((resolve) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            // Compressed version is larger or failed — keep original
            resolve(file);
            return;
          }
          const newName = file.name.replace(/\.[^.]+$/, ".webp");
          resolve(new File([blob], newName, { type: "image/webp" }));
        },
        "image/webp",
        0.82
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Checks if a file is an image that will be compressed on upload.
 */
export function isCompressibleImage(file: File): boolean {
  return ["image/jpeg", "image/png", "image/webp", "image/bmp"].includes(file.type);
}

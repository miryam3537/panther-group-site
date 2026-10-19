const MAX_EDGE = 2000;
const WEBP_QUALITY = 0.82;

function isSvg(file: File) {
  return file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
}

function isGif(file: File) {
  return file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif");
}

/** Shrink a new JPG/PNG/WebP before upload. Existing Supabase files are left untouched. */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (isSvg(file) || isGif(file)) return file;
  if (!file.type.startsWith("image/") && !/\.(png|jpe?g|webp)$/i.test(file.name)) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const longest = Math.max(bitmap.width, bitmap.height);
    const alreadyFits = file.type === "image/webp" && longest <= MAX_EDGE;
    if (alreadyFits) {
      bitmap.close();
      return file;
    }

    const scale = Math.min(1, MAX_EDGE / longest);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY);
    });

    // Keep the original when the browser cannot encode WebP, or when WebP is not smaller.
    if (!blob || blob.size >= file.size) return file;

    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${base}.webp`, { type: "image/webp" });
  } catch {
    return file;
  }
}

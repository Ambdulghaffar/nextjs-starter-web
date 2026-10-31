/** Image d'aperçu (première frame) d'une vidéo Cloudinary */
export function videoPoster(url: string): string {
  if (!url.includes("/video/upload/")) return "";
  return url
    .replace("/upload/", "/upload/so_0,q_auto/")
    .replace(/\.\w+$/, ".jpg");
}

/** Compression automatique côté Cloudinary */
export function optimizedVideoUrl(url: string): string {
  return url.includes("/video/upload/")
    ? url.replace("/upload/", "/upload/q_auto/")
    : url;
}

/** Zoom automatique côté Cloudinary */
export function imageZoomUrl(url: string): string {
  return url.replace(
    /\/upload\/[^/]+\//,
    "/upload/w_1600,q_auto:best,f_auto,c_limit/",
  );
}

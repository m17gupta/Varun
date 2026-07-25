import { Cloudinary } from "@cloudinary/url-gen"

export const cld = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
})

export function getUploadWidgetOptions() {
  return {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    sources: ["local", "url", "camera"],
    clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
    theme: "minimal",
    styles: {
      palette: {
        window: "#FFFFFF",
        windowBorder: "#e2e8f0",
        tabIcon: "#063A1D",
        menuIcons: "#063A1D",
        textDark: "#000000",
        textLight: "#FFFFFF",
        link: "#063A1D",
        action: "#063A1D",
        inactiveTabIcon: "#94a3b8",
        error: "#dc2626",
        inProgress: "#063A1D",
        complete: "#22c55e",
        sourceBg: "#f8fafc",
      },
    },
  }
}

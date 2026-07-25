"use client"

import { useEffect, useRef, useState } from "react"
import { Upload, ImageIcon, Loader2 } from "lucide-react"
import { getUploadWidgetOptions } from "@/lib/cloudinary"

interface CloudinaryUploadProps {
  value: string
  onChange: (url: string) => void
}

type CloudinaryWidget = {
  open: () => void
  close: () => void
  destroy: () => void
}

export function CloudinaryUpload({ value, onChange }: CloudinaryUploadProps) {
  const widgetRef = useRef<CloudinaryWidget | null>(null)
  const [loaded, setLoaded] = useState(false)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if ((window as any).cloudinary) { setLoaded(true); return }

    const script = document.createElement("script")
    script.src = "https://upload-widget.cloudinary.com/global/all.js"
    script.async = true
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)
    return () => { script.remove() }
  }, [])

  useEffect(() => {
    if (!loaded) return

    const options = getUploadWidgetOptions()

    widgetRef.current = (window as any).cloudinary.createUploadWidget(
      options,
      (_error: unknown, result: { event: string; info: { secure_url: string } }) => {
        if (result.event === "success") {
          onChangeRef.current(result.info.secure_url)
        }
      },
    ) as CloudinaryWidget

    return () => {
      widgetRef.current?.destroy()
    }
  }, [loaded])

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => widgetRef.current?.open()}
          disabled={!loaded}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-input bg-background px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          {loaded ? <Upload className="size-4" /> : <Loader2 className="size-4 animate-spin" />}
          {loaded ? "Upload Image" : "Loading…"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-destructive hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      {value ? (
        <div className="relative aspect-[1.28/1] w-full max-w-[280px] overflow-hidden rounded-lg border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Book cover preview"
            className="size-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[1.28/1] w-full max-w-[280px] items-center justify-center rounded-lg border border-dashed bg-muted/50">
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
            <ImageIcon className="size-8 opacity-40" />
            <span>No cover selected</span>
          </div>
        </div>
      )}
    </div>
  )
}

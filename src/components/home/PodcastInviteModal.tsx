"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAppDispatch } from "@/lib/store/hooks"
import { createInvitationThunk } from "@/lib/store/invitations/invitationThunks"
import type { InvitationFormData } from "@/lib/store/invitations/invitationTypes"

interface PodcastInviteModalProps {
  open: boolean
  onClose: () => void
}

export function PodcastInviteModal({ open, onClose }: PodcastInviteModalProps) {
  const dispatch = useAppDispatch()
  const [saving, setSaving] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<InvitationFormData>({
    name: "",
    email: "",
    phone: "",
    youtubeUrl: "",
    instagramUrl: "",
    theme: "",
  })

  function set<K extends keyof InvitationFormData>(key: K, value: InvitationFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSaveMessage(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    const result = await dispatch(createInvitationThunk(form))
    setSaving(false)
    if (createInvitationThunk.fulfilled.match(result)) {
      setSent(true)
      setForm({ name: "", email: "", phone: "", youtubeUrl: "", instagramUrl: "", theme: "" })
    } else {
      setError(result.payload as string)
    }
  }

  function handleClose() {
    setSent(false)
    setError(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-lg rounded-2xl border border-border/10 bg-dark-gray p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full text-card/40 transition-colors hover:bg-card/10 hover:text-card"
            >
              <X className="size-4" />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="size-12 text-tan" />
                <h3 className="mt-4 font-serif text-2xl text-card">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-card/55">
                  Thank you for the invitation. We&rsquo;ll get back to you soon.
                </p>
                <Button
                  type="button"
                  size="lg"
                  className="mt-8 w-full bg-card text-dark hover:bg-card/90"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-card">Let&rsquo;s record a conversation</h3>
                <p className="mt-2 text-sm leading-6 text-card/55">
                  Questions about dharma, history, and the living wisdom of the Mahabharata
                  deserve more than a paragraph. Invite me onto your show.
                </p>

                <form className="mt-8 space-y-5" onSubmit={handleSaveMessage}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="modal-name" className="text-card/70">Name</Label>
                      <Input
                        id="modal-name"
                        placeholder="Your name"
                        required
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="border-border/20 bg-black/20 text-card placeholder:text-card/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-email" className="text-card/70">Email</Label>
                      <Input
                        id="modal-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className="border-border/20 bg-black/20 text-card placeholder:text-card/30"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="modal-phone" className="text-card/70">Phone</Label>
                      <Input
                        id="modal-phone"
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className="border-border/20 bg-black/20 text-card placeholder:text-card/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-youtube" className="text-card/70">YouTube Channel</Label>
                      <Input
                        id="modal-youtube"
                        type="url"
                        placeholder="https://youtube.com/@yourchannel"
                        value={form.youtubeUrl}
                        onChange={(e) => set("youtubeUrl", e.target.value)}
                        className="border-border/20 bg-black/20 text-card placeholder:text-card/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modal-instagram" className="text-card/70">Instagram</Label>
                    <Input
                      id="modal-instagram"
                      type="url"
                      placeholder="https://instagram.com/yourhandle"
                      value={form.instagramUrl}
                      onChange={(e) => set("instagramUrl", e.target.value)}
                      className="border-border/20 bg-black/20 text-card placeholder:text-card/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modal-theme" className="text-card/70">Podcast Theme</Label>
                    <Textarea
                      id="modal-theme"
                      placeholder="What would you like to discuss on the podcast?"
                      className="min-h-[120px] border-border/20 bg-black/20 text-card placeholder:text-card/30"
                      required
                      value={form.theme}
                      onChange={(e) => set("theme", e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-card text-dark hover:bg-card/90"
                    disabled={saving}
                  >
                    {saving && <Loader2 className="size-4 animate-spin" />}
                    {saving ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

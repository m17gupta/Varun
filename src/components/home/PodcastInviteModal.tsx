"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface PodcastInviteModalProps {
  open: boolean
  onClose: () => void
}

export function PodcastInviteModal({ open, onClose }: PodcastInviteModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
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
              onClick={onClose}
              className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full text-card/40 transition-colors hover:bg-card/10 hover:text-card"
            >
              <X className="size-4" />
            </button>

            <h3 className="font-serif text-2xl text-card">Let&rsquo;s record a conversation</h3>
            <p className="mt-2 text-sm leading-6 text-card/55">
              Questions about dharma, history, and the living wisdom of the Mahabharata
              deserve more than a paragraph. Invite me onto your show.
            </p>

            <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="modal-name" className="text-card/70">Name</Label>
                  <Input id="modal-name" placeholder="Your name" required className="border-border/20 bg-black/20 text-card placeholder:text-card/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-email" className="text-card/70">Email</Label>
                  <Input id="modal-email" type="email" placeholder="you@example.com" required className="border-border/20 bg-black/20 text-card placeholder:text-card/30" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="modal-phone" className="text-card/70">Phone</Label>
                  <Input id="modal-phone" type="tel" placeholder="+91 00000 00000" className="border-border/20 bg-black/20 text-card placeholder:text-card/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-youtube" className="text-card/70">YouTube Channel</Label>
                  <Input id="modal-youtube" type="url" placeholder="https://youtube.com/@yourchannel" className="border-border/20 bg-black/20 text-card placeholder:text-card/30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-instagram" className="text-card/70">Instagram</Label>
                <Input id="modal-instagram" type="url" placeholder="https://instagram.com/yourhandle" className="border-border/20 bg-black/20 text-card placeholder:text-card/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-theme" className="text-card/70">Podcast Theme</Label>
                <Textarea
                  id="modal-theme"
                  placeholder="What would you like to discuss on the podcast?"
                  className="min-h-[120px] border-border/20 bg-black/20 text-card placeholder:text-card/30"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-card text-dark hover:bg-card/90">
                Send Message
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

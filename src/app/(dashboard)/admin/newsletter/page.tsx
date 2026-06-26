"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Send, Clock, CheckCircle2, XCircle } from "lucide-react"
import type { INewsletter } from "@/types/content"

export default function AdminNewsletterPage() {
  const [pastNewsletters, setPastNewsletters] = useState<INewsletter[]>([])
  const [loading, setLoading] = useState(true)
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [tier, setTier] = useState("all")
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [sendSuccess, setSendSuccess] = useState(false)

  useEffect(() => {
    async function fetchNewsletters() {
      try {
        const res = await fetch("/api/admin/newsletter")
        const data = await res.json()
        setPastNewsletters(data.data ?? [])
      } catch {
        setPastNewsletters([])
      } finally {
        setLoading(false)
      }
    }
    fetchNewsletters()
  }, [])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setSendError(null)
    setSendSuccess(false)
    setSending(true)

    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content, tier }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSendError(data.error || "Failed to send newsletter.")
        setSending(false)
        return
      }

      setSendSuccess(true)
      setSubject("")
      setContent("")
      setPastNewsletters((prev) => [
        {
          _id: data.data?._id ?? crypto.randomUUID(),
          subject,
          slug: "",
          content,
          published: true,
          sentAt: new Date().toISOString() as unknown as Date,
          openRate: 0,
          clickRate: 0,
          tags: [],
          createdAt: new Date().toISOString() as unknown as Date,
          updatedAt: new Date().toISOString() as unknown as Date,
        },
        ...prev,
      ])
    } catch {
      setSendError("Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Newsletter</h1>
        <p className="text-sm text-muted-foreground">
          Compose and send newsletters to your subscribers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compose Newsletter</CardTitle>
          <CardDescription>
            Write a new newsletter and send it to your audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="space-y-4">
            {sendError && (
              <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {sendError}
              </div>
            )}
            {sendSuccess && (
              <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600">
                Newsletter sent successfully!
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Your newsletter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your newsletter content here…"
                className="min-h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tier">Recipient Tier</Label>
              <Select value={tier} onValueChange={(val) => val && setTier(val)}>
                <SelectTrigger id="tier" className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscribers</SelectItem>
                  <SelectItem value="free">Free Members</SelectItem>
                  <SelectItem value="monthly">Monthly Members</SelectItem>
                  <SelectItem value="yearly">Yearly Members</SelectItem>
                  <SelectItem value="lifetime">Lifetime Members</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={sending}>
              <Send className="size-4" />
              {sending ? "Sending…" : "Send Newsletter"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Past Newsletters</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead>Click Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  </TableRow>
                ))
              : pastNewsletters.length === 0
                ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No newsletters sent yet
                    </TableCell>
                  </TableRow>
                )
                : pastNewsletters.map((nl) => (
                    <TableRow key={nl._id}>
                      <TableCell className="font-medium">{nl.subject}</TableCell>
                      <TableCell>
                        {nl.published ? (
                          <Badge variant="default">
                            <CheckCircle2 className="size-3 mr-1" />
                            Sent
                          </Badge>
                        ) : nl.scheduledAt ? (
                          <Badge variant="secondary">
                            <Clock className="size-3 mr-1" />
                            Scheduled
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <XCircle className="size-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {nl.sentAt
                          ? new Date(nl.sentAt).toLocaleDateString()
                          : nl.scheduledAt
                            ? new Date(nl.scheduledAt).toLocaleDateString()
                            : "—"}
                      </TableCell>
                      <TableCell>{nl.openRate != null ? `${nl.openRate}%` : "—"}</TableCell>
                      <TableCell>{nl.clickRate != null ? `${nl.clickRate}%` : "—"}</TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"
import type { IMember } from "@/types/content"

const roleColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  admin: "destructive",
  paid_member: "default",
  free_member: "secondary",
}

const tierLabels: Record<string, string> = {
  free: "Free",
  monthly: "Monthly",
  yearly: "Yearly",
  lifetime: "Lifetime",
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<IMember[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  useEffect(() => {
    async function fetchMembers() {
      try {
        const params = new URLSearchParams()
        if (roleFilter !== "all") params.set("role", roleFilter)
        if (search) params.set("search", search)
        const res = await fetch(`/api/admin/members?${params}`)
        const data = await res.json()
        setMembers(data.data ?? [])
      } catch {
        setMembers([])
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [roleFilter, search])

  async function handleRoleChange(memberId: string, role: string) {
    try {
      await fetch(`/api/admin/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      })
      setMembers((prev) =>
        prev.map((m) => (m._id === memberId ? { ...m, role: role as IMember["role"] } : m)),
      )
    } catch {
      // ignore
    }
  }

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Members</h1>
        <p className="text-sm text-muted-foreground">
          Manage all registered members, roles, and subscriptions
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members…"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={(val) => val && setRoleFilter(val)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="paid_member">Paid Member</SelectItem>
            <SelectItem value="free_member">Free Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                </TableRow>
              ))
            : members.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No members found
                  </TableCell>
                </TableRow>
              )
              : members.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback>{initials(member.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Select
                        value={member.role}
                        onValueChange={(val) => val && handleRoleChange(member._id, val)}
                      >
                        <SelectTrigger size="sm" className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="paid_member">Paid Member</SelectItem>
                          <SelectItem value="free_member">Free Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tierLabels[member.tier] ?? member.tier}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.subscriptionStatus === "active"
                            ? "default"
                            : member.subscriptionStatus === "past_due" || member.subscriptionStatus === "canceled"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {member.subscriptionStatus?.replace("_", " ") ?? "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import { useEffect } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchBooksThunk, deleteBookThunk } from "@/lib/store/books/booksThunks"

export default function AdminBooksPage() {
  const dispatch = useAppDispatch()
  const { books, loading, isFetchedBooks } = useAppSelector((s) => s.books)

  useEffect(() => {
    if (!isFetchedBooks) dispatch(fetchBooksThunk())
  }, [dispatch, isFetchedBooks])

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this book?")) return
    dispatch(deleteBookThunk(id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Books</h1>
          <p className="text-sm text-muted-foreground">
            Manage published books and essay series
          </p>
        </div>
        <Link
          href="/admin/books/new"
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground whitespace-nowrap transition-all hover:bg-primary/80"
        >
          <Plus className="size-4" />
          Add New
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search books…"
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="size-10 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            : books.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No books found
                  </TableCell>
                </TableRow>
              )
              : books.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>
                      {book.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.image}
                          alt=""
                          className="size-10 rounded object-cover"
                        />
                      ) : (
                        <div className="size-10 rounded bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={book.published ? "default" : "secondary"}>
                        {book.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/books/${book._id}`}
                          className="inline-flex size-7 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground"
                        >
                          <Edit className="size-4" />
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => book._id && handleDelete(book._id)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </div>
  )
}

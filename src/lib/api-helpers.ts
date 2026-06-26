import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Member from "@/models/Member";
import type { IMemberDocument } from "@/models/Member";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

export function apiPaginated<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(total / limit);
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
}

export async function getAuthUser(): Promise<IMemberDocument | null> {
  const session = await auth();
  if (!session?.user?.email) return null;
  const member = await Member.findOne({ email: session.user.email });
  return member;
}

export async function requireAdmin(): Promise<IMemberDocument> {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

interface PaginationQuery {
  page: number;
  limit: number;
  sort: string;
  order: "asc" | "desc";
  skip: number;
}

export function parsePagination(searchParams: URLSearchParams): PaginationQuery {
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
  const sort = searchParams.get("sort") ?? "createdAt";
  const order = (searchParams.get("order") ?? "desc") as "asc" | "desc";
  const skip = (page - 1) * limit;
  return { page, limit, sort, order, skip };
}

export function sortOrder(order: "asc" | "desc"): 1 | -1 {
  return order === "asc" ? 1 : -1;
}

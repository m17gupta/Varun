import { z } from "zod";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { apiSuccess, apiError, requireAdmin } from "@/lib/api-helpers";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return apiError("No file provided", 400);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return apiError(
        `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}`,
        400,
      );
    }

    if (file.size > MAX_SIZE) {
      return apiError(`File too large. Max size: ${MAX_SIZE / 1024 / 1024}MB`, 400);
    }

    const ext = file.name.split(".").pop() ?? "bin";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const uploadDir = join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const url = `/uploads/${uniqueName}`;

    return apiSuccess({ url, fileName: file.name, size: file.size, type: file.type }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError(error instanceof Error ? error.message : "Upload failed", 500);
  }
}

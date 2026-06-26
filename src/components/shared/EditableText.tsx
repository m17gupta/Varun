import { cn } from "@/lib/utils"

interface EditableTextProps {
  value: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  className?: string
}

export function EditableText({
  value,
  as: Tag = "span",
  className,
}: EditableTextProps) {
  return <Tag className={cn(className)}>{value}</Tag>
}

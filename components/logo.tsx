import { BookOpenCheck } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <BookOpenCheck className="w-8 h-8 text-brand-600" />
      <span className="font-bold text-xl">가천북스</span>
    </div>
  )
}


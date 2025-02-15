import { BookOpenCheck } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-1.5">
      <BookOpenCheck className="w-5 h-5 text-brand-600" />
      <span className="text-lg font-medium tracking-tight">
        Gachon<span className="text-brand-600">Books</span>
      </span>
    </div>
  );
}

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  placeholder?: string
}

export function SearchBar({ searchTerm, setSearchTerm, placeholder }: SearchBarProps) {
  return (
    <div className="flex items-center rounded-t-lg bg-[#014ea9] p-4">
      <Search className="mr-2 h-5 w-5 text-white" />
      <Input
        placeholder={placeholder || "Pesquisar..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-0 bg-[#014ea9]/20 text-white placeholder:text-white/70 focus-visible:ring-white/30"
      />
    </div>
  )
}

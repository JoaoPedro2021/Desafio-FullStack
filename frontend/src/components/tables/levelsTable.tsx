import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnTable, Nivel } from "@/types/type"
import { Search } from "lucide-react"
import { useState } from "react"
import { DialogExclusionLevel } from "../exclusionModals/dialogExclusionLevel"
import { FormEditLevel } from "../forms/level/levelEditForm"
import { Pagination } from "../pagination"
import { Button } from "../ui/button"

interface DevelopersProps {
  levels: Nivel[]
  columns: ColumnTable[]
}

export function LevelsTable({
  levels,
  columns
}: DevelopersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredLevels = levels.filter(
    (level) =>
      level.nivel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalItems = filteredLevels.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLevels = filteredLevels.slice(startIndex, startIndex + itemsPerPage)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToPreviousPage = () => {
    goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className="rounded-lg bg-[#1d1f27] shadow-lg">
      <div className="flex items-center rounded-t-lg bg-[#014ea9] p-4">
        <Search className="mr-2 h-5 w-5 text-white" />
        <Input
          placeholder="Pesquisar nível..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 bg-[#014ea9]/20 text-white placeholder:text-white/70 focus-visible:ring-white/30"
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-[#014ea9]/10">
            <TableRow className="w-full">
              {
                columns.map((column) => (
                  <TableHead key={column.header} className="text-white text-center">
                    {column.header}
                  </TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLevels.length > 0 ? (
              paginatedLevels.map((level) => (
                <TableRow key={level.id} className="border-b border-[#014ea9]/10 hover:bg-[#014ea9]/5">
                  <TableCell className="text-white text-center">{level.id}</TableCell>
                  <TableCell className="text-white text-center">{level.nivel}</TableCell>
                  <TableCell className="flex justify-center">
                    <DialogExclusionLevel levelId={level.id}>
                      <Button variant="destructive">Excluir</Button>
                    </DialogExclusionLevel>
                  </TableCell>

                  <TableCell className="text-center">
                    <FormEditLevel level={level}>
                      <Button variant="outline">Editar</Button>
                    </FormEditLevel>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-white">
                  Nenhum nível encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        handleItemsPerPageChange={handleItemsPerPageChange}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        textTotal="Total de níveis"
      />
    </div>
  )
}

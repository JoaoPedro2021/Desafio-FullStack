import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { ColumnTable, Nivel } from "@/types/type"
import { useState } from "react"
import { DialogExclusionLevel } from "../exclusionModals/dialogExclusionLevel"
import { FormEditLevel } from "../forms/level/levelEditForm"
import { Pagination } from "../pagination"
import { SearchBar } from "../searchBar"
import { Button } from "../ui/button"
import { CustomTableHeader } from "./tableHeader"

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
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedLevels = [...levels].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn as keyof Nivel]
    const bValue = b[sortColumn as keyof Nivel]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const filteredLevels = sortedLevels.filter(
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
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Pesquisar níveis..."} />
      <div className="overflow-x-auto">
        <Table className="w-full">
          <CustomTableHeader
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />
          <TableBody>
            {paginatedLevels.length > 0 ? (
              paginatedLevels.map((level) => (
                <TableRow key={level.id} className="border-b border-[#014ea9]/10 hover:bg-[#014ea9]/5">
                  <TableCell className="text-white text-center">{level.id}</TableCell>
                  <TableCell className="text-white text-center">{level.nivel}</TableCell>
                  <TableCell className="text-white text-center">{level.qtdDevs}</TableCell>
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

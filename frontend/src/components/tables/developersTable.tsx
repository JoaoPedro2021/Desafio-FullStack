import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { ColumnTable, Developer } from "@/types/type"
import { useState } from "react"
import { DialogExclusionDeveloper } from "../exclusionModals/dialogExclusionDeveloper"
import { FormEditDeveloper } from "../forms/developer/developerEditForm"
import { Pagination } from "../pagination"
import { SearchBar } from "../searchBar"
import { Button } from "../ui/button"
import { CustomTableHeader } from "./tableHeader"

interface DevelopersProps {
  devs: Developer[]
  columns: ColumnTable[]
}

export function DevelopersTable({
  devs,
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

  const sortedDevs = [...devs].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn as keyof Developer]
    const bValue = b[sortColumn as keyof Developer]

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

  const filteredDevelopers = sortedDevs.filter(
    (dev) =>
      dev.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.hobby.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.nivel.nivel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalItems = filteredDevelopers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDevelopers = filteredDevelopers.slice(startIndex, startIndex + itemsPerPage)

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
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={"Pesquisar desenvolvedor..."} />
      <div className="overflow-x-auto">
        <Table className="w-full">
          <CustomTableHeader
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />
          <TableBody>
            {paginatedDevelopers.length > 0 ? (
              paginatedDevelopers.map((developer) => (
                <TableRow key={developer.id} className="border-b border-[#014ea9]/10 hover:bg-[#014ea9]/5">
                  <TableCell className="text-white">{developer.id}</TableCell>
                  <TableCell className="text-white">{developer.nome}</TableCell>
                  <TableCell className="text-white">{developer.sexo}</TableCell>
                  <TableCell className="text-white">{formatDate(developer.data_nascimento)}</TableCell>
                  <TableCell className="text-white">{developer.idade}</TableCell>
                  <TableCell className="text-white">{developer.hobby}</TableCell>
                  <TableCell className="text-white">
                    {developer.nivel.nivel}
                  </TableCell>
                  <TableCell>
                    <DialogExclusionDeveloper devId={developer.id}>
                      <Button variant="destructive">Excluir</Button>
                    </DialogExclusionDeveloper>
                  </TableCell>

                  <TableCell>
                    <FormEditDeveloper dev={developer}>
                      <Button variant="outline">Editar</Button>
                    </FormEditDeveloper>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-white">
                  Nenhum desenvolvedor encontrado.
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
        textTotal="Total de desenvolvedores"
      />
    </div>
  )
}

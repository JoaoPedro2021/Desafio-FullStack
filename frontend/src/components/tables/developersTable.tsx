import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { ColumnTable, Developer } from "@/types/type"
import { Search } from "lucide-react"
import { useState } from "react"
import { DialogExclusionDeveloper } from "../exclusionModals/dialogExclusionDeveloper"
import { FormEditDeveloper } from "../forms/developer/developerEditForm"
import { Pagination } from "../pagination"
import { Button } from "../ui/button"

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

  const filteredDevelopers = devs.filter(
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
      <div className="mb-4 flex items-center rounded-t-lg bg-[#014ea9] p-4">
        <Search className="mr-2 h-5 w-5 text-white" />
        <Input
          placeholder="Pesquisar desenvolvedor..."
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
                  <TableHead key={column.header} className="text-white">
                    {column.header}
                  </TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
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

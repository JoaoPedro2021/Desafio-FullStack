import { Button } from "./ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  handleItemsPerPageChange: (value: string) => void
  goToPreviousPage: () => void
  goToNextPage: () => void
  textTotal: string
}
export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  handleItemsPerPageChange,
  goToPreviousPage,
  goToNextPage,
  textTotal
}: PaginationProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-b-lg bg-[#1d1f27] p-4 text-sm text-white/70">
      <div className="flex items-center space-x-2">
        <span>Mostrar</span>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(e.target.value)}
          className="rounded bg-[#014ea9]/20 px-2 py-1 text-white"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>por página</span>
      </div>

      <div>{textTotal}: {totalItems}</div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`rounded px-3 py-1 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "bg-[#014ea9]/20 hover:bg-[#014ea9]/30"
            }`}
        >
          Anterior
        </Button>

        <span>
          Página {currentPage} de {totalPages || 1}
        </span>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`rounded px-3 py-1 ${currentPage === totalPages || totalPages === 0
            ? "cursor-not-allowed opacity-50"
            : "bg-[#014ea9]/20 hover:bg-[#014ea9]/30"
            }`}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}

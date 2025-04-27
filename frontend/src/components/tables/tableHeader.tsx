import { ColumnTable } from "@/types/type"
import { TableHead, TableHeader, TableRow } from "../ui/table"

interface CustomTableHeaderProps {
  columns: ColumnTable[]
  sortColumn: string | null
  sortDirection: "asc" | "desc"
  handleSort: (column: string) => void
}

export function CustomTableHeader({
  columns,
  sortColumn,
  sortDirection,
  handleSort
}: CustomTableHeaderProps) {
  return (
    <TableHeader className="bg-[#014ea9]/10">
      <TableRow className="w-full">
        {
          columns.map((column) => (
            <TableHead
              key={column.accessorKey}
              className="text-white text-center cursor-pointer"
              onClick={() => column.accessorKey ? handleSort(column.accessorKey ?? "") : null}
            >
              {column.header}
              {sortColumn === column.accessorKey && (
                <span>
                  {sortDirection === "asc" ? " 🔼" : " 🔽"}
                </span>
              )}
            </TableHead>
          ))
        }
      </TableRow>
    </TableHeader>
  )
}

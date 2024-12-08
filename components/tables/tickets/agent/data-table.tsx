'use client'

import { Pagination } from '@/components/tables/tickets/agent/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowRightFromLine, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className='flex size-full flex-col space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <h3>Tickets</h3>
          <div className='rounded-sm border border-primary/15 bg-primary/10 px-2 text-sm text-primary'>
            {data.length}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Search...'
            className='h-8 min-w-48 px-3 text-xs placeholder:text-xs [&:not(:placeholder-shown)]:text-xs'
            value={
              (table.getColumn('subject')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('subject')?.setFilterValue(event.target.value)
            }
          />
          <Button variant={'outline'} size={'sm'}>
            <Filter className='size-4' />
            Filter
          </Button>
          <Button size={'sm'} variant={'outline'}>
            <ArrowRightFromLine className='size-4' />
            Export
          </Button>
        </div>
      </div>
      <div className='flex size-full flex-col space-y-4'>
        <div className='h-full overflow-hidden rounded-lg border bg-background'>
          <Table>
            <TableHeader className='bg-muted'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn('h-12 border-b', {
                          'cursor-pointer':
                            cell.column.id !== 'select' &&
                            cell.column.id !== 'actions',
                        })}
                        onClick={() => {
                          if (
                            cell.column.id !== 'select' &&
                            cell.column.id !== 'actions'
                          ) {
                            // @ts-expect-error - TODO: fix this
                            router.push(`/agent/tickets/${row.original.id}`)
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination table={table} />
      </div>
    </div>
  )
}

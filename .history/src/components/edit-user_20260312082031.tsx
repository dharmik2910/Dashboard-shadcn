"use client"

import * as React from "react"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { type User } from "@/lib/api"

import { z } from "zod"
import { FieldError } from "@/components/ui/field"

export const userUpdateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
})

export type UserUpdateValues = z.infer<typeof userUpdateSchema>

export function EditUserFields({
  user,
  onDataChange,
  errors: externalErrors
}: {
  user: User,
  onDataChange?: (data: any, isValid: boolean) => void,
  errors?: Record<string, string[]>
}) {
  const [formData, setFormData] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  })

  const [errors, setErrors] = React.useState<Record<string, string[]>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const updatedData = { ...formData, [id]: value }
    setFormData(updatedData)

    const result = userUpdateSchema.safeParse(updatedData)
    const newErrors: Record<string, string[]> = {}

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string
        if (!newErrors[path]) newErrors[path] = []
        newErrors[path].push(issue.message)
      })
    }

    setErrors(newErrors)
    onDataChange?.(updatedData, result.success)
  }

  const activeErrors = { ...errors, ...externalErrors }

  return (
    <div className="grid gap-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="firstName" className="flex items-center gap-2">
            First Name
          </FieldLabel>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder=""
            className={activeErrors.firstName ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}
          />
          {activeErrors.firstName?.map((err, i) => (
            <FieldError key={i} className="flex items-center gap-1">
              {err}
            </FieldError>
          ))}
        </Field>
        <Field>
          <FieldLabel htmlFor="lastName" className="flex items-center gap-2">
            Last Name
          </FieldLabel>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder=""
            className={activeErrors.lastName ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}
          />
          {activeErrors.lastName?.map((err, i) => (
            <FieldError key={i} className="flex items-center gap-1">
              {err}
            </FieldError>
          ))}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="email" className="flex items-center gap-2">
          Email Address
        </FieldLabel>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=""
          className={activeErrors.email ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}
        />
        {activeErrors.email?.map((err, i) => (
          <FieldError key={i} className="flex items-center gap-1">
            {err}
          </FieldError>
        ))}
      </Field>

      <Field>
        <FieldLabel htmlFor="phone" className="flex items-center gap-2">
          Phone Number
        </FieldLabel>
        <Input
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder=""
          className={activeErrors.phone ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}
        />
        {activeErrors.phone?.map((err, i) => (
          <FieldError key={i} className="flex items-center gap-1">
            {err}
          </FieldError>
        ))}
      </Field>

      {user.id && (
        <Field>
          <FieldLabel className="flex items-center gap-2">
            User ID
          </FieldLabel>
          <div className="rounded-md bg-muted/50 px-3 py-2 text-xs font-mono text-muted-foreground border">
            {user.id}
          </div>
        </Field>
      )}
    </div>
  )
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
      return (
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10 hover:text-primary transition-colors"
          onClick={() => {
            console.log("Edit user:", user)
          }}
        >
          View Profile
        </Button>
      )
    },
  },
]

export function UserTable({ data }: { data: User[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
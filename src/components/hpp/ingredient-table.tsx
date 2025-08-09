
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import type { Ingredient } from "@/types"

export default function IngredientTable({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Stok Bahan Baku</CardTitle>
        <CardDescription>Daftar semua bahan baku yang telah Anda masukkan.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Bahan</TableHead>
              <TableHead>Kuantitas</TableHead>
              <TableHead className="hidden md:table-cell">Total Harga</TableHead>
              <TableHead>Harga/Satuan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Belum ada bahan.
                </TableCell>
              </TableRow>
            ) : (
              ingredients.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity} {item.unit}</TableCell>
                  <TableCell className="hidden md:table-cell">Rp {item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    Rp {(item.price / item.quantity).toFixed(2)} / {item.unit}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

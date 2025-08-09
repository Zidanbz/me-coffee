
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
import { useEffect, useState } from "react";
import { getIngredients } from "@/lib/firestore";
import { Skeleton } from "../ui/skeleton";

export default function IngredientTable() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const items = await getIngredients();
        setIngredients(items);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

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
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                </TableRow>
              ))
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

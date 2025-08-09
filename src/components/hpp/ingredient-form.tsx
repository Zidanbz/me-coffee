
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { addIngredient } from "@/lib/firestore"

const ingredientFormSchema = z.object({
  name: z.string().min(2, "Nama bahan harus minimal 2 karakter."),
  quantity: z.coerce.number().positive("Kuantitas harus angka positif."),
  unit: z.string().min(1, "Satuan diperlukan (e.g., kg, L, pcs)."),
  price: z.coerce.number().positive("Harga harus angka positif."),
})

type IngredientFormValues = z.infer<typeof ingredientFormSchema>

export default function IngredientForm() {
  const { toast } = useToast()
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: "",
      unit: "pcs",
    },
  })

  const onSubmit = async (data: IngredientFormValues) => {
    try {
      await addIngredient(data);
      toast({
        title: "Bahan Ditambahkan!",
        description: `${data.name} telah ditambahkan ke stok Anda.`,
      });
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menambahkan bahan.",
        variant: "destructive"
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Tambah Bahan Baku</CardTitle>
        <CardDescription>Tambahkan bahan baku atau supply baru ke stok Anda.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Bahan</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Biji Kopi, Susu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kuantitas Total</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Satuan</FormLabel>
                    <FormControl>
                      <Input placeholder="kg, L, pcs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Total (untuk kuantitas di atas)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
               {form.formState.isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Tambah Bahan
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}


"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { updateIngredient } from "@/lib/firestore"
import type { Ingredient } from "@/types"

const ingredientFormSchema = z.object({
  name: z.string().min(2, "Nama bahan harus minimal 2 karakter."),
  quantity: z.coerce.number().positive("Kuantitas harus angka positif."),
  unit: z.string().min(1, "Satuan diperlukan (e.g., kg, L, pcs)."),
  price: z.coerce.number().positive("Harga harus angka positif."),
})

type IngredientFormValues = z.infer<typeof ingredientFormSchema>

interface EditIngredientFormProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  ingredient: Ingredient;
}

export default function EditIngredientForm({ isOpen, setIsOpen, ingredient }: EditIngredientFormProps) {
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      price: ingredient.price,
    },
  })

  const onSubmit = async (data: IngredientFormValues) => {
    try {
      await updateIngredient(ingredient.id, data);
      toast({
        title: "Bahan Diperbarui!",
        description: `${data.name} telah diperbarui.`,
      });
      form.reset()
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memperbarui bahan.",
        variant: "destructive"
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bahan Baku</DialogTitle>
          <DialogDescription>
            Lakukan perubahan pada bahan baku Anda. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                    <FormLabel>Harga Total</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

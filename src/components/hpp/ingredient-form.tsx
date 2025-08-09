
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

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
  name: z.string().min(2, "Ingredient name must be at least 2 characters."),
  quantity: z.coerce.number().positive("Quantity must be a positive number."),
  unit: z.string().min(1, "Unit is required (e.g., kg, L, pcs)."),
  price: z.coerce.number().positive("Price must be a positive number."),
})

type IngredientFormValues = z.infer<typeof ingredientFormSchema>

export default function IngredientForm() {
  const { toast } = useToast()
  const router = useRouter();
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: "",
      quantity: "" as any,
      unit: "pcs",
      price: "" as any,
    },
  })

  const onSubmit = async (data: IngredientFormValues) => {
    try {
      await addIngredient(data);
      toast({
        title: "Ingredient Added!",
        description: `${data.name} has been added to your stock.`,
      });
      form.reset({
        name: "",
        quantity: "" as any,
        unit: "pcs",
        price: "" as any,
      })
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add ingredient.",
        variant: "destructive"
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Add Ingredient</CardTitle>
        <CardDescription>Add new raw materials or supplies to your stock.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Coffee Beans, Milk" {...field} />
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
                    <FormLabel>Total Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} value={field.value ?? ""} />
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
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="gr, ml, pcs" {...field} />
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
                  <FormLabel>Total Price (for the quantity above)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
               {form.formState.isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Ingredient
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

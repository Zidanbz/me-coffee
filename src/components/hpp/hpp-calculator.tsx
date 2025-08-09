
"use client";

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle } from 'lucide-react';
import type { Ingredient } from '@/types';

interface RecipeIngredient extends Ingredient {
  usedQuantity: number;
}

export default function HppCalculator({ ingredients }: { ingredients: Ingredient[] }) {
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');

  const handleAddIngredient = () => {
    if (!selectedIngredient) return;
    const ingredientToAdd = ingredients.find(i => i.id === selectedIngredient);
    if (ingredientToAdd && !recipeIngredients.some(i => i.id === ingredientToAdd.id)) {
      setRecipeIngredients([...recipeIngredients, { ...ingredientToAdd, usedQuantity: 0 }]);
      setSelectedIngredient('');
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setRecipeIngredients(recipeIngredients.filter(i => i.id !== id));
  };

  const handleQuantityChange = (id: string, usedQuantity: number) => {
    setRecipeIngredients(recipeIngredients.map(i => i.id === id ? { ...i, usedQuantity: Math.max(0, usedQuantity) } : i));
  };

  const calculateIngredientCost = (ingredient: RecipeIngredient) => {
    if (!ingredient.price || !ingredient.quantity || ingredient.quantity === 0) {
      return 0;
    }
    const pricePerUnit = ingredient.price / ingredient.quantity;
    return pricePerUnit * ingredient.usedQuantity;
  };

  const totalHpp = useMemo(() => {
    return recipeIngredients.reduce((total, ingredient) => total + calculateIngredientCost(ingredient), 0);
  }, [recipeIngredients, calculateIngredientCost]);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Recipe HPP Calculator</CardTitle>
        <CardDescription>Create a new recipe and calculate the HPP per product.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Select value={selectedIngredient} onValueChange={(value) => setSelectedIngredient(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an ingredient..." />
            </SelectTrigger>
            <SelectContent>
              {ingredients.map(ingredient => (
                  <SelectItem key={ingredient.id} value={ingredient.id}>
                    {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddIngredient} disabled={!selectedIngredient}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Used Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipeIngredients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No ingredients in this recipe yet.
                  </TableCell>
                </TableRow>
              ) : (
                recipeIngredients.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.usedQuantity}
                        onChange={(e) => handleQuantityChange(item.id, parseFloat(e.target.value))}
                        className="w-24 h-8"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right">
                      Rp {calculateIngredientCost(item).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveIngredient(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="text-right">
          <p className="text-muted-foreground">Total HPP per Product</p>
          <p className="text-2xl font-bold font-headline">
            Rp {totalHpp.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

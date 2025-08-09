import IngredientForm from "@/components/hpp/ingredient-form";
import IngredientTable from "@/components/hpp/ingredient-table";
import HppCalculator from "@/components/hpp/hpp-calculator";
import { getIngredients } from "@/lib/firestore";
import type { Ingredient } from "@/types";

export default async function HppPage() {
  const ingredients: Ingredient[] = await getIngredients();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">HPP Calculation</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <HppCalculator ingredients={ingredients} />
      </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <IngredientForm />
        </div>
        <div className="lg:col-span-3">
          <IngredientTable ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}

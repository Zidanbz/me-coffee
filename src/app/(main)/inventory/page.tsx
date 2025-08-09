import InventoryForm from "@/components/inventory/inventory-form";
import InventoryTable from "@/components/inventory/inventory-table";

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Inventory Management</h1>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <InventoryForm />
        </div>
        <div className="lg:col-span-3">
          <InventoryTable />
        </div>
      </div>
    </div>
  );
}

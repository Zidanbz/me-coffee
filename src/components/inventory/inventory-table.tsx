import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { InventoryItem } from "@/types"

const mockInventory: InventoryItem[] = [
  { id: "1", name: "Arabica Coffee Beans", quantity: 15, unit: "kg", price: 22.50, minStock: 10 },
  { id: "2", name: "Robusta Coffee Beans", quantity: 8, unit: "kg", price: 18.00, minStock: 10 },
  { id: "3", name: "Whole Milk", quantity: 20, unit: "L", price: 1.50, minStock: 15 },
  { id: "4", name: "Oat Milk", quantity: 12, unit: "L", price: 2.50, minStock: 10 },
  { id: "5", name: "Paper Cups (12oz)", quantity: 250, unit: "pcs", price: 0.10, minStock: 100 },
  { id: "6", name: "Chocolate Syrup", quantity: 5, unit: "bottles", price: 8.00, minStock: 4 },
];

export default function InventoryTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Inventory Status</CardTitle>
        <CardDescription>Current stock levels for all your items.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="hidden md:table-cell">Price/Unit</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity} {item.unit}</TableCell>
                <TableCell className="hidden md:table-cell">${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  {item.quantity < item.minStock ? (
                    <Badge variant="destructive">Low Stock</Badge>
                  ) : (
                    <Badge variant="secondary">In Stock</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

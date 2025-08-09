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
import type { Transaction } from "@/types"
import { format } from "date-fns"

const mockTransactions: Transaction[] = [
  { id: "1", type: "income", date: new Date(), category: "Espresso", amount: 3.50, description: "Sale of one espresso", paymentMethod: "Card" },
  { id: "2", type: "income", date: new Date(new Date().setDate(new Date().getDate() - 1)), category: "Latte", amount: 5.00, description: "Sale of one latte", paymentMethod: "Cash" },
  { id: "3", type: "expense", date: new Date(new Date().setDate(new Date().getDate() - 1)), category: "Supplies", amount: 55.20, description: "Milk and sugar delivery", paymentMethod: "Card" },
  { id: "4", type: "income", date: new Date(new Date().setDate(new Date().getDate() - 2)), category: "Muffin", amount: 2.75, description: "Pastry sale", paymentMethod: "Online" },
  { id: "5", type: "expense", date: new Date(new Date().setDate(new Date().getDate() - 3)), category: "Rent", amount: 500.00, description: "Monthly rent", paymentMethod: "Online" },
]

export default function TransactionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Transactions</CardTitle>
        <CardDescription>A list of your most recent income and expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Badge variant={transaction.type === 'income' ? 'secondary' : 'destructive'}>
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{transaction.category}</TableCell>
                <TableCell className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{format(transaction.date, "MMM d, yyyy")}</TableCell>
                <TableCell className="hidden md:table-cell">{transaction.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

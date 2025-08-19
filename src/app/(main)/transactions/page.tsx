
import TransactionForm from "@/components/transactions/transaction-form";
import TransactionsTable from "@/components/transactions/transactions-table";
import { getTransactions } from "@/lib/firestore";
import TransactionStats from "@/components/transactions/transaction-stats";

export const revalidate = 0;

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
         <h1 className="text-2xl font-bold md:text-3xl font-headline">Transactions</h1>
      </div>
      
      <TransactionStats
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <TransactionForm />
        </div>
        <div className="lg:col-span-3">
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

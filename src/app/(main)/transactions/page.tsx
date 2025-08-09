import TransactionForm from "@/components/transactions/transaction-form";
import TransactionsTable from "@/components/transactions/transactions-table";

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Transactions</h1>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <TransactionForm />
        </div>
        <div className="lg:col-span-3">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}

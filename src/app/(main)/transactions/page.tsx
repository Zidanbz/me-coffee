import TransactionForm from "@/components/transactions/transaction-form";
import TransactionsTable from "@/components/transactions/transactions-table";
import { getTransactions } from "@/lib/firestore";
import type { ClientTransaction } from "@/types";
import { getTranslations } from "next-intl/server";

export default async function TransactionsPage() {
  const transactions: ClientTransaction[] = await getTransactions();
  const t = await getTranslations('Transactions');

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">{t('title')}</h1>
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

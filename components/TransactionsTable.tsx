import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/lib/actions/transaction.actions";
import { cn, formatDateTime } from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Montant</TableHead>
          <TableHead className="px-2">Statut</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Canal</TableHead>
          <TableHead className="px-2 max-md:hidden">Catégorie</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((transaction) => {
          const status = getTransactionStatus(new Date(transaction.createdAt));
          const amount = parseFloat(transaction.amount);
          const isDebit = amount < 0;
          const isCredit = amount > 0;

          return (
            <TableRow 
              key={transaction.$id} 
              className={cn(
                isDebit ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]",
                "!border-b-DEFAULT"
              )}
            >
              <TableCell className="pl-2 pr-10">{transaction.name}</TableCell>
              <TableCell className={cn(
                "pl-2 pr-10 font-semibold",
                isDebit ? "text-[#f04438]" : "text-[#039855]"
              )}>
                {formatAmount(amount)}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize">{status}</TableCell>
              <TableCell className="pl-2 pr-10">
                {formatDateTime(new Date(transaction.createdAt)).dateTime}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize">{transaction.channel}</TableCell>
              <TableCell className="pl-2 pr-10 max-md:hidden capitalize">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  transactionCategoryStyles[transaction.category]?.chipBackgroundColor
                )}>
                  {transaction.category}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

import React from "react";
import TransactionRow from "./TransactionRow";
import TransactionEmptyState from "./TransactionEmptyState";

interface TransactionTableProps {
  transactions: any[];
  onViewDetails: (id: string) => void;
  onManageTransaction?: (id: string, action: "edit" | "delete") => void;
  hasManagePermission: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onViewDetails,
  onManageTransaction,
  hasManagePermission,
}) => {
  if (transactions.length === 0) {
    return <TransactionEmptyState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onViewDetails={onViewDetails}
              onManageTransaction={onManageTransaction}
              hasManagePermission={hasManagePermission}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

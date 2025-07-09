import React from "react";
import type { Transaction } from "../../../services/mockAPi";

interface TransactionRowProps {
  transaction: Transaction;
  onViewDetails: (id: string) => void;
  onManageTransaction?: (id: string, action: "delete") => void;
  hasManagePermission: boolean;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction,
  onViewDetails,
  onManageTransaction,
  hasManagePermission
}) => {

  const statusColors = {
    completed: "text-green-600 bg-green-100",
    pending: "text-yellow-600 bg-yellow-100",
    failed: "text-red-600 bg-red-100",
  };

  const handleRowClick = () => {
    onViewDetails(transaction.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onManageTransaction) {
      onManageTransaction(transaction.id, "delete");
    }
  };

  return (
    <tr
      onClick={handleRowClick}
      className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="py-4 px-6 whitespace-nowrap">
        <div className="font-medium text-gray-900">TXN-{transaction?.id}</div>
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        <div className="font-medium text-gray-900">
          {transaction.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </div>
      </td>

      <td className="py-4 px-6 whitespace-nowrap">
        {new Date(transaction?.date).toLocaleDateString()}
      </td>

      <td className="py-4 px-6 whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[transaction.status]
          }`}
        >
          {transaction.status.charAt(0).toUpperCase() +
            transaction.status.slice(1)}
        </span>
      </td>

      <td className="py-4 px-6 whitespace-nowrap">
        <div className="font-medium">{transaction?.recipient || 'N/A'}</div>
      </td>

      <td className="py-4 px-6 whitespace-nowrap text-gray-600">
        {transaction.type}
      </td>

      {hasManagePermission && (
        <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={handleDeleteClick}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default TransactionRow;

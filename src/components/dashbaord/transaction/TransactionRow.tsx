import React from "react";
import { useNavigate } from "react-router-dom";

interface TransactionRowProps {
  transaction: {
    id: string;
    date: string;
    amount: number;
    status: "completed" | "pending" | "failed";
    type: string;
    recipient: {
      name: string;
      email?: string;
    };
  };
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const navigate = useNavigate();
  console.log("transaction", transaction);

  const statusColors = {
    completed: "text-green-600 bg-green-100",
    pending: "text-yellow-600 bg-yellow-100",
    failed: "text-red-600 bg-red-100",
  };

  const handleRowClick = () => {
    navigate(`/dashboard/transactions/${transaction.id}`);
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
        <div className="font-medium">{transaction?.recipient?.name}</div>
        {transaction?.recipient?.email && (
          <div className="text-sm text-gray-500">
            {transaction?.recipient?.email}
          </div>
        )}
      </td>

      <td className="py-4 px-6 whitespace-nowrap text-gray-600">
        {transaction.type}
      </td>
    </tr>
  );
};

export default TransactionRow;

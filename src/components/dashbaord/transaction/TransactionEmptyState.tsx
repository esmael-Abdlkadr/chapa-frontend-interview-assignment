import React from "react";
import { FileX } from "lucide-react";

interface TransactionEmptyStateProps {
  message?: string;
}

const TransactionEmptyState: React.FC<TransactionEmptyStateProps> = ({
  message = "No transactions found",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileX className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900">{message}</h3>
      <p className="mt-1 text-sm text-gray-500">
        There are no transactions that match your current filters or search
        terms.
      </p>
    </div>
  );
};

export default TransactionEmptyState;

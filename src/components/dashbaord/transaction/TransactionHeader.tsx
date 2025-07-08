import React from "react";
import { Download, Filter } from "lucide-react";
import TransactionSearch from "./TransactionSearch";

interface TransactionHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onExport: () => void;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  onExport,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
        Transactions
      </h1>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-3">
        <div className="w-full sm:w-64">
          <TransactionSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            title="Filter transactions"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={onExport}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            title="Export transactions"
          >
            <Download className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;

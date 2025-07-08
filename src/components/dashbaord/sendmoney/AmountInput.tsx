import React from "react";
import { AlertCircle } from "lucide-react";

interface AmountInputProps {
  amount: number;
  error?: string;
  onAmountChange: (amount: number) => void;
  formatCurrency: (amount: number) => string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  error,
  onAmountChange,
  formatCurrency,
}) => {
  const quickAmounts = [100, 500, 1000, 2500, 5000, 10000];

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Amount
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">
          ETB
        </span>
        <input
          type="number"
          value={amount || ""}
          onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
          className={`w-full pl-16 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent transition-all text-xl font-bold ${
            error ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2">
        {quickAmounts.map((quickAmount) => (
          <button
            key={quickAmount}
            type="button"
            onClick={() => onAmountChange(quickAmount)}
            className={`py-2 px-3 rounded-xl text-sm font-medium transition-all transform hover:scale-[1.02] ${
              amount === quickAmount
                ? "bg-[#7DC400] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {formatCurrency(quickAmount)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AmountInput;

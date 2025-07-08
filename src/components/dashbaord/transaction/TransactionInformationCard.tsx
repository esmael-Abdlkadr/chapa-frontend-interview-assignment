import React from "react";
import { Wallet, CreditCard, Building, Hash } from "lucide-react";

interface TransactionInformationProps {
  transaction: {
    type: string;
    category: string;
    method: string;
    transactionFee?: number;
    reference?: string;
    paymentDetails?: {
      cardNumber?: string;
      cardType?: string;
      bankName?: string;
      accountNumber?: string;
    };
  };
  formatCurrency: (amount: number) => string;
  getTransactionIcon: (category: string) => React.ElementType;
}

const TransactionInformationCard: React.FC<TransactionInformationProps> = ({
  transaction,
  formatCurrency,
  getTransactionIcon,
}) => {
  const IconComponent = getTransactionIcon(transaction.category);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Transaction Information
      </h3>

      <div className="space-y-6">
        {/* Transaction Type */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
            <Wallet className="w-5 h-5 text-[#7DC400]" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-sm mb-1">Transaction Type</p>
            <p className="text-gray-900 font-medium capitalize">
              {transaction.type}
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
            <IconComponent className="w-5 h-5 text-[#7DC400]" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-sm mb-1">Category</p>
            <p className="text-gray-900 font-medium capitalize">
              {transaction.category}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
            <CreditCard className="w-5 h-5 text-[#7DC400]" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-sm mb-1">Payment Method</p>
            <p className="text-gray-900 font-medium capitalize">
              {transaction.method.replace("_", " ")}
            </p>
            {transaction.paymentDetails?.cardNumber && (
              <p className="text-gray-500 text-sm mt-1">
                {transaction.paymentDetails.cardType} ****{" "}
                {transaction.paymentDetails.cardNumber.slice(-4)}
              </p>
            )}
            {transaction.paymentDetails?.bankName && (
              <p className="text-gray-500 text-sm mt-1">
                {transaction.paymentDetails.bankName}{" "}
                {transaction.paymentDetails.accountNumber &&
                  `(*${transaction.paymentDetails.accountNumber.slice(-4)})`}
              </p>
            )}
          </div>
        </div>

        {/* Transaction Fee */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
            <Building className="w-5 h-5 text-[#7DC400]" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-sm mb-1">Transaction Fee</p>
            <p className="text-gray-900 font-medium">
              {formatCurrency(transaction.transactionFee || 0)}
            </p>
          </div>
        </div>

        {/* Reference Number */}
        {transaction.reference && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
              <Hash className="w-5 h-5 text-[#7DC400]" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm mb-1">Reference Number</p>
              <p className="text-gray-900 font-medium">{transaction.reference}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionInformationCard;
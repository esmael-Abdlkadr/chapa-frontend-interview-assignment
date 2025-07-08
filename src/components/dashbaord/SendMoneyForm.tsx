import React, { useState } from "react";
import {
  Send,
  ArrowLeft,
  CheckCircle,
  Shield,
  Zap,
  Copy,
  Share2,
  Download,
} from "lucide-react";
import { toastService } from "../../services/toastService";
import { transactionService } from "../../services/transactionService";
import { useAuth } from "../../hooks/useAuth";

import SendMoneyHeader from "./sendmoney/SendMoneyHeader";
import QuickActions from "./sendmoney/QuickActions";
import ContactsModal from "./sendmoney/ContactsModal";
import RecentTransactionsModal from "./sendmoney/RecentTransactionsModal";
import RecipientInput from "./sendmoney/RecipientInput";
import AmountInput from "./sendmoney/AmountInput";
import PaymentMethodSelector from "./sendmoney/PaymentMethodSelector";
import NoteInput from "./sendmoney/NoteInput";

interface SendMoneyFormData {
  recipient: string;
  amount: number;
  note: string;
  method: "wallet" | "bank" | "mobile";
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isFrequent: boolean;
}

interface RecentTransaction {
  id: string;
  recipient: string;
  amount: number;
  date: string;
}

const SendMoneyForm = () => {
  const [formData, setFormData] = useState<SendMoneyFormData>({
    recipient: "",
    amount: 0,
    note: "",
    method: "wallet",
  });

  const [step, setStep] = useState<
    "form" | "confirm" | "processing" | "success"
  >("form");
  const [errors, setErrors] = useState<{
    [K in keyof SendMoneyFormData]?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const { user } = useAuth();

  // Mock data
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Abebe Kebede",
      email: "abebe@gmail.com",
      phone: "+251911234567",
      avatar: "AK",
      isFrequent: true,
    },
    {
      id: "2",
      name: "Tigist Haile",
      email: "tigist@yahoo.com",
      phone: "+251922345678",
      avatar: "TH",
      isFrequent: true,
    },
    {
      id: "3",
      name: "Dawit Mengistu",
      email: "dawit@outlook.com",
      phone: "+251933456789",
      avatar: "DM",
      isFrequent: false,
    },
  ]);

  const [recentTransactions] = useState<RecentTransaction[]>([
    { id: "1", recipient: "Abebe Kebede", amount: 2500, date: "2 hours ago" },
    { id: "2", recipient: "Tigist Haile", amount: 1200, date: "Yesterday" },
    { id: "3", recipient: "Dawit Mengistu", amount: 5000, date: "3 days ago" },
  ]);

  const balance = 125450.75;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const validateForm = (): boolean => {
    const newErrors: { [K in keyof SendMoneyFormData]?: string } = {};

    if (!formData.recipient.trim()) {
      newErrors.recipient = "Recipient is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.recipient)) {
      newErrors.recipient = "Please enter a valid email address";
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    } else if (formData.amount > balance) {
      newErrors.amount = "Insufficient balance";
      toastService.error("Insufficient balance for this transaction");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep("confirm");
  };

  const processTransaction = async () => {
    setStep("processing");
    setIsLoading(true);
    const loadingId = toastService.loading("Processing your payment...");

    try {
      const transactionId = `CHP${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      const transactionData = {
        type: "expense" as const,
        amount: formData.amount,
        description:
          formData.note ||
          `Transfer to ${selectedContact?.name || formData.recipient}`,
        category: "Transfer",
        method:
          formData.method === "wallet"
            ? "Chapa Wallet"
            : formData.method === "bank"
            ? "Bank Transfer"
            : "Mobile Money",
        recipient: selectedContact?.name || formData.recipient,
        sender: user?.id,
        reference: transactionId,
        fee: 0,
      };

      await transactionService.createTransaction(transactionData);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toastService.dismiss(loadingId);
      toastService.success(
        `Payment of ${formatCurrency(formData.amount)} sent successfully!`
      );

      setIsLoading(false);
      setStep("success");
    } catch (error) {
      console.error("Error creating transaction:", error);
      toastService.dismiss(loadingId);
      toastService.error("Transaction failed. Please try again.");
      setIsLoading(false);
      setStep("form");
    }
  };

  const selectContact = (contact: Contact) => {
    setFormData({ ...formData, recipient: contact.email });
    setSelectedContact(contact);
    setShowContacts(false);
    setSearchTerm("");
    toastService.info(`Selected ${contact.name} as recipient`);
  };

  const selectRecentTransaction = (transaction: RecentTransaction) => {
    setFormData({ ...formData, recipient: transaction.recipient });
    setShowRecent(false);
    toastService.info(`Using recent transaction with ${transaction.recipient}`);
  };

  const reset = () => {
    setFormData({ recipient: "", amount: 0, note: "", method: "wallet" });
    setStep("form");
    setErrors({});
    setSelectedContact(null);
    toastService.info("Ready to make another payment");
  };

  const copyTransactionId = () => {
    const transactionId = `TXN-${Date.now()}`;
    navigator.clipboard.writeText(transactionId);
    toastService.success("Transaction ID copied to clipboard");
  };

  // Success Screen
  if (step === "success") {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-6 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Payment Sent!</h3>
          <p className="text-green-100">Successfully transferred</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Amount Sent</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(formData.amount)}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">To</span>
              <span className="font-medium">
                {selectedContact?.name || formData.recipient}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID</span>
              <div className="flex items-center space-x-1">
                <span className="font-mono text-xs">TXN-{Date.now()}</span>
                <button onClick={copyTransactionId} className="p-1">
                  <Copy className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="text-[#7DC400] font-medium">Completed</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={reset}
              className="w-full bg-[#7DC400] text-white py-3 rounded-2xl font-semibold hover:bg-green-600 transition-colors"
            >
              Send Another Payment
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 py-2 rounded-xl text-sm">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 py-2 rounded-xl text-sm">
                <Download className="w-4 h-4" />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Processing Screen
  if (step === "processing") {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-6 text-white text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="w-16 h-16 border-4 border-white/30 rounded-full animate-spin border-t-white"></div>
            <Zap className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" />
          </div>
          <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
          <p className="text-green-100">Securing your transaction...</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {[
              { label: "Validating recipient", completed: true },
              { label: "Verifying funds", completed: true },
              { label: "Processing payment", completed: false },
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-[#7DC400] text-white"
                      : "bg-[#7DC400]/20 text-[#7DC400]"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-[#7DC400] rounded-full animate-spin border-t-transparent"></div>
                  )}
                </div>
                <span className="text-gray-700 text-sm">{step.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-600 text-center flex items-center justify-center">
              <Shield className="w-3 h-3 mr-1" />
              Secured with military-grade encryption
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation Screen
  if (step === "confirm") {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setStep("form")}
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-xl font-bold">Confirm Payment</h3>
              <p className="text-green-100 text-sm">Review before sending</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-1">You're sending</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(formData.amount)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">To</span>
              <div className="text-right">
                <p className="font-semibold">
                  {selectedContact?.name || formData.recipient}
                </p>
                {selectedContact && (
                  <p className="text-xs text-gray-500">
                    {selectedContact.email}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Method</span>
              <span className="font-medium capitalize">
                {formData.method} Transfer
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fee</span>
              <span className="font-medium text-[#7DC400]">Free</span>
            </div>
            {formData.note && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Note</span>
                <span className="font-medium text-right max-w-32 truncate">
                  {formData.note}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={processTransaction}
              className="w-full bg-[#7DC400] text-white py-3 rounded-2xl font-semibold hover:bg-green-600 transition-colors"
            >
              <span className="flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send {formatCurrency(formData.amount)}</span>
              </span>
            </button>
            <button
              onClick={() => setStep("form")}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <SendMoneyHeader
        balance={balance}
        showBalance={showBalance}
        onToggleBalance={() => setShowBalance(!showBalance)}
        formatCurrency={formatCurrency}
      />

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <QuickActions
          onShowContacts={() => setShowContacts(!showContacts)}
          onShowRecent={() => setShowRecent(!showRecent)}
        />

        <ContactsModal
          isOpen={showContacts}
          contacts={contacts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectContact={selectContact}
          onClose={() => setShowContacts(false)}
        />

        <RecentTransactionsModal
          isOpen={showRecent}
          transactions={recentTransactions}
          onSelectTransaction={selectRecentTransaction}
          onClose={() => setShowRecent(false)}
          formatCurrency={formatCurrency}
        />

        <RecipientInput
          recipient={formData.recipient}
          error={errors.recipient}
          selectedContact={selectedContact}
          onRecipientChange={(recipient) =>
            setFormData({ ...formData, recipient })
          }
        />

        <AmountInput
          amount={formData.amount}
          error={errors.amount}
          onAmountChange={(amount) => setFormData({ ...formData, amount })}
          formatCurrency={formatCurrency}
        />

        <PaymentMethodSelector
          selectedMethod={formData.method}
          onMethodChange={(method) => setFormData({ ...formData, method })}
        />

        <NoteInput
          note={formData.note}
          onNoteChange={(note) => setFormData({ ...formData, note })}
        />

        <button
          type="submit"
          disabled={isLoading || !formData.recipient || !formData.amount}
          className="w-full bg-[#7DC400] text-white py-3 rounded-2xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Continue to Review</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SendMoneyForm;

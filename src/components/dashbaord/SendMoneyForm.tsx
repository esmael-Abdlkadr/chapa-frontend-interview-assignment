import React, { useState, useEffect } from "react";
import {
  Send,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  User,
  Shield,
  Clock,
  Search,
  Contact,
  Zap,
  CreditCard,
  Building,
  Smartphone,
  Plus,
  Star,
  ChevronRight,
  Copy,
  Share2,
  Download,
  X,
  UserPlus,
  History,
  TrendingUp,
  Wallet,
  Eye,
  EyeOff,
} from "lucide-react";

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

const SendMoneyForm: React.FC = () => {
  const [formData, setFormData] = useState<SendMoneyFormData>({
    recipient: "",
    amount: 0,
    note: "",
    method: "wallet",
  });

  const [step, setStep] = useState<
    "form" | "confirm" | "processing" | "success"
  >("form");
  const [errors, setErrors] = useState<Partial<SendMoneyFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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

  const quickAmounts = [100, 500, 1000, 2500, 5000, 10000];
  const balance = 125450.75;

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<SendMoneyFormData> = {};

    if (!formData.recipient.trim()) {
      newErrors.recipient = "Recipient is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.recipient)) {
      newErrors.recipient = "Please enter a valid email address";
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    } else if (formData.amount > balance) {
      newErrors.amount = "Insufficient balance";
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
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false);
    setStep("success");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const selectContact = (contact: Contact) => {
    setFormData({ ...formData, recipient: contact.email });
    setSelectedContact(contact);
    setShowContacts(false);
    setSearchTerm("");
  };

  const selectQuickAmount = (amount: number) => {
    setFormData({ ...formData, amount });
  };

  const selectRecentTransaction = (transaction: RecentTransaction) => {
    setFormData({ ...formData, recipient: transaction.recipient });
    setShowRecent(false);
  };

  const reset = () => {
    setFormData({ recipient: "", amount: 0, note: "", method: "wallet" });
    setStep("form");
    setErrors({});
    setSelectedContact(null);
  };

  const copyTransactionId = () => {
    navigator.clipboard.writeText(`TXN-${Date.now()}`);
  };

  // Success Screen
  if (step === "success") {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Payment Sent!</h3>
            <p className="text-green-100 text-lg">
              Your money has been transferred successfully
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Amount Sent</span>
              <span className="font-bold text-xl text-gray-900">
                {formatCurrency(formData.amount)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">To</span>
              <span className="font-medium text-gray-900">
                {selectedContact?.name || formData.recipient}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Transaction ID</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm text-gray-900">
                  TXN-{Date.now()}
                </span>
                <button
                  onClick={copyTransactionId}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Status</span>
              <span className="flex items-center text-[#7DC400] font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full bg-[#7DC400] text-white py-4 px-6 rounded-2xl font-semibold hover:bg-green-600 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Send Another Payment
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
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
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="w-20 h-20 border-4 border-white/30 rounded-full animate-spin border-t-white"></div>
              <Zap className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Processing Payment</h3>
            <p className="text-green-100 text-lg">
              Securing your transaction...
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            {[
              { label: "Validating recipient", completed: true },
              { label: "Verifying funds", completed: true },
              { label: "Processing payment", completed: false },
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-[#7DC400] text-white"
                      : "bg-[#7DC400]/20 text-[#7DC400]"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-[#7DC400] rounded-full animate-spin border-t-transparent"></div>
                  )}
                </div>
                <span className="text-gray-700 font-medium">{step.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
            <p className="text-sm text-gray-600 text-center flex items-center justify-center">
              <Shield className="w-4 h-4 mr-2 text-blue-600" />
              Your transaction is secured with military-grade encryption
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation Screen
  if (step === "confirm") {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-6 sm:p-8 text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setStep("form")}
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Confirm Payment</h3>
              <p className="text-green-100">Review before sending</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">You're sending</p>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">
                {formatCurrency(formData.amount)}
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">To</span>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {selectedContact?.name || formData.recipient}
                  </p>
                  {selectedContact && (
                    <p className="text-sm text-gray-500">
                      {selectedContact.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Method</span>
                <div className="flex items-center space-x-2">
                  {formData.method === "wallet" && (
                    <Wallet className="w-4 h-4 text-[#7DC400]" />
                  )}
                  {formData.method === "bank" && (
                    <Building className="w-4 h-4 text-blue-600" />
                  )}
                  {formData.method === "mobile" && (
                    <Smartphone className="w-4 h-4 text-purple-600" />
                  )}
                  <span className="font-medium capitalize">
                    {formData.method} Transfer
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Transaction Fee</span>
                <span className="font-medium text-[#7DC400]">Free</span>
              </div>
              {formData.note && (
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Note</span>
                  <span className="font-medium text-right max-w-48">
                    {formData.note}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-[#7DC400]">
                  {formatCurrency(formData.amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={processTransaction}
              className="w-full bg-[#7DC400] text-white py-4 px-6 rounded-2xl font-semibold hover:bg-green-600 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send {formatCurrency(formData.amount)}</span>
              </span>
            </button>
            <button
              onClick={() => setStep("form")}
              className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Form Screen
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-br from-[#7DC400] via-green-500 to-emerald-600 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Send Money</h3>
                <p className="text-green-100">Transfer funds instantly</p>
              </div>
            </div>
          </div>

          <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Available Balance</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">
                    {showBalance ? formatCurrency(balance) : "••••••"}
                  </p>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    {showBalance ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setShowContacts(!showContacts)}
            className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
          >
            <Contact className="w-4 h-4" />
            <span>Contacts</span>
          </button>
          <button
            type="button"
            onClick={() => setShowRecent(!showRecent)}
            className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
          >
            <History className="w-4 h-4" />
            <span>Recent</span>
          </button>
        </div>

        {/* Contacts Modal */}
        {showContacts && (
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Select Contact</h4>
              <button
                onClick={() => setShowContacts(false)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search contacts..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
              />
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => selectContact(contact)}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-white rounded-xl transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-[#7DC400] rounded-full flex items-center justify-center text-white font-semibold">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {contact.email}
                    </p>
                  </div>
                  {contact.isFrequent && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        {showRecent && (
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">
                Recent Transactions
              </h4>
              <button
                onClick={() => setShowRecent(false)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {recentTransactions.map((transaction) => (
                <button
                  key={transaction.id}
                  type="button"
                  onClick={() => selectRecentTransaction(transaction)}
                  className="w-full flex items-center justify-between p-3 hover:bg-white rounded-xl transition-colors text-left"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.recipient}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recipient Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Send to
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.recipient}
              onChange={(e) =>
                setFormData({ ...formData, recipient: e.target.value })
              }
              className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent transition-all text-base ${
                errors.recipient
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {selectedContact && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-[#7DC400] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {selectedContact.avatar}
                </div>
              </div>
            )}
          </div>
          {errors.recipient && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.recipient}
            </p>
          )}
        </div>

        {/* Amount Field */}
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
              value={formData.amount || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              className={`w-full pl-16 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent transition-all text-xl font-bold ${
                errors.amount ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          {errors.amount && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.amount}
            </p>
          )}

          {/* Quick Amount Buttons */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => selectQuickAmount(amount)}
                className={`py-2 px-3 rounded-xl text-sm font-medium transition-all transform hover:scale-[1.02] ${
                  formData.amount === amount
                    ? "bg-[#7DC400] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Payment Method
          </label>
          <div className="space-y-3">
            {[
              {
                value: "wallet",
                label: "Chapa Wallet",
                icon: Wallet,
                color: "text-[#7DC400]",
                desc: "Instant & Free",
              },
              {
                value: "bank",
                label: "Bank Transfer",
                icon: Building,
                color: "text-blue-600",
                desc: "1-2 business days",
              },
              {
                value: "mobile",
                label: "Mobile Money",
                icon: Smartphone,
                color: "text-purple-600",
                desc: "Instant via telecom",
              },
            ].map((method) => (
              <label
                key={method.value}
                className={`flex items-center space-x-4 p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition-all transform hover:scale-[1.01] ${
                  formData.method === method.value
                    ? "border-[#7DC400] bg-[#7DC400]/5 shadow-lg"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value={method.value}
                  checked={formData.method === method.value}
                  onChange={(e) =>
                    setFormData({ ...formData, method: e.target.value as any })
                  }
                  className="text-[#7DC400] focus:ring-[#7DC400] scale-125"
                />
                <method.icon className={`w-6 h-6 ${method.color}`} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{method.label}</p>
                  <p className="text-sm text-gray-500">{method.desc}</p>
                </div>
                {formData.method === method.value && (
                  <CheckCircle className="w-5 h-5 text-[#7DC400]" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Note Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Add Note (Optional)
          </label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent resize-none transition-all text-base"
            rows={3}
            placeholder="What's this payment for?"
          />
          <p className="mt-2 text-sm text-gray-500">
            {formData.note.length}/100 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !formData.recipient || !formData.amount}
          className="w-full bg-[#7DC400] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:ring-offset-2 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Continue to Review</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SendMoneyForm;

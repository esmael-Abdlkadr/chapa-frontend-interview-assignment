import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Shield,
  Clock,
  Check,
  X,
  AlertCircle,
  User,
  Phone,
  Mail,
  Wallet,
  Building2,
  Users,
  Star,
  Zap,
  QrCode,
  RefreshCcw,
  Calendar,
  Clock3,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion"; // Add this import for animations

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  isFrequent: boolean;
}

const SendMoneyPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState<
    "select-recipient" | "enter-details" | "review" | "processing" | "success"
  >("select-recipient");
  const [selectedRecipient, setSelectedRecipient] = useState<Contact | null>(
    null
  );
  const [customRecipient, setCustomRecipient] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionSpeed, setTransactionSpeed] = useState("standard"); // new state for transaction speed
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // Generate transaction ID when needed
  useEffect(() => {
    if (step === "processing") {
      setTransactionId(
        `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      );
    }
  }, [step]);

  // Mock contacts data
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "+251912345678",
      email: "sarah@example.com",
      avatar: "👩‍💼",
      isFrequent: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      phone: "+251987654321",
      email: "michael@example.com",
      avatar: "👨‍💻",
      isFrequent: true,
    },
    {
      id: "3",
      name: "Fatima Al-Rashid",
      phone: "+251555123456",
      email: "fatima@example.com",
      avatar: "👩‍🎓",
      isFrequent: false,
    },
    {
      id: "4",
      name: "David Wilson",
      phone: "+251444567890",
      email: "david@example.com",
      avatar: "👨‍🚀",
      isFrequent: true,
    },
    {
      id: "5",
      name: "Amina Hassan",
      phone: "+251333789012",
      email: "amina@example.com",
      avatar: "👩‍🏫",
      isFrequent: false,
    },
  ];

  // Recent transactions mock data
  const recentTransactions = [
    {
      id: "RT001",
      recipient: "Sarah Johnson",
      amount: "1,500",
      date: "Today, 10:30 AM",
      status: "completed",
    },
    {
      id: "RT002",
      recipient: "Michael Chen",
      amount: "500",
      date: "Yesterday, 3:15 PM",
      status: "completed",
    },
    {
      id: "RT003",
      recipient: "Amina Hassan",
      amount: "2,000",
      date: "Jul 05, 12:45 PM",
      status: "completed",
    },
  ];

  const frequentContacts = contacts.filter((c) => c.isFrequent);
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecipientSelect = (contact: Contact) => {
    setSelectedRecipient(contact);
    setStep("enter-details");
  };

  const handleCustomRecipient = () => {
    if (
      customRecipient.name &&
      (customRecipient.phone || customRecipient.email)
    ) {
      const newContact: Contact = {
        id: "custom",
        name: customRecipient.name,
        phone: customRecipient.phone,
        email: customRecipient.email,
        avatar: "👤",
        isFrequent: false,
      };
      setSelectedRecipient(newContact);
      setStep("enter-details");
    }
  };

  const handleSendMoney = () => {
    setStep("processing");
    // Simulate processing time based on transaction speed
    setTimeout(
      () => {
        setStep("success");
      },
      transactionSpeed === "express" ? 1500 : 3000
    );
  };

  const resetForm = () => {
    setStep("select-recipient");
    setSelectedRecipient(null);
    setCustomRecipient({ name: "", phone: "", email: "" });
    setAmount("");
    setDescription("");
    setTransactionSpeed("standard");
    setSearchTerm("");
  };

  // Transaction fee calculation
  const calculateFee = () => {
    if (!amount) return "0";
    const amountNum = parseFloat(amount);
    return transactionSpeed === "express" ? (amountNum * 0.01).toFixed(2) : "0";
  };

  // Total amount calculation
  const calculateTotal = () => {
    if (!amount) return "0";
    const amountNum = parseFloat(amount);
    const fee = transactionSpeed === "express" ? amountNum * 0.01 : 0;
    return (amountNum + fee).toFixed(2);
  };

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-[#7DC400] to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Send className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Processing Payment
          </h2>
          <p className="text-gray-600 mb-6">
            We're securely processing your payment to {selectedRecipient?.name}
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-sm font-mono text-gray-900">
                #{transactionId}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm font-medium text-gray-900">
                {amount} Birr
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Speed</span>
              <span className="text-sm capitalize text-gray-900 flex items-center">
                {transactionSpeed === "express" ? (
                  <>
                    <Zap className="w-3 h-3 text-amber-500 mr-1" />
                    Express
                  </>
                ) : (
                  "Standard"
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-3 h-3 bg-[#7DC400] rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-[#7DC400] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-[#7DC400] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Successfully sent {amount} Birr to {selectedRecipient?.name}
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-sm font-mono text-gray-900">
                #{transactionId}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Time</span>
              <span className="text-sm text-gray-900">
                {new Date().toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="text-sm flex items-center text-gray-900">
                <Wallet className="w-4 h-4 mr-1 text-[#7DC400]" />
                Chapa Wallet
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <Check className="w-4 h-4 mr-1" /> Completed
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-4 flex items-center">
              <QrCode className="w-8 h-8 mr-3 text-[#7DC400]" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  Receipt Available
                </p>
                <p className="text-xs text-gray-600">
                  Scan to view digital receipt
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full bg-[#7DC400] text-white py-3 px-6 rounded-2xl font-semibold hover:bg-green-600 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Send Another Payment
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Send Money
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-[#7DC400] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  step === "select-recipient" ? "bg-[#7DC400]" : "bg-gray-300"
                }`}
              >
                1
              </div>
              <span className="text-sm font-medium text-gray-900">
                Select Recipient
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  ["enter-details", "review"].includes(step)
                    ? "bg-[#7DC400]"
                    : "bg-gray-300"
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium text-gray-900">
                Enter Details
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  step === "review" ? "bg-[#7DC400]" : "bg-gray-300"
                }`}
              >
                3
              </div>
              <span className="text-sm font-medium text-gray-900">Review</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "select-recipient" && (
                <motion.div
                  key="select-recipient"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Select Recipient
                    </h2>

                    {/* Search */}
                    <div className="relative mb-6">
                      <input
                        type="text"
                        placeholder="Search by name, phone, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Frequent Contacts */}
                    {!searchTerm && (
                      <div className="mb-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <h3 className="font-medium text-gray-900">
                            Frequent Contacts
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {frequentContacts.map((contact) => (
                            <button
                              key={contact.id}
                              onClick={() => handleRecipientSelect(contact)}
                              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center hover:shadow-md"
                            >
                              <div className="text-2xl mb-2">
                                {contact.avatar}
                              </div>
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {contact.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* All Contacts */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">
                        {searchTerm ? "Search Results" : "All Contacts"}
                      </h3>
                      <div className="space-y-2">
                        {filteredContacts.length > 0 ? (
                          filteredContacts.map((contact) => (
                            <button
                              key={contact.id}
                              onClick={() => handleRecipientSelect(contact)}
                              className="w-full p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center space-x-4 hover:shadow-md"
                            >
                              <div className="text-2xl">{contact.avatar}</div>
                              <div className="flex-1 text-left">
                                <div className="font-medium text-gray-900">
                                  {contact.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {contact.phone}
                                </div>
                              </div>
                              {contact.isFrequent && (
                                <Star className="w-4 h-4 text-yellow-500" />
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <User className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                            <p>No contacts found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add New Recipient */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Add New Recipient
                    </h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={customRecipient.name}
                          onChange={(e) =>
                            setCustomRecipient({
                              ...customRecipient,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={customRecipient.phone}
                          onChange={(e) =>
                            setCustomRecipient({
                              ...customRecipient,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Email Address (Optional)"
                          value={customRecipient.email}
                          onChange={(e) =>
                            setCustomRecipient({
                              ...customRecipient,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      <button
                        onClick={handleCustomRecipient}
                        disabled={
                          !customRecipient.name ||
                          (!customRecipient.phone && !customRecipient.email)
                        }
                        className="w-full bg-[#7DC400] text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue with New Recipient
                      </button>
                    </div>
                  </div>

                  {/* Recent Transactions Section */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">
                        Recent Transactions
                      </h3>
                      <button className="text-[#7DC400] hover:text-green-700 text-sm font-medium flex items-center">
                        <RefreshCcw className="w-4 h-4 mr-1" /> Refresh
                      </button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {recentTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="py-3 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                              <Send className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {tx.recipient}
                              </div>
                              <div className="text-xs text-gray-500">
                                {tx.date}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              {tx.amount} Birr
                            </div>
                            <div className="text-xs text-green-600 capitalize">
                              {tx.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "enter-details" && selectedRecipient && (
                <motion.div
                  key="enter-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Enter Payment Details
                  </h2>

                  {/* Selected Recipient */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{selectedRecipient.avatar}</div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {selectedRecipient.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedRecipient.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent text-2xl font-semibold"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl">
                        Birr
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      placeholder="What's this payment for?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Transaction Speed */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Transaction Speed
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setTransactionSpeed("standard")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          transactionSpeed === "standard"
                            ? "border-[#7DC400] bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Clock className="w-6 h-6 mx-auto mb-2 text-[#7DC400]" />
                        <div className="font-medium text-gray-900">
                          Standard
                        </div>
                        <div className="text-sm text-gray-600">
                          1-2 minutes, no fee
                        </div>
                      </button>
                      <button
                        onClick={() => setTransactionSpeed("express")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          transactionSpeed === "express"
                            ? "border-[#7DC400] bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Zap className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                        <div className="font-medium text-gray-900">Express</div>
                        <div className="text-sm text-gray-600">
                          Instant, 1% fee
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <button className="w-full p-4 rounded-xl border-2 border-[#7DC400] bg-green-50 flex items-center">
                      <Wallet className="w-10 h-10 text-[#7DC400] mr-4" />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">
                          Chapa Wallet
                        </div>
                        <div className="text-sm text-gray-600">
                          Balance: 1,234.56 Birr
                        </div>
                      </div>
                      <Check className="w-5 h-5 text-[#7DC400]" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep("select-recipient")}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("review")}
                      disabled={!amount || parseFloat(amount) <= 0}
                      className="flex-1 bg-[#7DC400] text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Review Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "review" && selectedRecipient && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Review Payment
                  </h2>

                  {/* Payment Summary */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Recipient</span>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            {selectedRecipient.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {selectedRecipient.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Amount</span>
                        <span className="text-2xl font-bold text-gray-900">
                          {amount} Birr
                        </span>
                      </div>
                      {description && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Description
                          </span>
                          <span className="text-sm text-gray-900">
                            {description}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Payment Method
                        </span>
                        <span className="text-sm text-gray-900 flex items-center">
                          <Wallet className="w-4 h-4 mr-1 text-[#7DC400]" />
                          Chapa Wallet
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Transaction Speed
                        </span>
                        <span className="text-sm text-gray-900 capitalize flex items-center">
                          {transactionSpeed === "express" ? (
                            <>
                              <Zap className="w-3 h-3 text-amber-500 mr-1" />
                              Express
                            </>
                          ) : (
                            "Standard"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Fee</span>
                        <span className="text-sm text-gray-900">
                          {calculateFee()} Birr
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#7DC400] bg-opacity-10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                          {calculateTotal()} Birr
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Estimated completion time:{" "}
                        {transactionSpeed === "express"
                          ? "Instant"
                          : "1-2 minutes"}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep("enter-details")}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSendMoney}
                      className="flex-1 bg-[#7DC400] text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Money</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-[#7DC400]" />
                <h3 className="font-semibold text-gray-900">
                  Secure & Protected
                </h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Real-time fraud monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>24/7 transaction monitoring</span>
                </div>
              </div>
            </div>

            {/* QR Code Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Payment
              </h3>
              <div className="mb-4 bg-gray-50 p-4 rounded-xl flex items-center justify-center">
                <QrCode className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 text-center mb-3">
                Scan to receive quick payments from anyone
              </p>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                Generate New Code
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Available Balance
                  </span>
                  <span className="font-semibold text-gray-900">
                    1,234.56 Birr
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Transactions Today
                  </span>
                  <span className="font-semibold text-gray-900">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Limit</span>
                  <span className="font-semibold text-gray-900">
                    5,000 Birr
                  </span>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is available 24/7 to assist you with your
                transactions.
              </p>
              <button className="w-full bg-white text-gray-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPage;

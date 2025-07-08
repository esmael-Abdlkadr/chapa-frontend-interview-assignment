import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Clock,
  Check,
  Phone,
  User,
  Wallet,
  Zap,
  Shield,
  Loader2,
} from "lucide-react";

const SendMoneyPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientPhone: "",
    amount: "",
    description: "",
    paymentMethod: "wallet",
  });
  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simulate user's wallet balance
  const walletBalance = 15420.75;

  // Generate transaction ID when processing
  useEffect(() => {
    if (step === "processing") {
      setTransactionId(
        `CHP${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      );
    }
  }, [step]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required";
    }

    if (!formData.recipientPhone.trim()) {
      newErrors.recipientPhone = "Phone number is required";
    } else if (!/^\+251\d{9}$/.test(formData.recipientPhone)) {
      newErrors.recipientPhone = "Please enter a valid Ethiopian phone number (+251XXXXXXXXX)";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = "Please enter a valid amount";
      } else if (amount > walletBalance) {
        newErrors.amount = "Insufficient wallet balance";
      } else if (amount < 1) {
        newErrors.amount = "Minimum amount is 1 ETB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStep("processing");
    
    // Simulate processing time
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const resetForm = () => {
    setStep("form");
    setFormData({
      recipientName: "",
      recipientPhone: "",
      amount: "",
      description: "",
      paymentMethod: "wallet",
    });
    setErrors({});
    setTransactionId("");
  };

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-[#7DC400] to-green-500 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-4">Securely sending your money...</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-sm font-mono text-gray-800">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-lg font-bold text-[#7DC400]">{formData.amount} ETB</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>256-bit SSL encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#7DC400] to-green-500 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your money has been sent successfully</p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">To</span>
              <span className="font-medium text-gray-800">{formData.recipientName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-xl font-bold text-[#7DC400]">{formData.amount} ETB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-sm font-mono text-gray-800">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Date</span>
              <span className="text-sm text-gray-800">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full bg-gradient-to-r from-[#7DC400] to-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Send Another Payment
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Send Money</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#7DC400] to-green-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Quick Transfer</h2>
                  <p className="text-green-100">Send money instantly with Chapa</p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Send className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Wallet Balance */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-xl mr-3">
                    <Wallet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Balance</p>
                    <p className="text-2xl font-bold text-gray-800">{walletBalance.toLocaleString()} ETB</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Chapa Wallet</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Recipient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-600" />
                  Recipient Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7DC400] focus:border-[#7DC400] transition-colors ${
                      errors.recipientName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter recipient's full name"
                  />
                  {errors.recipientName && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={formData.recipientPhone}
                      onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7DC400] focus:border-[#7DC400] transition-colors ${
                        errors.recipientPhone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+251912345678"
                    />
                  </div>
                  {errors.recipientPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientPhone}</p>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                  <Wallet className="w-5 h-5 mr-2 text-gray-600" />
                  Amount
                </h3>
                
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    className={`w-full px-4 py-4 text-2xl font-bold border rounded-xl focus:ring-2 focus:ring-[#7DC400] focus:border-[#7DC400] transition-colors ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">
                    ETB
                  </span>
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[100, 500, 1000, 5000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => handleInputChange("amount", quickAmount.toString())}
                      className="py-2 px-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7DC400] focus:border-[#7DC400] transition-colors"
                  placeholder="What's this payment for?"
                />
              </div>

              {/* Transaction Features */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mb-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-600">Instant Transfer</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-100 p-2 rounded-lg mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-600">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mb-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-600">24/7 Available</span>
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#7DC400] to-green-500 text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg"
              >
                <Send className="w-5 h-5" />
                <span>Send Money</span>
              </button>

              {/* Security Notice */}
              <div className="text-center text-xs text-gray-500">
                <Shield className="w-4 h-4 inline mr-1" />
                Your transaction is protected by 256-bit SSL encryption
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPage;

import React, { useState } from "react";
import {
  Send,
  ArrowLeft,
  CheckCircle,
  Shield,
  Zap,
  Copy,
  Download,
  DollarSign,
  User,
  CreditCard,
  FileText,
  Eye,
  EyeOff,
  Wallet,
  Building2,
  Smartphone,
} from "lucide-react";
import { toastService } from "../../services/toastService";
import { transactionService } from "../../services/transactionService";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";

interface SendMoneyFormData {
  recipient: string;
  amount: number;
  note: string;
  method: "wallet" | "bank" | "mobile";
}

const SendMoneyForm = () => {
  const [formData, setFormData] = useState<SendMoneyFormData>({
    recipient: "",
    amount: 0,
    note: "",
    method: "wallet",
  });

  const [step, setStep] = useState<"form" | "confirm" | "processing" | "success">("form");
  const [errors, setErrors] = useState<{ [K in keyof SendMoneyFormData]?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const { user } = useAuth();
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
      const transactionId = `CHP${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const transactionData = {
        type: "expense" as const,
        amount: formData.amount,
        description: formData.note || `Transfer to ${formData.recipient}`,
        category: "Transfer",
        method: formData.method === "wallet" ? "Chapa Wallet" : formData.method === "bank" ? "Bank Transfer" : "Mobile Money",
        recipient: formData.recipient,
        sender: user?.id,
        reference: transactionId,
        fee: 0,
      };

      await transactionService.createTransaction(transactionData);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toastService.dismiss(loadingId);
      toastService.success(`Payment of ${formatCurrency(formData.amount)} sent successfully!`);

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

  const reset = () => {
    setFormData({ recipient: "", amount: 0, note: "", method: "wallet" });
    setStep("form");
    setErrors({});
    toastService.info("Ready to make another payment");
  };

  const copyTransactionId = () => {
    const transactionId = `TXN-${Date.now()}`;
    navigator.clipboard.writeText(transactionId);
    toastService.success("Transaction ID copied to clipboard");
  };

  if (step === "success") {
    return (
      <DashboardLayout>
        <div className="px-4 py-6">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-[#7DC400] to-green-500 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">Payment Successful!</h2>
                  <p className="text-green-100 text-sm">Your transaction has been completed</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="text-center">
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-medium mb-1">Amount Sent</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {formatCurrency(formData.amount)}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Recipient</span>
                    <span className="font-semibold text-slate-800">{formData.recipient}</span>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Transaction ID</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-mono text-xs font-medium text-slate-700 bg-slate-200/70 px-2 py-1 rounded">TXN-{Date.now().toString().slice(-6)}</span>
                      <button 
                        onClick={copyTransactionId} 
                        className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <Copy className="w-3 h-3 text-slate-600" />
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Payment Method</span>
                    <div className="flex items-center space-x-1">
                      {formData.method === "wallet" && <Wallet className="w-3 h-3 text-slate-600" />}
                      {formData.method === "bank" && <Building2 className="w-3 h-3 text-slate-600" />}
                      {formData.method === "mobile" && <Smartphone className="w-3 h-3 text-slate-600" />}
                      <span className="font-medium text-slate-800 capitalize">{formData.method}</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Status</span>
                    <span className="text-[#7DC400] font-medium bg-green-50 px-2 py-0.5 rounded-full text-xs border border-green-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Completed</span>
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="flex-1 bg-[#7DC400] text-white py-2.5 rounded-xl font-medium hover:bg-[#8DD500] transition-all duration-200 text-sm"
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <Send className="w-4 h-4" />
                      <span>Send Again</span>
                    </span>
                  </button>
                  <button 
                    className="flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 py-2.5 px-4 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (step === "processing") {
    return (
      <DashboardLayout>
        <div className="px-4 py-6">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-[#7DC400] to-green-500 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <div className="w-16 h-16 border-3 border-white/30 rounded-full animate-spin border-t-white absolute"></div>
                    <div className="w-10 h-10 border-3 border-white/20 rounded-full animate-spin border-b-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{animationDuration: '1.5s'}}></div>
                    <Zap className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">Processing Payment</h2>
                  <p className="text-green-100 text-sm">Securing your transaction</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  {[
                    { label: "Validating recipient", completed: true },
                    { label: "Verifying balance", completed: true },
                    { label: "Processing payment", completed: false },
                    { label: "Confirming transaction", completed: false },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-gradient-to-br from-[#7DC400] to-green-600 text-white" : "bg-slate-100 text-slate-400 border border-slate-200"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-slate-400 rounded-full animate-spin border-t-transparent"></div>
                        )}
                      </div>
                      <div className="flex-1 h-1 bg-slate-200">
                        <div 
                          className={`h-1 bg-[#7DC400] ${step.completed ? "w-full" : "w-0"} transition-all duration-1000`}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${step.completed ? "text-slate-800" : "text-slate-500"} min-w-[120px]`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center gap-2 text-blue-700">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium">Bank-level security encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }


  if (step === "confirm") {
    return (
      <DashboardLayout>
        <div className="px-4 py-6">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-[#7DC400] to-green-500 p-4 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <button
                    onClick={() => setStep("form")}
                    className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold">Confirm Payment</h2>
                    <p className="text-green-100 text-xs">Review transaction details</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="text-center mb-4">
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-medium mb-1">You're sending</p>
                  <div className="bg-green-50 py-3 px-4 rounded-xl inline-block border border-green-100">
                    <p className="text-2xl font-bold text-slate-800">{formatCurrency(formData.amount)}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 space-y-3 mb-4 border border-slate-200 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      <span>Recipient</span>
                    </span>
                    <span className="font-semibold text-slate-800">{formData.recipient}</span>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      {formData.method === "wallet" && <Wallet className="w-3 h-3" />}
                      {formData.method === "bank" && <Building2 className="w-3 h-3" />}
                      {formData.method === "mobile" && <Smartphone className="w-3 h-3" />}
                      <span>Method</span>
                    </span>
                    <span className="font-semibold text-slate-800 capitalize">{formData.method}</span>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3" />
                      <span>Fee</span>
                    </span>
                    <span className="text-[#7DC400] font-semibold">Free</span>
                  </div>
                  {formData.note && (
                    <>
                      <div className="h-px bg-slate-200"></div>
                      <div className="flex justify-between items-start">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <FileText className="w-3 h-3" />
                          <span>Note</span>
                        </span>
                        <span className="font-medium text-slate-700 text-right max-w-[150px] text-xs">{formData.note}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={processTransaction}
                    className="w-full bg-[#7DC400] text-white py-2.5 rounded-xl font-medium hover:bg-[#8DD500] transition-all duration-200 text-sm flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send {formatCurrency(formData.amount)}</span>
                  </button>
                  <button
                    onClick={() => setStep("form")}
                    className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200 text-sm"
                  >
                    Back to Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Send Money</h1>
            <p className="text-slate-600 text-sm">Transfer funds instantly and securely</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-[#7DC400] to-green-500 rounded-2xl p-4 text-white shadow-md md:col-span-1 relative overflow-hidden h-fit">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
              <div className="relative z-10">
                <p className="text-green-100 text-xs uppercase tracking-wider font-medium mb-1">Available Balance</p>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-2xl font-bold">
                    {showBalance ? formatCurrency(balance) : "••••••••"}
                  </p>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center text-xs text-green-100">
                  <Wallet className="w-3 h-3 mr-1" />
                  <span>Chapa Wallet</span>
                </div>
              </div>
            </div>

  

  
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recipient Card */}
                  <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-slate-800">Recipient</h3>
                    </div>
                    
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.recipient}
                        onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          errors.recipient ? "border-red-300" : "border-slate-200"
                        } text-sm focus:outline-none focus:ring-2 focus:ring-[#7DC400]/20`}
                        placeholder="recipient@example.com"
                      />
                      {errors.recipient && (
                        <p className="mt-1 text-xs text-red-600">{errors.recipient}</p>
                      )}
                    </div>
                  </div>

                  {/* Amount Card */}
                  <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-slate-800">Amount</h3>
                    </div>
                    
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Amount (ETB)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">
                        ETB
                      </span>
                      <input
                        type="number"
                        value={formData.amount || ""}
                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                        className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                          errors.amount ? "border-red-300" : "border-slate-200"
                        } text-sm focus:outline-none focus:ring-2 focus:ring-[#7DC400]/20`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                      {errors.amount && (
                        <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Method Card */}
                  <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-slate-800">Payment Method</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "wallet", label: "Wallet", icon: Wallet },
                        { value: "bank", label: "Bank", icon: Building2 },
                        { value: "mobile", label: "Mobile", icon: Smartphone },
                      ].map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, method: method.value as "wallet" | "bank" | "mobile" })}
                          className={`p-2 rounded-lg flex flex-col items-center gap-1 ${
                            formData.method === method.value
                              ? "bg-green-50 border border-[#7DC400] text-[#7DC400]"
                              : "border border-slate-200 hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <method.icon className="w-4 h-4" />
                          <span className="text-xs font-medium">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Note Card */}
                  <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-slate-800">Note (Optional)</h3>
                    </div>
                    
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7DC400]/20 resize-none"
                      placeholder="Add a note (optional)"
                    />
                  </div>
                </div>

                {/* Submit Button Card */}
                <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100">
                  <button
                    type="submit"
                    disabled={isLoading || !formData.recipient || !formData.amount}
                    className="w-full bg-[#7DC400] text-white py-3 rounded-xl font-medium hover:bg-[#8DD500] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Review Payment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SendMoneyForm;
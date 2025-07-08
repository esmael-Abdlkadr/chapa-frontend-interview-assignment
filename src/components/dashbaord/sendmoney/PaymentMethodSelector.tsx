import React from "react";
import { Wallet, Building, Smartphone, CheckCircle } from "lucide-react";

interface PaymentMethodSelectorProps {
  selectedMethod: "wallet" | "bank" | "mobile";
  onMethodChange: (method: "wallet" | "bank" | "mobile") => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  const methods = [
    {
      value: "wallet" as const,
      label: "Chapa Wallet",
      icon: Wallet,
      color: "text-[#7DC400]",
      desc: "Instant & Free",
    },
    {
      value: "bank" as const,
      label: "Bank Transfer",
      icon: Building,
      color: "text-blue-600",
      desc: "1-2 business days",
    },
    {
      value: "mobile" as const,
      label: "Mobile Money",
      icon: Smartphone,
      color: "text-purple-600",
      desc: "Instant via telecom",
    },
  ];

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Payment Method
      </label>
      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.value}
            className={`flex items-center space-x-4 p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition-all transform hover:scale-[1.01] ${
              selectedMethod === method.value
                ? "border-[#7DC400] bg-[#7DC400]/5 shadow-lg"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="method"
              value={method.value}
              checked={selectedMethod === method.value}
              onChange={(e) =>
                onMethodChange(e.target.value as "wallet" | "bank" | "mobile")
              }
              className="text-[#7DC400] focus:ring-[#7DC400] scale-125"
            />
            <method.icon className={`w-6 h-6 ${method.color}`} />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{method.label}</p>
              <p className="text-sm text-gray-500">{method.desc}</p>
            </div>
            {selectedMethod === method.value && (
              <CheckCircle className="w-5 h-5 text-[#7DC400]" />
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;

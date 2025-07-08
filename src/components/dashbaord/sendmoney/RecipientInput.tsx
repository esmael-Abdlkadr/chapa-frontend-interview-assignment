import React from "react";
import { User, AlertCircle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isFrequent: boolean;
}

interface RecipientInputProps {
  recipient: string;
  error?: string;
  selectedContact: Contact | null;
  onRecipientChange: (recipient: string) => void;
}

const RecipientInput: React.FC<RecipientInputProps> = ({
  recipient,
  error,
  selectedContact,
  onRecipientChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Send to
      </label>
      <div className="relative">
        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="email"
          value={recipient}
          onChange={(e) => onRecipientChange(e.target.value)}
          className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent transition-all text-base ${
            error ? "border-red-500 bg-red-50" : "border-gray-300"
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
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default RecipientInput;
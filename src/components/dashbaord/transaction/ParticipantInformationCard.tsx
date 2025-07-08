import React from "react";
import { User, MessageSquare } from "lucide-react";
import TransactionTimeline from "./TransactionTimeline";

interface ParticipantInformationProps {
  transaction: {
    sender?: string;
    recipient?: string;
    notes?: string;
    date: string;
    time: string;
    status: string;
  };
}

const ParticipantInformationCard: React.FC<ParticipantInformationProps> = ({
  transaction,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Participant Information
      </h3>

      <div className="space-y-6">
        {/* Sender */}
        {transaction.sender && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
              <User className="w-5 h-5 text-[#7DC400]" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm mb-1">Sender</p>
              <p className="text-gray-900 font-medium">{transaction.sender}</p>
            </div>
          </div>
        )}

        {/* Recipient */}
        {transaction.recipient && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
              <User className="w-5 h-5 text-[#7DC400]" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm mb-1">Recipient</p>
              <p className="text-gray-900 font-medium">
                {transaction.recipient}
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        {transaction.notes && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7DC400]/10 flex items-center justify-center mt-1">
              <MessageSquare className="w-5 h-5 text-[#7DC400]" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-sm mb-1">Notes</p>
              <p className="text-gray-900">{transaction.notes}</p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <TransactionTimeline
            date={transaction.date}
            time={transaction.time}
            status={transaction.status}
          />
        </div>
      </div>
    </div>
  );
};

export default ParticipantInformationCard;
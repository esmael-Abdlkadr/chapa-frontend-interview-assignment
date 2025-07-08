import React from "react";
interface TransactionTimelineProps {
  date: string;
  time: string;
  status: string;
}

const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
  date,
  time,
  status,
}) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <>
      <h4 className="text-md font-semibold text-gray-900 mb-4">
        Transaction Timeline
      </h4>

      <div className="relative pl-8 pb-2">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#7DC400]"></div>

        <div className="mb-4 relative">
          <div className="absolute w-4 h-4 rounded-full bg-[#7DC400] -left-[9px] top-1 border-2 border-white"></div>
          <div>
            <p className="text-gray-900 font-medium">Transaction Initiated</p>
            <p className="text-gray-500 text-sm">
              {formattedDate} {time}
            </p>
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="absolute w-4 h-4 rounded-full bg-[#7DC400] -left-[9px] top-1 border-2 border-white"></div>
          <div>
            <p className="text-gray-900 font-medium">Payment Processed</p>
            <p className="text-gray-500 text-sm">
              {formattedDate} {time}
            </p>
          </div>
        </div>

        {status === "completed" && (
          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-[#7DC400] -left-[9px] top-1 border-2 border-white"></div>
            <div>
              <p className="text-gray-900 font-medium">Transaction Completed</p>
              <p className="text-gray-500 text-sm">
                {formattedDate} {time}
              </p>
            </div>
          </div>
        )}

        {status === "pending" && (
          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-yellow-500 -left-[9px] top-1 border-2 border-white"></div>
            <div>
              <p className="text-gray-900 font-medium">Awaiting Confirmation</p>
              <p className="text-gray-500 text-sm">
                {formattedDate} {time}
              </p>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-red-500 -left-[9px] top-1 border-2 border-white"></div>
            <div>
              <p className="text-gray-900 font-medium">Transaction Failed</p>
              <p className="text-gray-500 text-sm">
                {formattedDate} {time}
              </p>
              <p className="text-red-500 text-sm">
                Payment authorization failed
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionTimeline;

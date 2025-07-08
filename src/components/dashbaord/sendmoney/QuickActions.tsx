import React from "react";
import { Contact, History } from "lucide-react";

interface QuickActionsProps {
  onShowContacts: () => void;
  onShowRecent: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onShowContacts,
  onShowRecent,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onShowContacts}
        className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
      >
        <Contact className="w-4 h-4" />
        <span>Contacts</span>
      </button>
      <button
        type="button"
        onClick={onShowRecent}
        className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
      >
        <History className="w-4 h-4" />
        <span>Recent</span>
      </button>
    </div>
  );
};

export default QuickActions;

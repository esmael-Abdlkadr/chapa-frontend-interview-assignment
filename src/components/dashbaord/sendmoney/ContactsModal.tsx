import React from "react";
import { Search, X, Star } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isFrequent: boolean;
}

interface ContactsModalProps {
  isOpen: boolean;
  contacts: Contact[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectContact: (contact: Contact) => void;
  onClose: () => void;
}

const ContactsModal: React.FC<ContactsModalProps> = ({
  isOpen,
  contacts,
  searchTerm,
  onSearchChange,
  onSelectContact,
  onClose,
}) => {
  if (!isOpen) return null;

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">Select Contact</h4>
        <button
          onClick={onClose}
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
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search contacts..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
        />
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            type="button"
            onClick={() => onSelectContact(contact)}
            className="w-full flex items-center space-x-3 p-3 hover:bg-white rounded-xl transition-colors text-left"
          >
            <div className="w-10 h-10 bg-[#7DC400] rounded-full flex items-center justify-center text-white font-semibold">
              {contact.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {contact.name}
              </p>
              <p className="text-sm text-gray-500 truncate">{contact.email}</p>
            </div>
            {contact.isFrequent && (
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </button>
        ))}

        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No contacts found</p>
            <p className="text-sm">Try searching with a different term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsModal;

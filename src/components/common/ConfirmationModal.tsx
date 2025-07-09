import React from "react";
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: "text-red-600",
      confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      iconBg: "bg-red-100",
    },
    warning: {
      icon: "text-yellow-600",
      confirmButton: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
      iconBg: "bg-yellow-100",
    },
    info: {
      icon: "text-blue-600",
      confirmButton: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      iconBg: "bg-blue-100",
    },
  };

  const currentStyle = typeStyles[type];

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
     
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6 z-[10000]">
          <div className="flex items-start">

            <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${currentStyle.iconBg} mr-4`}>
              <AlertTriangle className={`h-6 w-6 ${currentStyle.icon}`} />
            </div>


            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {message}
              </p>

        
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${currentStyle.confirmButton}`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Loading...
                    </div>
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ConfirmationModal;

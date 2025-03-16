import React from 'react';
import { AlertCircle, Check, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  currentLanguage: 'en' | 'hi';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  currentLanguage
}) => {
  const isHindi = currentLanguage === 'hi';
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <AlertCircle size={24} className="text-amber-500 mr-2" />
            <h2 className="text-lg font-medium">{title}</h2>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300"
          >
            <X size={18} className="inline mr-1" />
            {cancelText || (isHindi ? 'रद्द करें' : 'Cancel')}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600"
          >
            <Check size={18} className="inline mr-1" />
            {confirmText || (isHindi ? 'हाँ, निश्चित' : 'Yes, Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
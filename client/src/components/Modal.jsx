import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* backdrop */}
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* modal Dailog */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 z-10 overflow-hidden animate-in zoom-in duration-200">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="text-xl font-bold text text-gray-800">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    >        
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                     {children}
                </div>
            </div>
        </div>    
    );
}

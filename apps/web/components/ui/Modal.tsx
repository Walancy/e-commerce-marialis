import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`bg-white dark:bg-[#121212] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 ${className}`}>
                <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'danger'
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col items-center text-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400' :
                        variant === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400' :
                            'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                    }`}>
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button
                    variant={variant === 'danger' ? 'primary' : 'outline'}
                    className={variant === 'danger' ? '!bg-red-600 hover:!bg-red-700' : ''}
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                >
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
}

import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface ToastMessageProps {
    message: string;
}

export function ToastSuccessMessage({ message }: ToastMessageProps) {
    return (
        <div className="flex flex-row items-center">
            <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
            <span>{message}</span>
        </div>
    );
}

export function ToastErrorMessage({ message }: ToastMessageProps) {
    return (
        <div className="flex flex-row items-center">
            <XCircleIcon className="h-4 w-4 mr-2" />
            <span>{message}</span>
        </div>
    );
}

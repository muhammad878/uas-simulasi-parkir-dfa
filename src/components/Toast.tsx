import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

function Toast({ id, type, message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  const styles = {
    success: 'bg-emerald-500 text-white border-emerald-600',
    error: 'bg-red-500 text-white border-red-600',
    warning: 'bg-amber-500 text-white border-amber-600',
    info: 'bg-blue-500 text-white border-blue-600'
  };

  return (
    <div 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border-2 ${styles[type]} animate-slide-in min-w-[300px] max-w-md`}
      style={{
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1 font-medium text-sm">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default Toast;


import { CreditCard, Banknote } from 'lucide-react';
import { TransitionType } from '../types/dfa';

interface PaymentChoiceProps {
  onChoice: (type: TransitionType) => void;
  position: { x: number; y: number };
}

function PaymentChoice({ onChoice, position }: PaymentChoiceProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: 20
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-4 border-4 border-orange-400">
        <p className="text-sm font-semibold text-gray-800 mb-3 text-center">Choose Payment Method</p>
        <div className="flex gap-3">
          <button
            onClick={() => onChoice('cash')}
            className="flex flex-col items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-md"
          >
            <Banknote size={24} />
            <span className="text-xs">Cash</span>
          </button>
          <button
            onClick={() => onChoice('non-cash')}
            className="flex flex-col items-center gap-2 px-4 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-all transform hover:scale-105 shadow-md"
          >
            <CreditCard size={24} />
            <span className="text-xs">Non-Cash</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentChoice;

import { Clock, ArrowRight } from 'lucide-react';
import { TransitionLogEntry } from '../types/dfa';

interface TransitionLogProps {
  log: TransitionLogEntry[];
}

function TransitionLog({ log }: TransitionLogProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 h-[580px] flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Clock className="text-blue-500" />
        Transition Log
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {log.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-center">No transitions yet.<br />Start the system to begin.</p>
          </div>
        ) : (
          log.map((entry, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 shadow-sm hover:shadow-md transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-600">Step {index + 1}</span>
                <span className="text-xs text-gray-500">{entry.time}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                  {entry.from}
                </span>
                <ArrowRight size={16} className="text-gray-400" />
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                  {entry.to}
                </span>
              </div>

              <p className="text-sm text-gray-700 font-medium">{entry.action}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransitionLog;

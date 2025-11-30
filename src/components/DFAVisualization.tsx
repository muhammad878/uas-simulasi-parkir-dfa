import { State, TransitionType } from '../types/dfa';
import StateNode from './StateNode';
import PaymentChoice from './PaymentChoice';

interface DFAVisualizationProps {
  currentState: State;
  isActive: boolean;
  onStateClick: (state: State) => void;
  onPaymentChoice: (type: TransitionType) => void;
}

function DFAVisualization({ currentState, isActive, onStateClick, onPaymentChoice }: DFAVisualizationProps) {
  const statePositions = {
    IDLE: { x: 50, y: 50 },
    MASUK: { x: 25, y: 30 },
    PARKIR: { x: 50, y: 30 },
    BAYAR: { x: 75, y: 30 },
    CASH: { x: 65, y: 60 },
    NON_CASH: { x: 85, y: 60 },
    KELUAR: { x: 25, y: 60 }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">State Diagram</h2>

      <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>
            <marker id="arrowhead-active" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
          </defs>

          <line
            x1={`${statePositions.MASUK.x}%`}
            y1={`${statePositions.MASUK.y}%`}
            x2={`${statePositions.PARKIR.x - 8}%`}
            y2={`${statePositions.PARKIR.y}%`}
            stroke={currentState === 'MASUK' ? '#10b981' : '#3b82f6'}
            strokeWidth="3"
            markerEnd={currentState === 'MASUK' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />

          <line
            x1={`${statePositions.PARKIR.x}%`}
            y1={`${statePositions.PARKIR.y}%`}
            x2={`${statePositions.BAYAR.x - 8}%`}
            y2={`${statePositions.BAYAR.y}%`}
            stroke={currentState === 'PARKIR' ? '#10b981' : '#3b82f6'}
            strokeWidth="3"
            markerEnd={currentState === 'PARKIR' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />

          <line
            x1={`${statePositions.BAYAR.x - 2}%`}
            y1={`${statePositions.BAYAR.y + 5}%`}
            x2={`${statePositions.CASH.x + 2}%`}
            y2={`${statePositions.CASH.y - 5}%`}
            stroke={currentState === 'BAYAR' ? '#10b981' : '#3b82f6'}
            strokeWidth="3"
            markerEnd={currentState === 'BAYAR' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />

          <line
            x1={`${statePositions.BAYAR.x + 2}%`}
            y1={`${statePositions.BAYAR.y + 5}%`}
            x2={`${statePositions.NON_CASH.x - 2}%`}
            y2={`${statePositions.NON_CASH.y - 5}%`}
            stroke={currentState === 'BAYAR' ? '#10b981' : '#3b82f6'}
            strokeWidth="3"
            markerEnd={currentState === 'BAYAR' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />

          <path
            d={`M ${statePositions.CASH.x - 5}% ${statePositions.CASH.y}% Q ${statePositions.KELUAR.x + 15}% ${statePositions.KELUAR.y - 10}% ${statePositions.KELUAR.x + 8}% ${statePositions.KELUAR.y}%`}
            stroke={currentState === 'CASH' ? '#10b981' : '#3b82f6'}
            strokeWidth="3"
            fill="none"
            markerEnd={currentState === 'CASH' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />

          <path
            d={`M ${statePositions.NON_CASH.x - 5}% ${statePositions.NON_CASH.y + 2}% Q ${statePositions.KELUAR.x + 20}% ${statePositions.KELUAR.y + 15}% ${statePositions.KELUAR.x + 8}% ${statePositions.KELUAR.y + 2}%`}
            stroke={currentState === 'NON_CASH' ? '#10b981' : '#3b82f6'}
            strokeWidth="3"
            fill="none"
            markerEnd={currentState === 'NON_CASH' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />

          <path
            d={`M ${statePositions.KELUAR.x}% ${statePositions.KELUAR.y - 5}% Q ${statePositions.IDLE.x - 10}% ${statePositions.IDLE.y + 15}% ${statePositions.IDLE.x}% ${statePositions.IDLE.y + 8}%`}
            stroke={(currentState === 'KELUAR' || currentState === 'CASH' || currentState === 'NON_CASH') ? '#10b981' : '#3b82f6'}
            strokeWidth="3"
            fill="none"
            markerEnd={(currentState === 'KELUAR' || currentState === 'CASH' || currentState === 'NON_CASH') ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />
        </svg>

        <StateNode
          state="IDLE"
          label="IDLE"
          position={statePositions.IDLE}
          isActive={currentState === 'IDLE'}
          isClickable={false}
          onClick={() => onStateClick('IDLE')}
          color="gray"
        />

        <StateNode
          state="MASUK"
          label="MASUK"
          position={statePositions.MASUK}
          isActive={currentState === 'MASUK'}
          isClickable={isActive && currentState === 'MASUK'}
          onClick={() => onStateClick('PARKIR')}
          color="blue"
        />

        <StateNode
          state="PARKIR"
          label="PARKIR"
          position={statePositions.PARKIR}
          isActive={currentState === 'PARKIR'}
          isClickable={isActive && currentState === 'PARKIR'}
          onClick={() => onStateClick('BAYAR')}
          color="purple"
        />

        <StateNode
          state="BAYAR"
          label="BAYAR"
          position={statePositions.BAYAR}
          isActive={currentState === 'BAYAR'}
          isClickable={false}
          onClick={() => {}}
          color="orange"
        />

        <StateNode
          state="CASH"
          label="CASH"
          position={statePositions.CASH}
          isActive={currentState === 'CASH'}
          isClickable={isActive && currentState === 'CASH'}
          onClick={() => onStateClick('KELUAR')}
          color="green"
        />

        <StateNode
          state="NON_CASH"
          label="NON CASH"
          position={statePositions.NON_CASH}
          isActive={currentState === 'NON_CASH'}
          isClickable={isActive && currentState === 'NON_CASH'}
          onClick={() => onStateClick('KELUAR')}
          color="teal"
        />

        <StateNode
          state="KELUAR"
          label="KELUAR"
          position={statePositions.KELUAR}
          isActive={currentState === 'KELUAR'}
          isClickable={isActive && currentState === 'KELUAR'}
          onClick={() => onStateClick('IDLE')}
          color="red"
        />

        {currentState === 'BAYAR' && (
          <PaymentChoice onChoice={onPaymentChoice} position={{ x: 75, y: 45 }} />
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Current State:</span>{' '}
          <span className="text-blue-600 font-bold text-lg">{currentState}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {!isActive && 'Click "Start System" to begin'}
          {isActive && currentState === 'BAYAR' && 'Choose payment method'}
          {isActive && currentState !== 'BAYAR' && 'Click on highlighted states to transition'}
        </p>
      </div>
    </div>
  );
}

export default DFAVisualization;

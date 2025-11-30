import { State } from '../types/dfa';

interface StateNodeProps {
  state: State;
  label: string;
  position: { x: number; y: number };
  isActive: boolean;
  isClickable: boolean;
  onClick: () => void;
  color: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'gray' | 'teal';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-600',
    active: 'bg-blue-600 ring-4 ring-blue-300 animate-pulse'
  },
  green: {
    bg: 'bg-green-500',
    border: 'border-green-600',
    hover: 'hover:bg-green-600',
    active: 'bg-green-600 ring-4 ring-green-300 animate-pulse'
  },
  red: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    hover: 'hover:bg-red-600',
    active: 'bg-red-600 ring-4 ring-red-300 animate-pulse'
  },
  purple: {
    bg: 'bg-purple-500',
    border: 'border-purple-600',
    hover: 'hover:bg-purple-600',
    active: 'bg-purple-600 ring-4 ring-purple-300 animate-pulse'
  },
  orange: {
    bg: 'bg-orange-500',
    border: 'border-orange-600',
    hover: 'hover:bg-orange-600',
    active: 'bg-orange-600 ring-4 ring-orange-300 animate-pulse'
  },
  gray: {
    bg: 'bg-gray-500',
    border: 'border-gray-600',
    hover: 'hover:bg-gray-600',
    active: 'bg-gray-600 ring-4 ring-gray-300 animate-pulse'
  },
  teal: {
    bg: 'bg-teal-500',
    border: 'border-teal-600',
    hover: 'hover:bg-teal-600',
    active: 'bg-teal-600 ring-4 ring-teal-300 animate-pulse'
  }
};

function StateNode({ label, position, isActive, isClickable, onClick, color }: StateNodeProps) {
  const colors = colorClasses[color];

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: isActive ? 10 : 5
      }}
    >
      <button
        onClick={onClick}
        disabled={!isClickable}
        className={`
          w-24 h-24 rounded-full border-4 flex items-center justify-center
          text-white font-bold text-sm shadow-lg transition-all duration-300
          ${isActive ? colors.active : colors.bg}
          ${colors.border}
          ${isClickable ? `${colors.hover} cursor-pointer transform hover:scale-110` : 'cursor-default'}
          ${!isClickable && !isActive ? 'opacity-70' : ''}
        `}
      >
        <span className="text-center px-2">{label}</span>
      </button>
    </div>
  );
}

export default StateNode;

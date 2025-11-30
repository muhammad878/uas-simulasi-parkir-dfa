import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

function SoundToggle({ soundEnabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-40 border-2 ${
        soundEnabled 
          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400 hover:from-emerald-600 hover:to-emerald-700' 
          : 'bg-gradient-to-br from-slate-500 to-slate-600 border-slate-400 hover:from-slate-600 hover:to-slate-700'
      }`}
      style={{
        boxShadow: soundEnabled 
          ? '0 8px 24px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          : '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
      aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
      title={soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
    >
      {soundEnabled ? (
        <Volume2 className="text-white" size={24} />
      ) : (
        <VolumeX className="text-white" size={24} />
      )}
    </button>
  );
}

export default SoundToggle;


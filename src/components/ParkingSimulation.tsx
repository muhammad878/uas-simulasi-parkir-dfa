import { useState, useEffect, useRef } from 'react';
import { CreditCard, Banknote, Receipt, Clock, Building2 } from 'lucide-react';
import { State, TransitionType, ParkingData } from '../types/dfa';
import CarIcon3D from './CarIcon3D';

interface ParkingSimulationProps {
  currentState: State;
  onNext: () => void;
  onPaymentChoice: (type: TransitionType) => void;
  parkingData: ParkingData;
  timerActive: boolean;
  timerSeconds: number;
}

function ParkingSimulation({ 
  currentState, 
  onNext, 
  onPaymentChoice, 
  parkingData,
  timerActive,
  timerSeconds 
}: ParkingSimulationProps) {
  const [carPosition, setCarPosition] = useState({ x: -100, y: 50 });
  const [gateMasukOpen, setGateMasukOpen] = useState(false);
  const [gateKeluarOpen, setGateKeluarOpen] = useState(false);
  const [showRfidMasuk, setShowRfidMasuk] = useState(false);
  const [showRfidKeluar, setShowRfidKeluar] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [rippleEffect, setRippleEffect] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const [carInParking, setCarInParking] = useState(false);
  const carRef = useRef<HTMLDivElement>(null);

  // Update visual berdasarkan state
  useEffect(() => {
    switch (currentState) {
      case 'START':
        setCarPosition({ x: -100, y: 50 });
        setGateMasukOpen(false);
        setGateKeluarOpen(false);
        setShowRfidMasuk(false);
        setShowRfidKeluar(false);
        setShowReceipt(false);
        setShowMonitor(false);
        setCarInParking(false);
        break;

      case 'MASUK_PARKIRAN':
        setCarPosition({ x: 20, y: 50 });
        setGateMasukOpen(true);
        // Mobil bergerak masuk
        setTimeout(() => {
          setCarPosition({ x: 50, y: 50 });
          setCarInParking(true);
          // Auto transition ke TAP_RFID_MASUK setelah masuk
          setTimeout(() => {
            onNext();
          }, 500);
        }, 1500);
        break;

      case 'TAP_RFID_MASUK':
        setCarPosition({ x: 50, y: 50 });
        setShowRfidMasuk(true);
        setGateMasukOpen(false);
        break;

      case 'PARKIR':
        setCarPosition({ x: 50, y: 50 });
        setShowRfidMasuk(false);
        setCarInParking(true);
        break;

      case 'KELUAR_PARKIR':
        setCarPosition({ x: 80, y: 50 });
        setCarInParking(false);
        // Auto transition ke TAP_RFID_KELUAR setelah mobil sampai di gerbang
        setTimeout(() => {
          onNext();
        }, 1000);
        break;

      case 'TAP_RFID_KELUAR':
        setCarPosition({ x: 85, y: 50 });
        setShowRfidKeluar(true);
        break;

      case 'HITUNG_TAMPILKAN':
        setShowRfidKeluar(false);
        setShowMonitor(true);
        break;

      case 'BAYAR':
        setShowMonitor(true);
        break;

      case 'KELUAR_STRUK':
        setShowReceipt(true);
        setShowMonitor(true);
        break;

      case 'BUKA_GATE':
        setGateKeluarOpen(true);
        setShowMonitor(true);
        // Auto transition ke MOBIL_KELUAR setelah gerbang terbuka
        setTimeout(() => {
          onNext();
        }, 800);
        break;

      case 'MOBIL_KELUAR':
        setGateKeluarOpen(true);
        setTimeout(() => {
          setCarPosition({ x: 110, y: 50 });
          // Auto transition ke ACCEPT setelah mobil keluar
          setTimeout(() => {
            setGateKeluarOpen(false);
            onNext();
          }, 1500);
        }, 500);
        break;

      case 'ACCEPT':
        setGateKeluarOpen(false);
        setShowMonitor(true);
        // Auto transition ke START setelah 2 detik
        setTimeout(() => {
          onNext();
        }, 2000);
        break;
    }
  }, [currentState]);

  const handleTapRfidMasuk = () => {
    setRippleEffect(true);
    setTimeout(() => setRippleEffect(false), 600);
    onNext();
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl shadow-xl p-6 animate-fade-in border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Parking Area Simulation</h2>

      {/* Monitor Display - Modern Design */}
      {showMonitor && (
        <div className="mb-4 p-4 bg-slate-800 rounded-xl border-2 border-slate-700 shadow-2xl animate-slide-in">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-100 font-semibold text-base flex items-center gap-2">
                <CreditCard className="text-slate-400" size={20} />
                Payment Monitor
              </h3>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            {currentState === 'HITUNG_TAMPILKAN' || currentState === 'BAYAR' || currentState === 'KELUAR_STRUK' || currentState === 'BUKA_GATE' || currentState === 'MOBIL_KELUAR' || currentState === 'ACCEPT' ? (
              <div className="space-y-1.5 text-emerald-400 font-mono text-sm">
                <p><span className="text-slate-400">RFID:</span> {parkingData.rfidNumber}</p>
                <p><span className="text-slate-400">Masuk:</span> {formatTime(parkingData.waktuMasuk)}</p>
                <p><span className="text-slate-400">Keluar:</span> {formatTime(parkingData.waktuKeluar)}</p>
                <p><span className="text-slate-400">Durasi:</span> {Math.floor(parkingData.durasi / 60)}j {parkingData.durasi % 60}m</p>
                <p><span className="text-slate-400">Tarif:</span> {formatCurrency(parkingData.tarif)}/jam</p>
                <div className="border-t border-slate-700 pt-2 mt-2">
                  <p className="text-lg font-bold text-amber-400 animate-pulse-glow">
                    TOTAL: {formatCurrency(parkingData.total)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-400 mx-auto mb-2"></div>
                <p className="text-slate-400 text-xs">Processing...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Area Parkiran dengan Gedung - Modern Design */}
      <div 
        className="relative w-full h-96 rounded-xl overflow-hidden mb-4 border-2 border-slate-300"
        style={{
          background: 'linear-gradient(to bottom, #64748b 0%, #475569 30%, #334155 100%)',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Gedung Parkiran - Background */}
        <div className="absolute inset-0">
          {/* Dinding belakang */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: 'linear-gradient(to top, #475569 0%, #64748b 100%)',
              borderTop: '3px solid #334155'
            }}
          ></div>
          
          {/* Atap parkiran */}
          <div 
            className="absolute top-0 left-0 right-0 h-16"
            style={{
              background: 'linear-gradient(to bottom, #1e293b 0%, #334155 100%)',
              borderBottom: '2px solid #475569'
            }}
          >
            {/* Detail atap */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-600"></div>
          </div>

          {/* Kolom/Pilar parkiran */}
          <div className="absolute bottom-32 left-1/4 w-2 h-32 bg-slate-600 opacity-50"></div>
          <div className="absolute bottom-32 right-1/4 w-2 h-32 bg-slate-600 opacity-50"></div>
        </div>

        {/* Grid pattern lantai */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 opacity-10" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Path/Area Parkir di tengah */}
        <div 
          className="absolute bottom-32 left-0 right-0 h-4"
          style={{
            background: 'linear-gradient(to bottom, #78716c 0%, #57534e 50%, #44403c 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2)',
            borderTop: '2px dashed rgba(255, 255, 255, 0.2)',
            borderBottom: '2px dashed rgba(255, 255, 255, 0.2)'
          }}
        ></div>

        {/* Label "Parking Area" */}
        <div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 px-5 py-1.5 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <span className="text-xs font-semibold text-slate-700">Parking Area</span>
        </div>

        {/* Gerbang Masuk (Kiri) */}
        <div className="absolute left-4 bottom-32 transform translate-y-1/2">
          <div 
            className={`relative w-20 h-28 rounded-lg transition-all duration-500 flex items-center justify-center shadow-lg`}
            style={{
              background: gateMasukOpen 
                ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              boxShadow: gateMasukOpen
                ? '0 4px 12px rgba(100, 116, 139, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)'
                : '0 4px 12px rgba(220, 38, 38, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
              border: `3px solid ${gateMasukOpen ? '#475569' : '#991b1b'}`
            }}
          >
            <span className="text-xs font-bold text-white drop-shadow-md">MASUK</span>
            <div 
              className={`absolute top-2 right-2 w-3 h-3 rounded-full ${gateMasukOpen ? 'bg-emerald-400' : 'bg-red-400'} animate-led-blink`}
              style={{
                boxShadow: gateMasukOpen
                  ? '0 0 8px rgba(52, 211, 153, 0.8)'
                  : '0 0 8px rgba(248, 113, 113, 0.8)'
              }}
            ></div>
          </div>
        </div>

        {/* Gerbang Keluar (Kanan) */}
        <div className="absolute right-4 bottom-32 transform translate-y-1/2">
          <div 
            className={`relative w-20 h-28 rounded-lg transition-all duration-500 flex items-center justify-center shadow-lg`}
            style={{
              background: gateKeluarOpen 
                ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              boxShadow: gateKeluarOpen
                ? '0 4px 12px rgba(100, 116, 139, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)'
                : '0 4px 12px rgba(220, 38, 38, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
              border: `3px solid ${gateKeluarOpen ? '#475569' : '#991b1b'}`
            }}
          >
            <span className="text-xs font-bold text-white drop-shadow-md">KELUAR</span>
            <div 
              className={`absolute top-2 right-2 w-3 h-3 rounded-full ${gateKeluarOpen ? 'bg-emerald-400' : 'bg-red-400'} animate-led-blink`}
              style={{
                boxShadow: gateKeluarOpen
                  ? '0 0 8px rgba(52, 211, 153, 0.8)'
                  : '0 0 8px rgba(248, 113, 113, 0.8)'
              }}
            ></div>
          </div>
        </div>

        {/* RFID Scanner di dalam parkiran - lebih jelas */}
        {showRfidMasuk && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div 
                className="text-white px-5 py-3 rounded-xl text-sm font-bold animate-bounce-in flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <Building2 size={18} />
                <span>RFID Scanner</span>
              </div>
              {rippleEffect && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    className="w-28 h-28 border-3 border-slate-400 rounded-full animate-ripple"
                    style={{
                      boxShadow: '0 0 20px rgba(148, 163, 184, 0.8)'
                    }}
                  ></div>
                </div>
              )}
              {/* Glow effect */}
              <div 
                className="absolute inset-0 bg-slate-400 opacity-40 rounded-xl blur-lg animate-pulse-glow pointer-events-none"
                style={{
                  boxShadow: '0 0 25px rgba(148, 163, 184, 0.6)'
                }}
              ></div>
            </div>
          </div>
        )}

        {/* RFID Scanner di gerbang keluar - lebih jelas */}
        {showRfidKeluar && (
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 z-20">
            <div className="relative">
              <div 
                className="text-white px-5 py-3 rounded-xl text-sm font-bold animate-bounce-in flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <CreditCard size={18} />
                <span>RFID</span>
              </div>
              {/* Glow effect */}
              <div 
                className="absolute inset-0 bg-slate-400 opacity-40 rounded-xl blur-lg animate-pulse-glow pointer-events-none"
                style={{
                  boxShadow: '0 0 25px rgba(148, 163, 184, 0.6)'
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Mobil dengan animasi smooth */}
        <div
          ref={carRef}
          className="absolute transition-all duration-1500 ease-in-out"
          style={{
            left: `${carPosition.x}%`,
            top: `${carPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            filter: carInParking 
              ? 'drop-shadow(0 8px 16px rgba(37, 99, 235, 0.5))'
              : 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))',
            transition: 'left 1.5s cubic-bezier(0.4, 0, 0.2, 1), top 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="relative">
            <CarIcon3D 
              size={90}
              color="#3b82f6"
              isMoving={currentState === 'MASUK_PARKIRAN' || currentState === 'KELUAR_PARKIR' || currentState === 'MOBIL_KELUAR'}
              className={carInParking ? 'animate-glow-pulse' : ''}
            />
            {/* Shadow di bawah mobil */}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2"
              style={{
                width: '75%',
                height: '10px',
                background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
                borderRadius: '50%',
                marginTop: '4px'
              }}
            ></div>
          </div>
          {/* Trail effect saat bergerak */}
          {(currentState === 'MASUK_PARKIRAN' || currentState === 'KELUAR_PARKIR' || currentState === 'MOBIL_KELUAR') && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Multiple trail layers untuk efek lebih baik */}
              <div 
                className="w-24 h-24 rounded-full animate-trail absolute"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                  filter: 'blur(12px)',
                  animationDelay: '0s'
                }}
              ></div>
              <div 
                className="w-16 h-16 rounded-full animate-trail absolute"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)',
                  filter: 'blur(8px)',
                  animationDelay: '0.1s'
                }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* Timer Display - Modern */}
      {timerActive && (
        <div className="mb-4 p-4 bg-slate-800 rounded-lg border border-slate-700 animate-fade-in shadow-lg">
          <div className="flex items-center gap-3 justify-center">
            <Clock className="text-amber-400 animate-rotate-glow" size={24} />
            <div>
              <span className="text-xl font-bold text-amber-400 animate-number-count">
                {formatTimer(timerSeconds)}
              </span>
              <p className="text-center text-xs text-slate-400 mt-1">Parking Duration</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((timerSeconds % 3600) / 3600 * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Struk Preview - Modern */}
      {showReceipt && (
        <div className="mb-4 bg-slate-50 rounded-lg p-4 border border-slate-300 shadow-md animate-slide-up">
          <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2 text-sm">
            <Receipt size={18} className="text-slate-600" />
            Receipt
          </h3>
          <div className={`bg-white p-3 rounded border border-slate-300 text-xs font-mono shadow-sm ${currentState === 'KELUAR_STRUK' ? 'animate-shake' : ''}`}>
            <div className="text-center border-b border-slate-300 pb-2 mb-2">
              <p className="font-bold text-slate-800">PARKING RECEIPT</p>
              <p className="text-xs text-slate-500">==================</p>
            </div>
            <div className="space-y-1 text-slate-700">
              <p>RFID: {parkingData.rfidNumber}</p>
              <p>In: {formatTime(parkingData.waktuMasuk)}</p>
              <p>Out: {formatTime(parkingData.waktuKeluar)}</p>
              <p>Duration: {Math.floor(parkingData.durasi / 60)}h {parkingData.durasi % 60}m</p>
              <p className="border-t border-slate-300 pt-1 mt-1 font-semibold">
                Total: {formatCurrency(parkingData.total)}
              </p>
              <p className="text-center text-xs mt-2 text-slate-500">Thank You</p>
            </div>
          </div>
        </div>
      )}

      {/* Tombol Aksi - Modern Design */}
      <div className="space-y-3">
        {currentState === 'TAP_RFID_MASUK' && (
          <button
            onClick={handleTapRfidMasuk}
            className="w-full py-3.5 px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 animate-bounce-in"
          >
            <Building2 size={20} />
            <span>Tap RFID di Parkiran</span>
          </button>
        )}

        {currentState === 'PARKIR' && (
          <button
            onClick={onNext}
            className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>Keluar dari Parkiran</span>
          </button>
        )}

        {currentState === 'KELUAR_PARKIR' && (
          <div className="w-full py-3.5 px-6 bg-slate-600 text-white rounded-lg font-semibold text-base shadow-lg flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Mobil menuju gerbang keluar...</span>
          </div>
        )}

        {currentState === 'TAP_RFID_KELUAR' && (
          <button
            onClick={onNext}
            className="w-full py-3.5 px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 animate-bounce-in"
          >
            <CreditCard size={20} />
            <span>Tap RFID di Gerbang Keluar</span>
          </button>
        )}

        {currentState === 'HITUNG_TAMPILKAN' && (
          <button
            onClick={onNext}
            className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 animate-fade-in"
          >
            <span>Lanjut Pembayaran</span>
          </button>
        )}

        {currentState === 'BAYAR' && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-300 shadow-md animate-fade-in">
            <p className="text-center font-semibold text-slate-800 mb-3 text-sm">Pilih Metode Pembayaran</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => onPaymentChoice('cash')}
                className="flex flex-col items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Banknote size={28} />
                <span className="text-sm">TUNAI</span>
              </button>
              <button
                onClick={() => onPaymentChoice('non-cash')}
                className="flex flex-col items-center gap-2 px-5 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <CreditCard size={28} />
                <span className="text-sm">NON-TUNAI</span>
              </button>
            </div>
          </div>
        )}

        {currentState === 'KELUAR_STRUK' && (
          <button
            onClick={onNext}
            className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 animate-fade-in"
          >
            <span>Buka Gerbang Keluar</span>
          </button>
        )}

        {currentState === 'BUKA_GATE' && (
          <div className="w-full py-3.5 px-6 bg-emerald-600 text-white rounded-lg font-semibold text-base shadow-lg flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Membuka gerbang keluar...</span>
          </div>
        )}

        {currentState === 'MOBIL_KELUAR' && (
          <div className="w-full py-3.5 px-6 bg-emerald-600 text-white rounded-lg font-semibold text-base shadow-lg flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Mobil sedang keluar...</span>
          </div>
        )}

        {currentState === 'ACCEPT' && (
          <div className="text-center p-5 bg-emerald-50 rounded-lg border border-emerald-200 shadow-md animate-bounce-in">
            <p className="text-2xl font-bold text-emerald-700 mb-2">TERIMA KASIH</p>
            <p className="text-slate-600 text-sm">Mobil telah keluar dari parkiran</p>
          </div>
        )}
      </div>

      {/* Status - Modern */}
      <div className="mt-4 p-3 bg-slate-100 rounded-lg border border-slate-300">
        <p className="text-xs text-slate-700">
          <span className="font-semibold">State:</span>{' '}
          <span className="text-slate-800 font-bold">{currentState}</span>
        </p>
      </div>
    </div>
  );
}

export default ParkingSimulation;

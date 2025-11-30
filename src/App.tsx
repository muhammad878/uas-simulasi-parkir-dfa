import { useState, useEffect } from 'react';
import { Play, RotateCcw, Car, Menu, X } from 'lucide-react';
import ParkingSimulation from './components/ParkingSimulation';
import TransitionLog from './components/TransitionLog';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import Confetti from './components/Confetti';
import SoundToggle from './components/SoundToggle';
import DFAFormalDefinition from './components/DFAFormalDefinition';
import { State, TransitionType, ParkingData } from './types/dfa';
import { useToast } from './hooks/useToast';
import { useSound } from './hooks/useSound';

function App() {
  const [currentState, setCurrentState] = useState<State>('START');
  const [transitionLog, setTransitionLog] = useState<Array<{ from: State; to: State; action: string; time: string }>>([]);
  const [parkingData, setParkingData] = useState<ParkingData>({
    rfidNumber: 'RFID-' + Math.floor(Math.random() * 10000).toString().padStart(5, '0'),
    waktuMasuk: null,
    waktuKeluar: null,
    durasi: 0,
    tarif: 5000,
    total: 0
  });
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toasts, showToast, removeToast } = useToast();
  const { soundEnabled, toggleSound, playRfidBeep, playSuccessSound, playPaymentSound, playGateSound } = useSound();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const handleStateTransition = (newState: State, action: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTransitionLog(prev => [...prev, { from: currentState, to: newState, action, time: timestamp }]);
    setCurrentState(newState);
  };

  const handleStart = () => {
    const newRfid = 'RFID-' + Math.floor(Math.random() * 10000).toString().padStart(5, '0');
    setParkingData({
      rfidNumber: newRfid,
      waktuMasuk: null,
      waktuKeluar: null,
      durasi: 0,
      tarif: 5000,
      total: 0
    });
    setTransitionLog([]);
    setTimerActive(false);
    setTimerSeconds(0);
    showToast('info', 'Simulasi dimulai! Mobil memasuki area parkiran');
    handleStateTransition('MASUK_PARKIRAN', 'Mobil datang, masuk ke area parkiran');
  };

  const handleReset = () => {
    setCurrentState('START');
    setTransitionLog([]);
    setTimerActive(false);
    setTimerSeconds(0);
    setParkingData({
      rfidNumber: 'RFID-' + Math.floor(Math.random() * 10000).toString().padStart(5, '0'),
      waktuMasuk: null,
      waktuKeluar: null,
      durasi: 0,
      tarif: 5000,
      total: 0
    });
    setShowConfetti(false);
    showToast('info', 'Simulasi direset ke awal');
  };

  const handleNext = () => {
    switch (currentState) {
      case 'MASUK_PARKIRAN':
        handleStateTransition('TAP_RFID_MASUK', 'Mobil masuk parkiran, siap tap RFID');
        break;

      case 'TAP_RFID_MASUK':
        // Timer mulai aktif setelah tap RFID di dalam parkiran
        const waktuMasuk = new Date();
        setParkingData(prev => ({ ...prev, waktuMasuk }));
        setTimerActive(true);
        setTimerSeconds(0);
        playRfidBeep();
        showToast('success', 'RFID berhasil terbaca! Timer parkir aktif');
        handleStateTransition('PARKIR', 'RFID terbaca, mobil parkir, timer aktif');
        break;

      case 'PARKIR':
        handleStateTransition('KELUAR_PARKIR', 'Mobil keluar dari slot parkir');
        break;

      case 'KELUAR_PARKIR':
        handleStateTransition('TAP_RFID_KELUAR', 'Mobil ke gerbang keluar');
        break;

      case 'TAP_RFID_KELUAR':
        // Timer berhenti setelah tap RFID di gerbang keluar
        setTimerActive(false);
        const waktuKeluar = new Date();
        const durasi = parkingData.waktuMasuk 
          ? Math.floor((waktuKeluar.getTime() - parkingData.waktuMasuk.getTime()) / 60000)
          : Math.floor(timerSeconds / 60);
        const total = Math.ceil((durasi / 60) * parkingData.tarif);
        setParkingData(prev => ({
          ...prev,
          waktuKeluar,
          durasi,
          total
        }));
        playRfidBeep();
        showToast('info', 'RFID terbaca! Menghitung biaya parkir...');
        handleStateTransition('HITUNG_TAMPILKAN', 'RFID terbaca, timer berhenti, menghitung biaya');
        break;

      case 'HITUNG_TAMPILKAN':
        handleStateTransition('BAYAR', 'Total biaya ditampilkan');
        break;

      case 'KELUAR_STRUK':
        handleStateTransition('BUKA_GATE', 'Struk keluar');
        break;

      case 'BUKA_GATE':
        playGateSound();
        showToast('success', 'Gerbang keluar terbuka!');
        handleStateTransition('MOBIL_KELUAR', 'Gerbang keluar terbuka');
        break;

      case 'MOBIL_KELUAR':
        playSuccessSound();
        showToast('success', 'Mobil berhasil keluar dari parkiran!');
        handleStateTransition('ACCEPT', 'Mobil keluar dari parkiran');
        break;

      case 'ACCEPT':
        setShowConfetti(true);
        showToast('success', 'Proses parkir selesai! Terima kasih 🎉', 5000);
        handleStateTransition('START', 'Proses selesai, kembali ke awal');
        setTimerActive(false);
        setTimerSeconds(0);
        setTimeout(() => setShowConfetti(false), 4000);
        break;

      default:
        break;
    }
  };

  const handlePaymentChoice = (type: TransitionType) => {
    if (currentState === 'BAYAR') {
      const action = type === 'cash' ? 'Pilih pembayaran Tunai' : 'Pilih pembayaran Non-Tunai';
      playPaymentSound();
      showToast('success', `Pembayaran ${type === 'cash' ? 'tunai' : 'non-tunai'} berhasil!`);
      handleStateTransition('KELUAR_STRUK', action);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
      {/* Header Navbar - Web Standard */}
      <header 
        className="sticky top-0 z-50 w-full bg-white border-b border-slate-200"
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div 
                className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md hover:shadow-lg transition-shadow"
                style={{
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <Car className="text-white" size={22} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-800 leading-tight">
                  DFA Parking System
                </h1>
                <p className="text-xs text-slate-500">Simulation Platform</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-bold text-slate-800">DFA Parking</h1>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <a 
                href="#simulation" 
                className="text-slate-700 hover:text-emerald-600 font-medium text-sm transition-colors relative group"
              >
                Simulation
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-slate-700 hover:text-emerald-600 font-medium text-sm transition-colors relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#docs" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('docs-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-slate-700 hover:text-emerald-600 font-medium text-sm transition-colors relative group"
              >
                Documentation
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* Status Badge & Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Status Badge - Desktop */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200/80 shadow-sm">
                <div className={`w-2 h-2 rounded-full ${currentState === 'START' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                <span className="text-xs font-medium text-slate-700">
                  {currentState === 'START' ? 'Ready' : 'Running'}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-white animate-slide-in">
              <nav className="container mx-auto px-4 py-4 space-y-3">
                <a 
                  href="#simulation" 
                  className="block px-4 py-2.5 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Simulation
                </a>
                <a 
                  href="#about" 
                  className="block px-4 py-2.5 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  About
                </a>
                <a 
                  href="#docs" 
                  className="block px-4 py-2.5 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById('docs-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Documentation
                </a>
                {/* Mobile Status */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 mt-2">
                  <div className={`w-2 h-2 rounded-full ${currentState === 'START' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                  <span className="text-xs font-medium text-slate-700">
                    Status: {currentState === 'START' ? 'Ready' : 'Running'}
                  </span>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Control Buttons dengan 3D Effect */}
        <div className="flex gap-4 justify-center mb-8 relative">
          {/* Shadow layer untuk buttons */}
          <div 
            className="absolute inset-0 flex gap-4 justify-center"
            style={{
              transform: 'translateY(4px)',
              filter: 'blur(8px)',
              opacity: 0.3,
              zIndex: 0
            }}
          >
            <div className="w-40 h-12 bg-emerald-600 rounded-lg"></div>
            <div className="w-32 h-12 bg-slate-600 rounded-lg"></div>
          </div>

          {/* Actual buttons */}
          <div className="relative z-10 flex gap-4">
          <button
            onClick={handleStart}
              disabled={currentState !== 'START'}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:-translate-y-0.5 disabled:hover:scale-100 disabled:hover:translate-y-0 relative overflow-hidden group"
              style={{
                boxShadow: currentState === 'START' 
                  ? '0 10px 25px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                  : '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Shine effect */}
              <span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"
                style={{
                  transform: 'translateX(-100%) skewX(-20deg)',
                  animation: 'shine 2s infinite'
                }}
              ></span>
              <Play size={20} className="relative z-10" />
              <span className="relative z-10">Mulai Simulasi</span>
          </button>
          <button
            onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group"
              style={{
                boxShadow: '0 10px 25px rgba(51, 65, 85, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Shine effect */}
              <span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"
                style={{
                  transform: 'translateX(-100%) skewX(-20deg)',
                  animation: 'shine 2s infinite'
                }}
              ></span>
              <RotateCcw size={20} className="relative z-10" />
              <span className="relative z-10">Reset</span>
          </button>
          </div>
        </div>

        <div id="simulation" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2">
            <ParkingSimulation
              currentState={currentState}
              onNext={handleNext}
              onPaymentChoice={handlePaymentChoice}
              parkingData={parkingData}
              timerActive={timerActive}
              timerSeconds={timerSeconds}
            />
          </div>
          <div className="lg:col-span-1">
            <TransitionLog log={transitionLog} />
          </div>
        </div>

        {/* About Section */}
        <section id="about-section" className="mb-16 py-12 bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Tentang Proyek</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-slate-700">
              <p className="text-lg leading-relaxed">
                <strong>DFA Parking System Simulation</strong> adalah simulasi interaktif sistem parkir otomatis yang menggunakan konsep <strong>Deterministic Finite Automata (DFA)</strong> untuk memodelkan alur proses parkir.
              </p>
              <p className="leading-relaxed">
                Sistem ini mensimulasikan proses lengkap parkir otomatis mulai dari mobil masuk ke area parkiran, tap RFID untuk registrasi, parkir di slot, hingga proses pembayaran dan keluar dari parkiran.
              </p>
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-2">Fitur Utama:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Simulasi visual dengan animasi mobil yang realistis</li>
                  <li>Timer real-time untuk menghitung durasi parkir</li>
                  <li>Sistem pembayaran tunai dan non-tunai</li>
                  <li>Pencetakan struk pembayaran</li>
                  <li>Log transisi state untuk tracking proses</li>
                  <li>Interface modern dan responsif</li>
                </ul>
              </div>
              <p className="mt-6 text-sm text-slate-500 text-center">
                Proyek ini dibuat untuk demonstrasi konsep DFA dalam aplikasi sistem parkir otomatis.
              </p>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="docs-section" className="mb-16 py-12 bg-slate-50 rounded-2xl shadow-lg border border-slate-200">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Dokumentasi</h2>
            
            {/* DFA Formal Definition */}
            <div className="max-w-6xl mx-auto mb-12">
              <DFAFormalDefinition />
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Konsep DFA</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <strong>Deterministic Finite Automata (DFA)</strong> adalah model komputasi yang terdiri dari:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
                  <li><strong>States (Q):</strong> Himpunan state yang merepresentasikan kondisi sistem</li>
                  <li><strong>Alphabet (Σ):</strong> Himpunan simbol input</li>
                  <li><strong>Transition Function (δ):</strong> Fungsi yang menentukan perpindahan state</li>
                  <li><strong>Start State (q₀):</strong> State awal sistem</li>
                  <li><strong>Accept States (F):</strong> State akhir yang menandakan proses selesai</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">State dalam Sistem</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">START</strong> - State awal
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">MASUK_PARKIRAN</strong> - Mobil masuk
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">TAP_RFID_MASUK</strong> - Tap RFID masuk
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">PARKIR</strong> - Mobil parkir
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">KELUAR_PARKIR</strong> - Mobil keluar
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">TAP_RFID_KELUAR</strong> - Tap RFID keluar
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">HITUNG_TAMPILKAN</strong> - Hitung biaya
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">BAYAR</strong> - Proses pembayaran
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">KELUAR_STRUK</strong> - Cetak struk
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">BUKA_GATE</strong> - Buka gerbang
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">MOBIL_KELUAR</strong> - Mobil keluar
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-800">ACCEPT</strong> - Proses selesai
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Cara Menggunakan</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-700">
                  <li>Klik tombol <strong>"Mulai Simulasi"</strong> untuk memulai</li>
                  <li>Ikuti alur simulasi dengan mengklik tombol yang muncul di setiap state</li>
                  <li>Tap RFID di parkiran untuk memulai timer parkir</li>
                  <li>Pilih metode pembayaran (Tunai atau Non-Tunai) setelah tap RFID keluar</li>
                  <li>Buka gerbang keluar setelah pembayaran selesai</li>
                  <li>Lihat log transisi di panel kanan untuk tracking proses</li>
                </ol>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Teknologi yang Digunakan</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">React</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Vite</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Lucide Icons</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

      {/* Sound Toggle */}
      <SoundToggle soundEnabled={soundEnabled} onToggle={toggleSound} />
    </div>
  );
}

export default App;

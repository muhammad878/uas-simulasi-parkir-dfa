import { Car, Zap, Shield, Clock } from 'lucide-react';

function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl mb-10 border-2 border-white">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 animate-slide-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-emerald-200">
              <Zap className="text-emerald-600" size={18} />
              <span className="text-sm font-semibold text-slate-700">Interactive Demo</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                DFA Parking
              </span>
              <br />
              <span className="text-slate-700">System</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
              Simulasi Parkir Otomatis dengan Animasi Real-time
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Sistem parkir otomatis berbasis <strong>Deterministic Finite Automata (DFA)</strong> dengan visualisasi interaktif dan real-time monitoring.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200">
                <Shield className="text-emerald-600" size={18} />
                <span className="text-sm font-semibold text-slate-700">Secure RFID</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200">
                <Clock className="text-blue-600" size={18} />
                <span className="text-sm font-semibold text-slate-700">Real-time Timer</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200">
                <Zap className="text-purple-600" size={18} />
                <span className="text-sm font-semibold text-slate-700">Auto Payment</span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main Car Illustration */}
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white">
                <div className="flex flex-col items-center gap-6">
                  {/* Animated Car Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full filter blur-2xl opacity-50 animate-pulse-glow"></div>
                    <div className="relative bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl p-8 shadow-xl">
                      <Car className="text-white" size={80} />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                      <p className="text-2xl font-bold text-emerald-600">6</p>
                      <p className="text-xs text-slate-600 font-medium">States</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <p className="text-2xl font-bold text-blue-600">100%</p>
                      <p className="text-xs text-slate-600 font-medium">Auto</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <p className="text-2xl font-bold text-purple-600">⚡</p>
                      <p className="text-xs text-slate-600 font-medium">Fast</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce-in" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce-in" style={{ animationDelay: '0.7s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-slate-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;


import { CheckCircle, XCircle, Calculator, Hash, ArrowRight, Info } from 'lucide-react';

function DFAFormalDefinition() {
  const states = [
    { id: 'q₀', name: 'START', desc: 'State awal sistem, menunggu kendaraan (Mulai)', color: 'emerald' },
    { id: 'q₁', name: 'TEMPEL_RFID', desc: 'Tempelkan RFID Card untuk registrasi', color: 'blue' },
    { id: 'q₂', name: 'HITUNG_TAMPILKAN', desc: 'Hitung biaya & tampilkan total di layar', color: 'amber' },
    { id: 'q₃', name: 'BAYAR', desc: 'State untuk memilih metode pembayaran', color: 'purple' },
    { id: 'q₄', name: 'KELUAR_STRUK', desc: 'Sistem mencetak dan mengeluarkan struk', color: 'orange' },
    { id: 'q₅', name: 'ACCEPT', desc: 'State akhir, proses parkir selesai', color: 'green' }
  ];

  const alphabet = [
    { symbol: 'α', name: 'mulai', desc: 'Proses dimulai, sistem aktif' },
    { symbol: 'β', name: 'tempel_rfid', desc: 'RFID Card ditap/ditempelkan ke reader' },
    { symbol: 'γ', name: 'hitung_tampilkan', desc: 'Sistem menghitung dan menampilkan biaya' },
    { symbol: 'θ₁', name: 'pilih_tunai', desc: 'Pembayaran dengan uang tunai (cash)' },
    { symbol: 'θ₂', name: 'pilih_nontunai', desc: 'Pembayaran dengan kartu/e-wallet (non-cash)' },
    { symbol: 'δ', name: 'keluarkan_struk', desc: 'Printer mengeluarkan struk pembayaran' },
    { symbol: 'ε', name: 'selesai', desc: 'Proses selesai, sistem reset' }
  ];

  const transitions = [
    { from: 'q₀ (START)', input: 'α (mulai)', to: 'q₁ (TEMPEL_RFID)', action: 'Proses dimulai' },
    { from: 'q₁ (TEMPEL_RFID)', input: 'β (tempel_rfid)', to: 'q₂ (HITUNG_TAMPILKAN)', action: 'RFID Card ditap' },
    { from: 'q₂ (HITUNG_TAMPILKAN)', input: 'γ (hitung_tampilkan)', to: 'q₃ (BAYAR)', action: 'Hitung & tampil biaya' },
    { from: 'q₃ (BAYAR)', input: 'θ₁ (pilih_tunai)', to: 'q₄ (KELUAR_STRUK)', action: 'Bayar cash' },
    { from: 'q₃ (BAYAR)', input: 'θ₂ (pilih_nontunai)', to: 'q₄ (KELUAR_STRUK)', action: 'Bayar non-cash' },
    { from: 'q₄ (KELUAR_STRUK)', input: 'δ (keluarkan_struk)', to: 'q₅ (ACCEPT)', action: 'Cetak struk' },
    { from: 'q₅ (ACCEPT)', input: 'ε (selesai)', to: 'q₀ (START)', action: 'Reset sistem' }
  ];

  const acceptedExamples = [
    {
      title: 'Pembayaran Tunai',
      input: 'α β γ θ₁ δ ε',
      trace: [
        { step: 0, state: 'q₀ (START)', action: 'Sistem idle' },
        { step: 1, state: 'q₀', input: 'α', next: 'q₁', action: 'Proses dimulai' },
        { step: 2, state: 'q₁', input: 'β', next: 'q₂', action: 'Tap RFID Card' },
        { step: 3, state: 'q₂', input: 'γ', next: 'q₃', action: 'Hitung biaya: Rp 15.000' },
        { step: 4, state: 'q₃', input: 'θ₁', next: 'q₄', action: 'Bayar TUNAI' },
        { step: 5, state: 'q₄', input: 'δ', next: 'q₅', action: 'Cetak struk' },
        { step: 6, state: 'q₅', input: 'ε', next: 'q₀', action: 'ACCEPT - Reset' }
      ]
    },
    {
      title: 'Pembayaran Non-Tunai',
      input: 'α β γ θ₂ δ ε',
      trace: [
        { step: 0, state: 'q₀ (START)', action: 'Sistem idle' },
        { step: 1, state: 'q₀', input: 'α', next: 'q₁', action: 'Proses dimulai' },
        { step: 2, state: 'q₁', input: 'β', next: 'q₂', action: 'Tap RFID Card' },
        { step: 3, state: 'q₂', input: 'γ', next: 'q₃', action: 'Hitung biaya: Rp 15.000' },
        { step: 4, state: 'q₃', input: 'θ₂', next: 'q₄', action: 'Bayar NON-TUNAI' },
        { step: 5, state: 'q₄', input: 'δ', next: 'q₅', action: 'Cetak struk' },
        { step: 6, state: 'q₅', input: 'ε', next: 'q₀', action: 'ACCEPT - Reset' }
      ]
    }
  ];

  const rejectedExample = {
    title: 'Input Invalid',
    input: 'α γ',
    reason: 'Missing tempel_rfid',
    trace: [
      { step: 0, state: 'q₀ (START)', action: 'Sistem idle' },
      { step: 1, state: 'q₀', input: 'α', next: 'q₁', action: 'Proses dimulai' },
      { step: 2, state: 'q₁', input: 'γ', next: 'UNDEFINED', action: '❌ ERROR' }
    ]
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      emerald: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      amber: 'bg-amber-100 text-amber-700 border-amber-300',
      purple: 'bg-purple-100 text-purple-700 border-purple-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300',
      green: 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Definisi 5-Tuple DFA */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
          <Calculator className="text-emerald-600" size={24} style={{ minWidth: '24px' }} />
          <span className="text-lg md:text-2xl">Definisi 5-Tuple DFA</span>
        </h3>
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-emerald-200">
          <div className="text-center mb-3 md:mb-4">
            <p className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 break-all">M = (Q, Σ, δ, q₀, F)</p>
            <p className="text-xs md:text-sm text-slate-600">Deterministic Finite Automata</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
            <div className="bg-white rounded-lg p-3 md:p-4 border border-slate-200">
              <p className="font-semibold text-slate-800 mb-1 text-sm md:text-base">Q</p>
              <p className="text-xs md:text-sm text-slate-600">Himpunan state (finite set of states)</p>
            </div>
            <div className="bg-white rounded-lg p-3 md:p-4 border border-slate-200">
              <p className="font-semibold text-slate-800 mb-1 text-sm md:text-base">Σ</p>
              <p className="text-xs md:text-sm text-slate-600">Alfabet input (finite set of input symbols)</p>
            </div>
            <div className="bg-white rounded-lg p-3 md:p-4 border border-slate-200">
              <p className="font-semibold text-slate-800 mb-1 text-sm md:text-base">δ</p>
              <p className="text-xs md:text-sm text-slate-600">Fungsi transisi: Q × Σ → Q</p>
            </div>
            <div className="bg-white rounded-lg p-3 md:p-4 border border-slate-200">
              <p className="font-semibold text-slate-800 mb-1 text-sm md:text-base">q₀</p>
              <p className="text-xs md:text-sm text-slate-600">State awal (initial/start state)</p>
            </div>
            <div className="bg-white rounded-lg p-3 md:p-4 border border-slate-200 md:col-span-2">
              <p className="font-semibold text-slate-800 mb-1 text-sm md:text-base">F</p>
              <p className="text-xs md:text-sm text-slate-600">Himpunan state akhir/accept states, F ⊆ Q</p>
            </div>
          </div>
        </div>
      </div>

      {/* Himpunan State (Q) */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
          <Hash className="text-blue-600" size={24} style={{ minWidth: '24px' }} />
          <span className="text-lg md:text-2xl">Himpunan State (Q)</span>
        </h3>
        <p className="text-sm md:text-base text-slate-600 mb-3 md:mb-4">Sistem parkir memiliki <strong>6 state</strong> yang merepresentasikan kondisi berbeda dalam proses parkir:</p>
        <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-slate-200">
          <p className="text-lg md:text-xl font-bold text-slate-800 text-center break-all">Q = {'{'} q₀, q₁, q₂, q₃, q₄, q₅ {'}'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {states.map((state, index) => (
            <div
              key={index}
              className={`rounded-lg md:rounded-xl p-3 md:p-4 border-2 ${getColorClass(state.color)} transition-all hover:shadow-lg hover:scale-105`}
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xl md:text-2xl font-bold">{state.id}</span>
                <span className="text-xs md:text-sm font-semibold bg-white/50 px-2 py-1 rounded break-all">{state.name}</span>
              </div>
              <p className="text-xs md:text-sm mt-2">{state.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alfabet Input (Σ) */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
          <Info className="text-amber-600" size={24} style={{ minWidth: '24px' }} />
          <span className="text-lg md:text-2xl">Alfabet Input (Σ)</span>
        </h3>
        <p className="text-sm md:text-base text-slate-600 mb-3 md:mb-4">Alfabet input adalah himpunan simbol yang dapat diterima oleh sistem DFA:</p>
        <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-slate-200">
          <p className="text-lg md:text-xl font-bold text-slate-800 text-center break-all">Σ = {'{'} α, β, γ, θ₁, θ₂, δ, ε {'}'}</p>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full px-4 md:px-0">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                  <th className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-800 text-xs md:text-sm">Simbol</th>
                  <th className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-800 text-xs md:text-sm">Nama Input</th>
                  <th className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-800 text-xs md:text-sm">Deskripsi Aksi</th>
                </tr>
              </thead>
              <tbody>
                {alphabet.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-300 px-2 md:px-4 py-2 md:py-3">
                      <span className="text-xl md:text-2xl font-bold text-emerald-600">{item.symbol}</span>
                    </td>
                    <td className="border border-slate-300 px-2 md:px-4 py-2 md:py-3">
                      <code className="bg-slate-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs md:text-sm font-mono break-all">{item.name}</code>
                    </td>
                    <td className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-slate-700 text-xs md:text-sm">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fungsi Transisi (δ) */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
          <ArrowRight className="text-purple-600" size={24} style={{ minWidth: '24px' }} />
          <span className="text-lg md:text-2xl">Fungsi Transisi (δ)</span>
        </h3>
        <p className="text-sm md:text-base text-slate-600 mb-3 md:mb-4">Fungsi transisi <strong>δ: Q × Σ → Q</strong> mendefinisikan perpindahan state berdasarkan state saat ini dan input yang diterima.</p>
        
        {/* Definisi Formal */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-purple-200 mb-4 md:mb-6">
          <h4 className="text-base md:text-lg font-semibold text-slate-800 mb-3 md:mb-4">Definisi Formal:</h4>
          <div className="bg-white rounded-lg p-3 md:p-4 font-mono text-xs md:text-sm space-y-1.5 md:space-y-2 border border-slate-200 overflow-x-auto">
            <p className="break-all">δ(q₀, α) = q₁ <span className="text-slate-500">// START → TEMPEL_RFID</span></p>
            <p className="break-all">δ(q₁, β) = q₂ <span className="text-slate-500">// TEMPEL_RFID → HITUNG_TAMPILKAN</span></p>
            <p className="break-all">δ(q₂, γ) = q₃ <span className="text-slate-500">// HITUNG_TAMPILKAN → BAYAR</span></p>
            <p className="break-all">δ(q₃, θ₁) = q₄ <span className="text-slate-500">// BAYAR → KELUAR_STRUK (tunai)</span></p>
            <p className="break-all">δ(q₃, θ₂) = q₄ <span className="text-slate-500">// BAYAR → KELUAR_STRUK (non-tunai)</span></p>
            <p className="break-all">δ(q₄, δ) = q₅ <span className="text-slate-500">// KELUAR_STRUK → ACCEPT</span></p>
            <p className="break-all">δ(q₅, ε) = q₀ <span className="text-slate-500">// ACCEPT → START (reset)</span></p>
          </div>
          <div className="mt-3 md:mt-4 flex flex-col sm:flex-row gap-2 md:gap-4 text-xs md:text-sm">
            <div className="bg-white rounded-lg p-2 md:p-3 border border-slate-200 flex-1">
              <p className="font-semibold text-slate-800 text-xs md:text-sm">State Awal (q₀):</p>
              <p className="text-slate-600 text-xs md:text-sm">START</p>
            </div>
            <div className="bg-white rounded-lg p-2 md:p-3 border border-slate-200 flex-1">
              <p className="font-semibold text-slate-800 text-xs md:text-sm">State Akhir (F):</p>
              <p className="text-slate-600 text-xs md:text-sm break-all">{'{'}q₅{'}'} = {'{'}ACCEPT{'}'}</p>
            </div>
            <div className="bg-white rounded-lg p-2 md:p-3 border border-slate-200 flex-1">
              <p className="font-semibold text-slate-800 text-xs md:text-sm">Total Transisi:</p>
              <p className="text-slate-600 text-xs md:text-sm">7 transisi</p>
            </div>
          </div>
        </div>

        {/* Tabel Transisi */}
        <div>
          <h4 className="text-base md:text-lg font-semibold text-slate-800 mb-3 md:mb-4">Tabel Transisi DFA Parking System</h4>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full px-4 md:px-0">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                    <th className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-800 text-xs">Current State</th>
                    <th className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-800 text-xs">Input</th>
                    <th className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-800 text-xs">Next State</th>
                    <th className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-slate-800 text-xs">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {transitions.map((transition, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-300 px-2 md:px-4 py-2 md:py-3">
                        <code className="bg-blue-100 text-blue-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono break-all">{transition.from}</code>
                      </td>
                      <td className="border border-slate-300 px-2 md:px-4 py-2 md:py-3">
                        <code className="bg-emerald-100 text-emerald-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono break-all">{transition.input}</code>
                      </td>
                      <td className="border border-slate-300 px-2 md:px-4 py-2 md:py-3">
                        <code className="bg-green-100 text-green-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs font-mono break-all">{transition.to}</code>
                      </td>
                      <td className="border border-slate-300 px-2 md:px-4 py-2 md:py-3 text-slate-700 text-xs">{transition.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram State Visual */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
          <ArrowRight className="text-indigo-600" size={24} style={{ minWidth: '24px' }} />
          <span className="text-lg md:text-2xl">Diagram State DFA</span>
        </h3>
        <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6">
          Diagram visual DFA Parking System dengan 6 state dan transisi menggunakan input '0' (reset) dan '1' (forward).
        </p>
        
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg md:rounded-xl p-4 md:p-8 border-2 border-slate-200 overflow-x-auto">
          <div className="flex justify-center items-center">
            <img 
              src="/dfa-diagram.png" 
              alt="DFA Parking System Diagram - Diagram visual menunjukkan 6 state (q0 START, q1 TEMPEL_RFID, q2 HITUNG_TAMPILKAN, q3 BAYAR, q4 KELUAR_STRUK, q5 ACCEPT) dengan transisi input '0' untuk reset dan '1' untuk forward"
              className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full"
              style={{ 
                maxWidth: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
              }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-slate-50 rounded-lg p-3 md:p-4 border border-slate-200">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-200 border-2 border-blue-600 flex-shrink-0"></div>
              <span className="font-semibold text-slate-800 text-xs md:text-sm">Normal State</span>
            </div>
            <p className="text-xs text-slate-600">State biasa dalam proses</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 md:p-4 border border-slate-200">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="relative flex-shrink-0">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-200 border-2 border-green-600"></div>
                <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-green-600 -m-1"></div>
              </div>
              <span className="font-semibold text-slate-800 text-xs md:text-sm">Accept State</span>
            </div>
            <p className="text-xs text-slate-600">State akhir (q5 ACCEPT)</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 md:p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-8 md:w-12 h-0.5 bg-green-600"></div>
                <span className="text-green-600 font-bold text-xs md:text-sm">1</span>
              </div>
              <span className="font-semibold text-slate-800 text-xs md:text-sm">Forward</span>
            </div>
            <p className="text-xs text-slate-600">Input '1' untuk maju</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 md:p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-8 md:w-12 h-0.5 bg-slate-600"></div>
                <span className="text-slate-600 font-bold text-xs md:text-sm">0</span>
              </div>
              <span className="font-semibold text-slate-800 text-xs md:text-sm">Reset</span>
            </div>
            <p className="text-xs text-slate-600">Input '0' untuk reset ke q0</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 md:p-4 border border-slate-200">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-200 border-2 border-blue-600 relative flex-shrink-0">
                <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-blue-600 -m-1"></div>
              </div>
              <span className="font-semibold text-slate-800 text-xs md:text-sm">Initial State</span>
            </div>
            <p className="text-xs text-slate-600">State awal (q0 START)</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 md:p-4 border border-slate-200">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-200 border-2 border-blue-600 flex-shrink-0"></div>
              <span className="font-semibold text-slate-800 text-xs md:text-sm">Large State</span>
            </div>
            <p className="text-xs text-slate-600">State dengan proses penting (q2)</p>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-4 md:mt-6 bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-200">
          <h4 className="font-semibold text-slate-800 mb-2 text-sm md:text-base">Penjelasan Diagram:</h4>
          <ul className="text-xs md:text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li><strong>Input '1':</strong> Memajukan proses dari q0 → q1 → q2 → q3 → q4 → q5</li>
            <li><strong>Input '0':</strong> Reset sistem kembali ke state awal (q0 START)</li>
            <li><strong>Self-loop q0:</strong> Input '0' di q0 tetap di q0 (idle state)</li>
            <li><strong>Accept State (q5):</strong> State akhir dengan double border hijau</li>
            <li><strong>Initial State (q0):</strong> State awal dengan panah masuk dari kiri</li>
          </ul>
        </div>
      </div>

      {/* State yang Diterima dan Tidak Diterima */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
          <CheckCircle className="text-green-600" size={24} style={{ minWidth: '24px' }} />
          <span className="text-lg md:text-2xl">State yang Diterima dan Tidak Diterima</span>
        </h3>

        {/* Accepted Examples */}
        <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
          {acceptedExamples.map((example, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <CheckCircle className="text-green-600" size={20} style={{ minWidth: '20px' }} />
                <h4 className="text-base md:text-lg font-semibold text-slate-800">
                  ✅ Skenario {idx + 1}: {example.title}
                </h4>
              </div>
              <div className="bg-white rounded-lg p-2 md:p-3 mb-3 md:mb-4 border border-slate-200">
                <p className="text-xs md:text-sm text-slate-600 mb-1">Input String:</p>
                <code className="text-sm md:text-lg font-mono font-bold text-emerald-600 break-all">{example.input}</code>
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full px-4 md:px-0">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Step</th>
                        <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">State</th>
                        <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Input</th>
                        <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Next</th>
                        <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {example.trace.map((t, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-center font-semibold text-xs">{t.step}</td>
                          <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2">
                            <code className="bg-blue-100 text-blue-700 px-1 md:px-2 py-0.5 rounded text-xs break-all">{t.state}</code>
                          </td>
                          <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2">
                            {t.input ? <code className="bg-emerald-100 text-emerald-700 px-1 md:px-2 py-0.5 rounded text-xs">{t.input}</code> : '-'}
                          </td>
                          <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2">
                            {t.next ? <code className="bg-green-100 text-green-700 px-1 md:px-2 py-0.5 rounded text-xs">{t.next}</code> : '-'}
                          </td>
                          <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-slate-700 text-xs">{t.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3 md:mt-4 bg-green-100 border border-green-300 rounded-lg p-2 md:p-3">
                <p className="text-xs md:text-sm font-semibold text-green-800">Status: ✅ <strong>DITERIMA</strong> (Reached Accept State)</p>
                <p className="text-xs text-green-700 mt-1">Total Steps: {example.trace.length - 1} transisi</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rejected Example */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <XCircle className="text-red-600" size={20} style={{ minWidth: '20px' }} />
            <h4 className="text-base md:text-lg font-semibold text-slate-800">
              ❌ {rejectedExample.title}
            </h4>
          </div>
          <div className="bg-white rounded-lg p-2 md:p-3 mb-3 md:mb-4 border border-slate-200">
            <p className="text-xs md:text-sm text-slate-600 mb-1">Input String:</p>
            <code className="text-sm md:text-lg font-mono font-bold text-red-600 break-all">{rejectedExample.input}</code>
            <p className="text-xs text-slate-500 mt-1">({rejectedExample.reason})</p>
          </div>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full px-4 md:px-0">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Step</th>
                    <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">State</th>
                    <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Input</th>
                    <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Next</th>
                    <th className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-left font-semibold text-slate-800 text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedExample.trace.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-center font-semibold text-xs">{t.step}</td>
                      <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2">
                        <code className="bg-blue-100 text-blue-700 px-1 md:px-2 py-0.5 rounded text-xs break-all">{t.state}</code>
                      </td>
                      <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2">
                        {t.input ? <code className="bg-emerald-100 text-emerald-700 px-1 md:px-2 py-0.5 rounded text-xs">{t.input}</code> : '-'}
                      </td>
                      <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2">
                        {t.next ? <code className="bg-green-100 text-green-700 px-1 md:px-2 py-0.5 rounded text-xs">{t.next}</code> : '-'}
                      </td>
                      <td className="border border-slate-300 px-1.5 md:px-3 py-1.5 md:py-2 text-slate-700 text-xs">{t.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-3 md:mt-4 bg-red-100 border border-red-300 rounded-lg p-2 md:p-3">
            <p className="text-xs md:text-sm font-semibold text-red-800">Status: ❌ <strong>DITOLAK</strong> (Invalid Transition)</p>
            <p className="text-xs text-red-700 mt-1">
              Alasan: Dari state q₁ (TEMPEL_RFID), input yang valid adalah β (tempel_rfid), bukan γ (hitung_tampilkan). 
              User harus tap RFID terlebih dahulu sebelum sistem bisa menghitung biaya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DFAFormalDefinition;


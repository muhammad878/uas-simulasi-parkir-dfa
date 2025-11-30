export type State = 
  | 'START' 
  | 'MASUK_PARKIRAN' 
  | 'TAP_RFID_MASUK' 
  | 'PARKIR' 
  | 'KELUAR_PARKIR' 
  | 'TAP_RFID_KELUAR' 
  | 'HITUNG_TAMPILKAN' 
  | 'BAYAR' 
  | 'KELUAR_STRUK' 
  | 'BUKA_GATE' 
  | 'MOBIL_KELUAR' 
  | 'ACCEPT';

export type TransitionType = 'cash' | 'non-cash';

export interface TransitionLogEntry {
  from: State;
  to: State;
  action: string;
  time: string;
}

export interface ParkingData {
  rfidNumber: string;
  waktuMasuk: Date | null;
  waktuKeluar: Date | null;
  durasi: number; // dalam menit
  tarif: number; // per jam
  total: number;
}

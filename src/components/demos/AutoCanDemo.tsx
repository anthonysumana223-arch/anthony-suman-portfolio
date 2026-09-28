import React, { useState, useEffect } from 'react';
import { Radio, Zap, AlertTriangle, Gauge, BatteryCharging, Power, Terminal, Volume2 } from 'lucide-react';

interface CanFrame {
  id: string;
  name: string;
  dlc: number;
  data: string;
  timestamp: string;
}

export const AutoCanDemo: React.FC = () => {
  const [headlightState, setHeadlightState] = useState<'off' | 'low' | 'high'>('low');
  const [hazardActive, setHazardActive] = useState<boolean>(false);
  const [turnIndicator, setTurnIndicator] = useState<'none' | 'left' | 'right'>('none');
  const [hornActive, setHornActive] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(48);
  const [batterySoc, setBatterySoc] = useState<number>(84);
  const [frames, setFrames] = useState<CanFrame[]>([]);
  const [sniffing, setSniffing] = useState<boolean>(true);

  // Generate real CAN bus frames stream
  useEffect(() => {
    if (!sniffing) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;

      const possibleFrames = [
        {
          id: '0x1A4',
          name: 'BCM_LIGHTING',
          dlc: 8,
          data: headlightState === 'high' ? '03 01 FF 00 12 00 AA 21' : headlightState === 'low' ? '01 01 80 00 12 00 55 10' : '00 00 00 00 12 00 00 00'
        },
        {
          id: '0x208',
          name: 'HAZARD_FLASHER',
          dlc: 4,
          data: hazardActive ? '01 AA 01 00' : '00 00 00 00'
        },
        {
          id: '0x3F0',
          name: 'EV_POWERTRAIN',
          dlc: 8,
          data: `30 ${speed.toString(16).toUpperCase().padStart(2, '0')} ${batterySoc.toString(16).toUpperCase().padStart(2, '0')} 2E 18 04 B2 9A`
        },
        {
          id: '0x0C8',
          name: 'STEERING_INDICATOR',
          dlc: 6,
          data: turnIndicator === 'left' ? '10 00 01 44 20 00' : turnIndicator === 'right' ? '20 00 02 44 20 00' : '00 00 00 44 20 00'
        }
      ];

      const chosen = possibleFrames[Math.floor(Math.random() * possibleFrames.length)];
      const newFrame: CanFrame = {
        ...chosen,
        timestamp: timeStr
      };

      setFrames((prev) => [newFrame, ...prev.slice(0, 14)]);
    }, 450);

    return () => clearInterval(interval);
  }, [sniffing, headlightState, hazardActive, speed, batterySoc, turnIndicator]);

  const triggerHorn = () => {
    setHornActive(true);
    setTimeout(() => setHornActive(false), 800);
  };

  return (
    <div className="space-y-4 text-slate-200">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-white tracking-tight">AutoCAN OBD-II & Subsystem Gateway</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Centre of Excellence in e-Mobility · CHRIST (Deemed to be University)
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            CAN2.0B / 500 kbps
          </span>
          <button
            onClick={() => setSniffing(!sniffing)}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              sniffing
                ? 'bg-slate-800 text-slate-300 hover:text-white'
                : 'bg-emerald-600 text-white font-semibold'
            }`}
          >
            {sniffing ? 'Pause Sniffer' : 'Resume Sniffer'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Vehicle Telematics & Physical Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Subsystem Actuator Controls */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Electronic Control Unit (ECU) Actuators
            </h5>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Headlights */}
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex flex-col justify-between">
                <span className="text-slate-400 block mb-1">Headlamps</span>
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => setHeadlightState('off')}
                    className={`flex-1 py-1 text-[11px] font-mono rounded ${
                      headlightState === 'off' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    OFF
                  </button>
                  <button
                    onClick={() => setHeadlightState('low')}
                    className={`flex-1 py-1 text-[11px] font-mono rounded ${
                      headlightState === 'low' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    LOW
                  </button>
                  <button
                    onClick={() => setHeadlightState('high')}
                    className={`flex-1 py-1 text-[11px] font-mono rounded ${
                      headlightState === 'high' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    HIGH
                  </button>
                </div>
              </div>

              {/* Hazard Flasher */}
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex flex-col justify-between">
                <span className="text-slate-400 block mb-1">Hazard Flashers</span>
                <button
                  onClick={() => setHazardActive(!hazardActive)}
                  className={`w-full py-1 text-[11px] font-mono rounded flex items-center justify-center gap-1 transition-colors ${
                    hazardActive
                      ? 'bg-amber-500 text-black font-bold animate-pulse'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>{hazardActive ? 'FLASHING' : 'OFF'}</span>
                </button>
              </div>

              {/* Turn Indicator */}
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex flex-col justify-between">
                <span className="text-slate-400 block mb-1">Turn Signal</span>
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => setTurnIndicator(turnIndicator === 'left' ? 'none' : 'left')}
                    className={`flex-1 py-1 text-[11px] font-mono rounded ${
                      turnIndicator === 'left' ? 'bg-emerald-500 text-black font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    LEFT
                  </button>
                  <button
                    onClick={() => setTurnIndicator(turnIndicator === 'right' ? 'none' : 'right')}
                    className={`flex-1 py-1 text-[11px] font-mono rounded ${
                      turnIndicator === 'right' ? 'bg-emerald-500 text-black font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    RIGHT
                  </button>
                </div>
              </div>

              {/* Horn Injection */}
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex flex-col justify-between">
                <span className="text-slate-400 block mb-1">Acoustic Horn</span>
                <button
                  onClick={triggerHorn}
                  className={`w-full py-1 text-[11px] font-mono rounded flex items-center justify-center gap-1 transition-all ${
                    hornActive
                      ? 'bg-rose-500 text-white font-bold scale-95'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Volume2 className="w-3 h-3" />
                  <span>{hornActive ? 'PULSING' : 'PULSE HORN'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* EV Telemetry Dials & Visualizer */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Powertrain Telemetry (PID 0x3F0)</span>
              <span className="text-indigo-400">Bus Rate: 120 Hz</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Speedometer</span>
                <span className="text-2xl font-bold font-mono text-white tabular-nums">{speed}</span>
                <span className="text-[10px] text-slate-500 block">km/h</span>
                <input
                  type="range"
                  min={0}
                  max={120}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full mt-2 accent-indigo-500 bg-slate-800 h-1 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Battery SoC</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">{batterySoc}%</span>
                <span className="text-[10px] text-slate-500 block">State of Charge</span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={batterySoc}
                  onChange={(e) => setBatterySoc(Number(e.target.value))}
                  className="w-full mt-2 accent-emerald-500 bg-slate-800 h-1 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 flex flex-col justify-center">
                <span className="text-[11px] text-slate-400 block">Inverter Temp</span>
                <span className="text-2xl font-bold font-mono text-sky-400 tabular-nums">41.8°C</span>
                <span className="text-[10px] text-emerald-400 block">Normal Operational Range</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live CAN Sniffer Hex Terminal (5 cols) */}
        <div className="lg:col-span-5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] font-bold">can0 Packet Monitor (ISO 11898)</span>
              </div>
              <span className="text-[10px] text-slate-500">Live FIFO Buffer</span>
            </div>

            <div className="text-[10px] grid grid-cols-12 text-slate-500 pb-1 mb-1 border-b border-slate-900">
              <span className="col-span-3">TIME</span>
              <span className="col-span-3">CAN ID</span>
              <span className="col-span-6">PAYLOAD (HEX)</span>
            </div>

            <div className="space-y-1 h-[250px] overflow-y-auto pr-1">
              {frames.map((f, i) => (
                <div
                  key={`${f.timestamp}-${i}`}
                  className="grid grid-cols-12 text-[10px] py-0.5 hover:bg-slate-900/60 rounded px-1 transition-colors"
                >
                  <span className="col-span-3 text-slate-400">{f.timestamp}</span>
                  <span
                    className={`col-span-3 font-semibold ${
                      f.id === '0x1A4'
                        ? 'text-indigo-400'
                        : f.id === '0x208'
                        ? 'text-amber-400'
                        : f.id === '0x3F0'
                        ? 'text-emerald-400'
                        : 'text-sky-400'
                    }`}
                  >
                    {f.id}
                  </span>
                  <span className="col-span-6 text-slate-200 tracking-wider truncate">
                    {f.data}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Arbitration: 11-Bit Standard</span>
            <span className="text-indigo-400">Frame Sniffing: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

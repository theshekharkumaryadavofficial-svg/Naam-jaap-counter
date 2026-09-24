import React, { useState } from 'react';
import { LotusIcon } from './LotusIcon';
import {
  Wifi,
  Battery,
  Menu,
  RotateCcw,
  CheckCircle2,
  Calendar,
  BarChart2,
  Settings,
  Bell,
  Sliders,
  Moon,
  ChevronRight,
  Info,
  Volume2,
} from 'lucide-react';

interface PhoneMockupProps {
  initialScreen?: 'home' | 'target' | 'history' | 'analytics' | 'settings';
  customImageUrl?: string;
  allowTabSwitch?: boolean;
  interactive?: boolean;
  className?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  initialScreen = 'home',
  customImageUrl,
  allowTabSwitch = true,
  interactive = true,
  className = '',
}) => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'target' | 'history' | 'analytics' | 'settings'>(
    initialScreen
  );
  const [count, setCount] = useState<number>(108);
  const [target] = useState<number>(216);
  const [justIncremented, setJustIncremented] = useState<boolean>(false);

  const handleIncrement = (amount: number) => {
    if (!interactive) return;
    setCount((prev) => prev + amount);
    setJustIncremented(true);
    setTimeout(() => setJustIncremented(false), 300);
  };

  const handleReset = () => {
    if (!interactive) return;
    setCount(0);
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div
      className={`relative mx-auto w-full max-w-[300px] sm:max-w-[320px] aspect-[9/18.5] bg-[#0c121c] rounded-[42px] p-3 shadow-2xl border-[5px] border-[#222b3a] ring-1 ring-white/10 select-none ${className}`}
    >
      {/* Speaker ear slit and Front Camera Punch-hole */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        <div className="w-12 h-1 bg-[#1a2332] rounded-full" />
      </div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border border-[#2b374d] z-30 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#0e2a47] rounded-full" />
      </div>

      {/* Screen container */}
      <div className="relative w-full h-full bg-[#0a0f18] rounded-[32px] overflow-hidden text-slate-100 flex flex-col font-sans">
        {/* Custom Image Mode */}
        {customImageUrl ? (
          <div className="w-full h-full flex flex-col">
            {/* Status bar */}
            <div className="px-5 pt-2 pb-1 flex justify-between items-center text-[11px] text-slate-400 z-10 bg-black/60 backdrop-blur-xs">
              <span className="font-semibold text-white">10:24</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-slate-300" />
                <span className="text-[10px]">5G</span>
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
            <img
              src={customImageUrl}
              alt="App Screenshot"
              className="w-full flex-1 object-cover object-top"
              loading="lazy"
            />
          </div>
        ) : (
          <>
            {/* Android Status Bar */}
            <div className="px-5 pt-2.5 pb-1 flex justify-between items-center text-[11px] text-slate-400 shrink-0">
              <span className="font-semibold text-white tracking-tight">10:24</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-slate-300" />
                <span className="text-[10px] text-slate-400">4G</span>
                <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              </div>
            </div>

            {/* Screen Content Switcher */}
            <div className="flex-1 flex flex-col overflow-y-auto px-4 pb-2">
              {currentScreen === 'home' && (
                <div className="flex-1 flex flex-col justify-between py-1">
                  {/* Top Bar inside app */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Menu className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-white tracking-wide">Naam Jap Counter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        title="Reset Counter"
                        className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </div>

                  {/* Sacred Central Gauge */}
                  <div className="my-auto flex flex-col items-center justify-center py-2">
                    {/* Glowing Lotus Medallion */}
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)] mb-2">
                      <LotusIcon size={24} />
                    </div>

                    {/* Circular Counter Dial */}
                    <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                        {/* Background track */}
                        <circle
                          cx="80"
                          cy="80"
                          r="68"
                          stroke="#1e293b"
                          strokeWidth="8"
                          fill="#0f172a"
                          className="transition-all"
                        />
                        {/* Progress stroke */}
                        <circle
                          cx="80"
                          cy="80"
                          r="68"
                          stroke="url(#dial-gold-grad)"
                          strokeWidth="8"
                          strokeDasharray={427}
                          strokeDashoffset={427 - (427 * progressPercent) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-300 ease-out"
                        />
                        <defs>
                          <linearGradient id="dial-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FBBF24" />
                            <stop offset="100%" stopColor="#D97706" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Number in center */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span
                          className={`text-4xl font-extrabold text-white tracking-tight tabular-nums transition-transform duration-150 ${
                            justIncremented ? 'scale-110 text-amber-300' : 'scale-100'
                          }`}
                        >
                          {count}
                        </span>
                        <span className="text-[11px] font-medium text-amber-400/90 mt-0.5">
                          आज का जाप
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          माला: {Math.floor(count / 108)}
                        </span>
                      </div>
                    </div>

                    {/* Increment Buttons */}
                    <div className="w-full grid grid-cols-2 gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => handleIncrement(1)}
                        className="py-2.5 px-3 bg-emerald-600/90 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all border border-emerald-400/30"
                      >
                        <span>+ 1</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleIncrement(108)}
                        className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-amber-300 font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all border border-amber-500/20"
                      >
                        <span>+ 108</span>
                      </button>
                    </div>

                    {/* Target Progress Card */}
                    <div className="w-full bg-[#111927] border border-slate-800 rounded-xl p-2.5 mt-3 flex items-center justify-between text-xs">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400">कुल जाप</span>
                        <span className="text-sm font-bold text-white tabular-nums">{count}</span>
                      </div>
                      <div className="w-24 flex flex-col items-end">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
                          <span>लक्ष्य {target}</span>
                          <span className="text-amber-400 font-semibold">{progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Target Screen */}
              {currentScreen === 'target' && (
                <div className="flex-1 flex flex-col py-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                    <span className="text-xs font-semibold text-white">Daily Target</span>
                    <span className="text-[10px] text-amber-400 font-medium">दैनिक लक्ष्य</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    अपनी साधना अनुसार दैनिक Jap संख्या निर्धारित करें:
                  </p>
                  <div className="space-y-2 flex-1">
                    {[108, 216, 504, 1008].map((val) => (
                      <div
                        key={val}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          val === target
                            ? 'bg-amber-500/10 border-amber-500/40 text-white'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${val === target ? 'text-amber-400' : 'text-slate-600'}`}
                          />
                          <span className="text-xs font-semibold tabular-nums">{val} Jap</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {val / 108} {val / 108 === 1 ? 'Mala' : 'Malas'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl mt-2 transition-colors"
                  >
                    सेट करें (Save Target)
                  </button>
                </div>
              )}

              {/* History Screen */}
              {currentScreen === 'history' && (
                <div className="flex-1 flex flex-col py-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-xs font-semibold text-white">History</span>
                    <span className="text-[10px] text-emerald-400">Streak: 14 Days 🔥</span>
                  </div>
                  {/* Segmented Filter */}
                  <div className="flex items-center p-1 bg-slate-900 rounded-lg text-[10px] mb-3">
                    <span className="flex-1 py-1 text-center bg-slate-800 text-white rounded font-medium">
                      Day
                    </span>
                    <span className="flex-1 py-1 text-center text-slate-400">Week</span>
                    <span className="flex-1 py-1 text-center text-slate-400">Month</span>
                  </div>
                  <div className="space-y-1.5 flex-1 text-[11px]">
                    {[
                      { date: 'आज (Today)', count: 108, malas: '1 Mala' },
                      { date: '12 Sep 2025', count: 216, malas: '2 Malas' },
                      { date: '11 Sep 2025', count: 108, malas: '1 Mala' },
                      { date: '10 Sep 2025', count: 504, malas: '4.6 Malas' },
                      { date: '09 Sep 2025', count: 108, malas: '1 Mala' },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="px-2.5 py-1.5 bg-slate-900/60 rounded-lg flex items-center justify-between border border-slate-800/40"
                      >
                        <span className="text-slate-300">{row.date}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold tabular-nums">{row.count}</span>
                          <span className="text-[9px] text-slate-500">({row.malas})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Screen */}
              {currentScreen === 'analytics' && (
                <div className="flex-1 flex flex-col py-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-xs font-semibold text-white">Analytics</span>
                    <span className="text-[10px] text-slate-400">नियमितता ग्राफ</span>
                  </div>
                  {/* Summary metric boxes */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 block">सप्ताह कुल</span>
                      <span className="text-sm font-bold text-white tabular-nums">1,260</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 block">महीना कुल</span>
                      <span className="text-sm font-bold text-amber-400 tabular-nums">4,320</span>
                    </div>
                  </div>
                  {/* Bar Chart Visualization */}
                  <span className="text-[10px] text-slate-400 mb-1.5">साप्ताहिक प्रगति:</span>
                  <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex items-end justify-between h-28 pt-4">
                    {[
                      { day: 'सोम', h: 65, active: false },
                      { day: 'मंगल', h: 80, active: false },
                      { day: 'बुध', h: 50, active: false },
                      { day: 'गुरु', h: 90, active: false },
                      { day: 'शुक्र', h: 100, active: false },
                      { day: 'शनि', h: 75, active: false },
                      { day: 'रवि', h: 95, active: true },
                    ].map((col, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div
                          className={`w-3.5 rounded-t transition-all ${
                            col.active
                              ? 'bg-gradient-to-t from-amber-500 to-amber-300'
                              : 'bg-emerald-600/70'
                          }`}
                          style={{ height: `${col.h}%` }}
                        />
                        <span className="text-[9px] text-slate-500">{col.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Screen */}
              {currentScreen === 'settings' && (
                <div className="flex-1 flex flex-col py-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                    <span className="text-xs font-semibold text-white">Settings</span>
                    <span className="text-[10px] text-slate-400">ऐप सेटिंग्स</span>
                  </div>
                  <div className="space-y-1.5 flex-1 text-[11px]">
                    <div className="p-2.5 bg-slate-900 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-3.5 h-3.5 text-amber-400" />
                        <span>Reminders</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Daily Target</span>
                      </div>
                      <span className="text-[10px] text-slate-400">216 Jap</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="w-3.5 h-3.5 text-blue-400" />
                        <span>Theme</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Dark Mode</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        <span>About App</span>
                      </div>
                      <span className="text-[10px] text-slate-400">v1.0.0</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Android App Navigation Bar */}
            {allowTabSwitch && (
              <div className="px-2 py-2 bg-[#090d15] border-t border-slate-800/80 flex items-center justify-around text-[10px] shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('home')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    currentScreen === 'home' ? 'text-amber-400 font-semibold' : 'text-slate-500'
                  }`}
                >
                  <LotusIcon size={14} />
                  <span>Home</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('history')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    currentScreen === 'history' ? 'text-amber-400 font-semibold' : 'text-slate-500'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>History</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('analytics')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    currentScreen === 'analytics' ? 'text-amber-400 font-semibold' : 'text-slate-500'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Analytics</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('settings')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    currentScreen === 'settings' ? 'text-amber-400 font-semibold' : 'text-slate-500'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Realistic Phone Bottom Home Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-500/60 rounded-full" />
    </div>
  );
};

import React from 'react';
import { ToothStatus } from '../types';

interface TeethChartProps {
  teeth: ToothStatus[];
  onToothClick: (id: number) => void;
}

const Tooth: React.FC<{ id: number; status?: string; onClick: () => void }> = ({ id, status, onClick }) => {
  let colorClass = "fill-white";
  if (status === 'decay') colorClass = "fill-red-400";
  if (status === 'filled') colorClass = "fill-blue-400";
  if (status === 'missing') colorClass = "fill-slate-800 opacity-20";
  if (status === 'crown') colorClass = "fill-yellow-400";
  if (status === 'rct') colorClass = "fill-green-400";

  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
      <svg width="40" height="50" viewBox="0 0 100 120" className={`stroke-slate-700 stroke-2 ${colorClass}`}>
        <path d="M10,30 Q10,0 50,0 Q90,0 90,30 L80,90 Q50,120 20,90 Z" />
        <path d="M20,30 Q50,40 80,30" className="fill-none" />
      </svg>
      <span className="text-xs mt-1 font-mono text-slate-500">{id}</span>
    </div>
  );
};

export const TeethChart: React.FC<TeethChartProps> = ({ teeth, onToothClick }) => {
  const getStatus = (id: number) => teeth.find(t => t.id === id)?.status;

  // FDI Notation:
  // Q1: 18-11, Q2: 21-28
  // Q4: 48-41, Q3: 31-38
  const q1 = [18, 17, 16, 15, 14, 13, 12, 11];
  const q2 = [21, 22, 23, 24, 25, 26, 27, 28];
  const q4 = [48, 47, 46, 45, 44, 43, 42, 41];
  const q3 = [31, 32, 33, 34, 35, 36, 37, 38];

  return (
    <div className="flex flex-col gap-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
      {/* Upper Jaw */}
      <div className="flex justify-center gap-2 md:gap-4 border-b border-slate-300 pb-4">
        <div className="flex gap-1 md:gap-2">{q1.map(id => <Tooth key={id} id={id} status={getStatus(id)} onClick={() => onToothClick(id)} />)}</div>
        <div className="w-px bg-slate-400 mx-2"></div>
        <div className="flex gap-1 md:gap-2">{q2.map(id => <Tooth key={id} id={id} status={getStatus(id)} onClick={() => onToothClick(id)} />)}</div>
      </div>
      
      {/* Lower Jaw */}
      <div className="flex justify-center gap-2 md:gap-4">
         <div className="flex gap-1 md:gap-2">{q4.map(id => <Tooth key={id} id={id} status={getStatus(id)} onClick={() => onToothClick(id)} />)}</div>
         <div className="w-px bg-slate-400 mx-2"></div>
         <div className="flex gap-1 md:gap-2">{q3.map(id => <Tooth key={id} id={id} status={getStatus(id)} onClick={() => onToothClick(id)} />)}</div>
      </div>
    </div>
  );
};
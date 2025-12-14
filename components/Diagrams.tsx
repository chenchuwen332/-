
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, Cpu, BarChart2, Gift, Snowflake, TreePine, Star, Heart } from 'lucide-react';
import { playPop, playSoftAlert } from '../utils/audio';

// --- ELF WORKSHOP DIAGRAM (Was Surface Code) ---
export const SurfaceCodeDiagram: React.FC = () => {
  const [errors, setErrors] = useState<number[]>([]);
  
  // Logic remains the same (parity check), but metaphor changes
  // Data Qubits -> Wrapped Gifts
  // Stabilizers -> Elf Inspectors (Trees)
  
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3], 
  };

  const toggleError = (id: number) => {
    // Determine if this click will cause an alert (i.e. changing the state)
    // For simplicity, just playing a sound on interaction
    const isAdding = !errors.includes(id);
    setErrors(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    
    if (isAdding) {
        playSoftAlert();
    } else {
        playPop();
    }
  };

  const activeStabilizers = [0, 1, 2, 3].filter(stabId => {
    let errorCount = 0;
    Object.entries(adjacency).forEach(([dataId, stabs]) => {
        if (errors.includes(parseInt(dataId)) && stabs.includes(stabId)) {
            errorCount++;
        }
    });
    return errorCount % 2 !== 0;
  });

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border-2 border-christmas-gold/30 my-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 text-christmas-red/10"><Snowflake size={100} /></div>
      <h3 className="font-serif text-xl mb-4 text-christmas-green font-bold">互動演示：精靈品質檢查站</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md font-sans">
        點擊灰色的**禮物盒**來製造一個「包裝失誤」。觀察周圍的**聖誕樹精靈**如何亮燈發出警示！
      </p>
      
      <div className="relative w-64 h-64 bg-christmas-cream rounded-lg border border-christmas-green/20 p-4 flex flex-wrap justify-between content-between relative shadow-inner">
         {/* Background Decoration */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-2/3 h-2/3 border border-christmas-green border-dashed"></div>
         </div>

         {/* Stabilizers -> Trees (Inspectors) */}
         {[
             {id: 0, x: '50%', y: '20%', type: 'Z'}, 
             {id: 1, x: '20%', y: '50%', type: 'X'},
             {id: 2, x: '80%', y: '50%', type: 'X'},
             {id: 3, x: '50%', y: '80%', type: 'Z'},
         ].map(stab => (
             <motion.div
                key={`stab-${stab.id}`}
                className={`absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center transition-all duration-300 ${
                    activeStabilizers.includes(stab.id) 
                    ? (stab.type === 'Z' ? 'text-christmas-green drop-shadow-[0_0_8px_var(--color-christmas-green)]' : 'text-christmas-red drop-shadow-[0_0_8px_var(--color-christmas-red)]') + ' scale-125' 
                    : 'text-stone-300 opacity-60'
                }`}
                style={{ left: stab.x, top: stab.y }}
             >
                 <TreePine size={activeStabilizers.includes(stab.id) ? 36 : 28} className={activeStabilizers.includes(stab.id) ? "fill-current" : ""} />
             </motion.div>
         ))}

         {/* Data Qubits -> Gifts */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'}, // Center
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(q => (
             <button
                key={`data-${q.id}`}
                onClick={() => toggleError(q.id)}
                className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-md flex items-center justify-center transition-all duration-200 z-10 ${errors.includes(q.id) ? 'text-christmas-dark scale-110' : 'text-stone-300 hover:text-stone-400'}`}
                style={{ left: q.x, top: q.y }}
             >
                <Gift size={errors.includes(q.id) ? 28 : 24} className={errors.includes(q.id) ? "fill-christmas-gold text-christmas-red" : "fill-stone-200"} />
             </button>
         ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-1"><Gift size={12} className="text-christmas-gold fill-christmas-gold" /> 包裝失誤</div>
          <div className="flex items-center gap-1 text-christmas-green"><TreePine size={12} /> 檢查員 A</div>
          <div className="flex items-center gap-1 text-christmas-red"><TreePine size={12} /> 檢查員 B</div>
      </div>
      
      <div className="mt-4 h-6 text-sm font-serif italic text-christmas-red font-bold">
        {errors.length === 0 ? "所有禮物包裝完美！" : `哎呀！精靈發現了 ${activeStabilizers.length} 處異常！`}
      </div>
    </div>
  );
};

// --- WISH LIST DECODER (Was Transformer) ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-christmas-dark rounded-xl border border-christmas-gold/30 my-8 shadow-2xl">
      <h3 className="font-serif text-xl mb-4 text-christmas-gold">魔法願望解讀機</h3>
      <p className="text-sm text-christmas-cream/70 mb-6 text-center max-w-md font-sans">
        有時候孩子的字跡會被雪花弄模糊，但我們的魔法機器能讀懂每一個心願。
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white/5 rounded-lg shadow-inner overflow-hidden mb-6 border border-white/10 flex items-center justify-center gap-8 p-4 backdrop-blur-sm">
        
        {/* Input Stage: Messy Letter */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 bg-white shadow-sm rotate-[-2deg]`}>
                 <div className="space-y-1 w-12 opacity-50">
                    <div className="h-1 bg-stone-300 w-full rounded"></div>
                    <div className="h-1 bg-stone-300 w-3/4 rounded"></div>
                    <div className="h-1 bg-stone-300 w-full rounded"></div>
                 </div>
                 {step === 0 && <div className="absolute text-2xl animate-pulse">?</div>}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">模糊的信件</span>
        </div>

        {/* Arrow */}
        <motion.div className="text-christmas-gold" animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}>
            <Star size={20} className={step >= 1 ? "fill-christmas-gold animate-spin-slow" : ""} />
        </motion.div>

        {/* Processing Stage: Magic Brain */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-christmas-gold bg-christmas-green text-white shadow-[0_0_20px_var(--color-christmas-green)]' : 'border-stone-600 bg-transparent text-stone-500'}`}>
                <Heart size={32} className={step === 1 || step === 2 ? 'text-christmas-red fill-christmas-red animate-pulse' : 'text-stone-600'} />
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">魔法感知</span>
        </div>

        {/* Arrow */}
        <motion.div className="text-christmas-gold" animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}>
             <Star size={20} className={step >= 3 ? "fill-christmas-gold animate-spin-slow" : ""} />
        </motion.div>

        {/* Output Stage: Perfect Gift */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center transition-all duration-500 ${step === 3 ? 'scale-110' : 'scale-100 opacity-50'}`}>
                {step === 3 ? (
                    <Gift size={48} className="text-christmas-red fill-christmas-gold drop-shadow-lg" />
                ) : (
                    <Gift size={40} className="text-stone-600" />
                )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">完美禮物</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-christmas-gold' : 'w-2 bg-stone-700'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- JOY METER (Was Performance) ---
export const PerformanceMetricDiagram: React.FC = () => {
    const [distance, setDistance] = useState<3 | 5 | 11>(5);
    
    // Values represent "Joy Loss Rate" (lower is better)
    const data = {
        3: { old: 3.5, new: 2.9 },
        5: { old: 3.6, new: 2.75 },
        11: { old: 0.0041, new: 0.0009 } 
    };

    const currentData = data[distance];
    const maxVal = Math.max(currentData.old, currentData.new) * 1.25;
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-white rounded-xl my-8 border-2 border-christmas-red/20 shadow-lg relative overflow-hidden">
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-christmas-green/10 rounded-full blur-2xl"></div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-christmas-red/10 rounded-full blur-2xl"></div>
             
            <div className="flex-1 min-w-[240px] z-10">
                <h3 className="font-serif text-xl mb-2 text-christmas-red">歡樂傳遞效率</h3>
                <p className="text-stone-600 text-sm mb-4 leading-relaxed font-sans">
                    新的「聖誕魔法雪橇」比舊雪橇更穩定，即使在暴風雪中（距離更遠），禮物遺失率也極低！
                </p>
                <div className="flex gap-2 mt-6">
                    {[3, 5, 11].map((d) => (
                        <button 
                            key={d}
                            onClick={() => {
                                // Add a subtle click sound here too if desired, though not explicitly requested for this part
                                setDistance(d as any)
                            }} 
                            className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 border-2 ${distance === d ? 'bg-christmas-red text-white border-christmas-red shadow-md' : 'bg-transparent text-stone-500 border-stone-200 hover:border-christmas-green hover:text-christmas-green'}`}
                        >
                            風雪等級 {d}
                        </button>
                    ))}
                </div>
                <div className="mt-6 font-mono text-xs text-stone-400 flex items-center gap-2">
                    <BarChart2 size={14} className="text-christmas-gold" /> 
                    <span>失望率（越低越好，就像煤炭越少越好）</span>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-christmas-cream rounded-xl border border-stone-100 p-6 flex justify-around items-end z-10 shadow-inner">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-20">
                   <div className="w-full h-[1px] bg-stone-300"></div>
                   <div className="w-full h-[1px] bg-stone-300"></div>
                   <div className="w-full h-[1px] bg-stone-300"></div>
                   <div className="w-full h-[1px] bg-stone-300"></div>
                </div>

                {/* Old Sleigh */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <motion.div 
                            className="w-full bg-stone-400 rounded-t-lg border-t border-x border-stone-300"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.old / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        />
                    </div>
                    <div className="h-6 flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider">舊雪橇</div>
                </div>

                {/* New Sleigh */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <motion.div 
                            className="w-full bg-gradient-to-t from-christmas-green to-christmas-green/80 rounded-t-lg shadow-lg relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: Math.max(1, (currentData.new / maxVal) * 100) + '%' }}
                            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                        >
                           {/* Pattern */}
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
                           <div className="absolute top-0 w-full h-1 bg-christmas-gold"></div>
                        </motion.div>
                    </div>
                     <div className="h-6 flex items-center text-xs font-bold text-christmas-green uppercase tracking-wider">魔法雪橇</div>
                </div>
            </div>
        </div>
    )
}

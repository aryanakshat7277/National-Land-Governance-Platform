import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface AnimatedStatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  colorClass?: string;
}

export function AnimatedStatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  icon,
  change,
  changeType = 'neutral',
  colorClass = 'text-[#1A5276] bg-[#1A5276]/10'
}: AnimatedStatCardProps) {
  const count = useCountUp(value, 2000, 0);

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-[#1E8449]';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-gray-500';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return <ArrowUpRight className="w-4 h-4" />;
    if (changeType === 'negative') return <ArrowDownRight className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorClass} transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1.5">
        <h3 className="text-slate-600 text-base font-bold">{title}</h3>
        <div className="text-4xl font-black text-slate-900 flex items-baseline tracking-tight">
          {prefix && <span className="text-2xl mr-1 text-slate-500 font-extrabold">{prefix}</span>}
          <span>{count.toLocaleString()}</span>
          {suffix && <span className="text-2xl ml-1 text-slate-500 font-extrabold">{suffix}</span>}
        </div>
      </div>
    </motion.div>
  );
}

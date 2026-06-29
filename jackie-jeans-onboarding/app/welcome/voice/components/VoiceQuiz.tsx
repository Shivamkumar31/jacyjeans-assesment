'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import { useVoice } from '@/hooks/useVoice';
import ProgressBar from '@/components/ProgressBar';
import {
  QUESTIONS,
  BRANDS,
  HEIGHT_OPTIONS,
  WAIST_OPTIONS,
  HIP_OPTIONS,
  WAIST_FIT_OPTIONS,
  RISE_OPTIONS,
  THIGH_OPTIONS,
  ISSUE_OPTIONS,
} from '@/data/quiz';
import { Mic, Square, Home, CheckCircle2 } from 'lucide-react';

type Phase = 'ready' | 'speaking' | 'listening' | 'confirm' | 'processing' | 'complete';

export default function VoiceQuiz() {
  const { data, currentStep, updateData, nextStep } = useQuizStore();
  const [phase, setPhase] = useState<Phase>('ready');
  const [transcript, setTranscript] = useState('');
  const [parsedAnswer, setParsedAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const { startListening, stopListening, speak, clearTranscript } = useVoice({
    onResult: handleTranscript,
  });

  const totalQuestions = QUESTIONS.length;

  useEffect(() => {
    if ((phase === 'speaking' || phase === 'listening') && timer > 0) {
      const interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (phase === 'speaking' && timer === 0) {
      stopListening();
      setPhase('confirm');
    }

    if (phase === 'listening' && timer === 0) {
      stopListening();
      setPhase('confirm');
    }
  }, [timer, phase, stopListening]);

  function handleTranscript(text: string) {
    const trimmed = text.toLowerCase().trim();
    setTranscript(trimmed);
    parseAnswer(trimmed);
  }

  // ✅ FLEXIBLE PARSING - ACCEPTS ANY ACCENT/PRONUNCIATION
  function parseAnswer(text: string) {
    if (currentStep >= totalQuestions) return;
    let result = '';

    switch (currentStep) {
      // Q1: Height - Accept ANY numbers
      case 0:
        const heightNumbers = text.match(/\d+/g) || [];
        if (heightNumbers.length >= 1) {
          const feet = heightNumbers[0];
          // Find closest height option
          const found = HEIGHT_OPTIONS.find(h => h.includes(feet + "'"));
          if (found) {
            result = found;
          } else if (heightNumbers.length >= 2) {
            // Try feet and inches format
           // const tryHeight = `${feet}'${heightNumbers[1]}"`;
            const foundHeight = HEIGHT_OPTIONS.find(h => h.includes(feet + "'"));
            if (foundHeight) result = foundHeight;
          }
        }
        break;

      // Q2: Weight - Accept ANY number or skip variations
      case 1:
        if (text.includes('skip') || text.includes('no') || text.includes('pass') || 
            text.includes('prefer') || text.includes('rather') || text.includes('pass')) {
          result = 'SKIP';
        } else {
          const weightNum = text.match(/\d+/);
          if (weightNum) result = weightNum[0]; // Accept ANY number
        }
        break;

      // Q3: Waist - Accept ANY number as waist size
      case 2:
        const waistNum = text.match(/\d+/);
        if (waistNum) {
          result = `${waistNum[0]}"`; // Accept any number
        }
        break;

      // Q4: Hip - Accept ANY number as hip size
      case 3:
        const hipNum = text.match(/\d+/);
        if (hipNum) {
          result = `${hipNum[0]}"`; // Accept any number
        }
        break;

      // Q5: Waist Fit - Flexible keywords
      case 4:
        if (text.includes('snug') || text.includes('tight') || text.includes('slim') || 
            text.includes('fitted') || text.includes('close')) {
          result = 'snug';
        } else if (text.includes('slightly') || text.includes('semi') || 
                   text.includes('little') || text.includes('bit') || text.includes('medium')) {
          result = 'slightly-relaxed';
        } else if (text.includes('relax') || text.includes('loose') || 
                   text.includes('comfort') || text.includes('easy') || text.includes('free')) {
          result = 'relaxed';
        }
        break;

      // Q6: Rise - Flexible keywords
      case 5:
        if (text.includes('high') || text.includes('tall') || text.includes('upper')) {
          result = 'high-rise';
        } else if (text.includes('mid') || text.includes('medium') || 
                   text.includes('middle') || text.includes('center') || text.includes('normal')) {
          result = 'mid-rise';
        } else if (text.includes('low') || text.includes('down') || text.includes('bottom')) {
          result = 'low-rise';
        }
        break;

      // Q7: Thigh - Flexible keywords
      case 6:
        if (text.includes('fit') || text.includes('tight') || text.includes('slim') || 
            text.includes('close') || text.includes('snug')) {
          result = 'fitted';
        } else if (text.includes('relax') && !text.includes('loose')) {
          result = 'relaxed';
        } else if (text.includes('loose') || text.includes('wide') || 
                   text.includes('baggy') || text.includes('roomy') || text.includes('free')) {
          result = 'loose';
        }
        break;

      // Q8: Brands - Accept partial matches and variations
      case 7:
        const selectedBrands = BRANDS.filter(brand => {
          const brandLower = brand.toLowerCase();
          return text.includes(brandLower) || 
                 text.includes(brandLower.substring(0, 3)) ||
                 text.includes(brandLower.replace("'", ''));
        });
        if (selectedBrands.length > 0) {
          result = selectedBrands.join('|');
        } else {
          // Accept ANY brand mentioned
          result = ''; 
        }
        break;

      // Q9: Brand Sizes - Accept ANY numbers as sizes
      case 8:
        const sizes: string[] = [];
        const brands = data.brands || [];
        const allNumbers = text.match(/\d+/g) || [];
        
        if (allNumbers.length > 0) {
          // Assign numbers to brands
          brands.forEach((brand, idx) => {
            const size = allNumbers[idx] || allNumbers[0]; // Use respective number or first number
            sizes.push(`${brand}:${size}`);
          });
          if (sizes.length > 0) result = sizes.join('|');
        }
        break;

      // Q10: Biggest Issue - Flexible keyword matching
      case 9:
        const keywords: { [key: string]: string } = {
          'waist': 'Waist Gap',
          'gap': 'Waist Gap',
          'loose': 'Waist Gap',
          'hip': 'Hip Tightness',
          'tight': 'Hip Tightness',
          'squeeze': 'Hip Tightness',
          'length': 'Wrong Length',
          'short': 'Wrong Length',
          'long': 'Wrong Length',
          'thigh': 'Thigh Fit',
          'leg': 'Thigh Fit',
          'upper': 'Thigh Fit',
          'rise': 'Rise',
          'high': 'Rise',
          'low': 'Rise',
          'other': 'Other',
          'different': 'Other',
        };
        
        for (const [keyword, issue] of Object.entries(keywords)) {
          if (text.includes(keyword)) {
            result = issue;
            break;
          }
        }
        break;
    }

    setParsedAnswer(result);
  }

  const startSpeaking = () => {
    setPhase('speaking');
    setTimer(10);
    clearTranscript();
    setTranscript('');
    setParsedAnswer('');

    const question = QUESTIONS[currentStep];
    if (question?.voiceLabel) {
      speak(question.voiceLabel);
    }
  };

  const proceedToListening = () => {
    setPhase('listening');
    setTimer(10);
    startListening();
  };

  const confirmAnswer = () => {
    if (!parsedAnswer) {
      startSpeaking();
      return;
    }

    setPhase('processing');

    switch (currentStep) {
      case 0:
        updateData('height', parsedAnswer);
        break;
      case 1:
        updateData('weight', parsedAnswer === 'SKIP' ? '' : parsedAnswer);
        break;
      case 2:
        updateData('waist', parsedAnswer);
        break;
      case 3:
        updateData('hip', parsedAnswer);
        break;
      case 4:
        updateData('waistFit', parsedAnswer as any);
        break;
      case 5:
        updateData('rise', parsedAnswer as any);
        break;
      case 6:
        updateData('thigh', parsedAnswer as any);
        break;
      case 7:
        updateData('brands', parsedAnswer.split('|').filter(b => b.length > 0));
        break;
      case 8:
        const sizes: { [key: string]: string } = {};
        parsedAnswer.split('|').forEach(item => {
          const [brand, size] = item.split(':');
          if (brand && size) sizes[brand] = size;
        });
        updateData('brandSizes', sizes);
        break;
      case 9:
        updateData('biggestIssue', parsedAnswer);
        break;
    }

    speak('Got it! Moving to the next question.');

    setTimeout(() => {
      if (currentStep === totalQuestions - 1) {
        setShowConfirm(true);
      } else {
        nextStep();
        setPhase('ready');
      }
    }, 2000);
  };

  const getDisplayAnswer = () => {
    if (!parsedAnswer) return 'No answer captured';

    if (currentStep === 7) {
      return parsedAnswer.split('|').filter(b => b.length > 0).join(', ');
    }
    if (currentStep === 8) {
      return parsedAnswer.split('|').map(item => {
        const [brand, size] = item.split(':');
        return brand && size ? `${brand}: ${size}` : '';
      }).filter(s => s.length > 0).join(', ');
    }

    const fitLabels: { [key: string]: string } = {
      'snug': 'Snug',
      'slightly-relaxed': 'Slightly Relaxed',
      'relaxed': 'Relaxed',
      'high-rise': 'High Rise',
      'mid-rise': 'Mid Rise',
      'low-rise': 'Low Rise',
      'fitted': 'Fitted',
      'loose': 'Loose',
    };

    return fitLabels[parsedAnswer] || parsedAnswer;
  };

  const getOptions = () => {
    switch (currentStep) {
      case 0:
        return HEIGHT_OPTIONS.slice(0, 12);
      case 2:
        return WAIST_OPTIONS.slice(0, 12);
      case 3:
        return HIP_OPTIONS.slice(0, 12);
      case 4:
        return WAIST_FIT_OPTIONS;
      case 5:
        return RISE_OPTIONS;
      case 6:
        return THIGH_OPTIONS;
      case 7:
        return BRANDS;
      case 9:
        return ISSUE_OPTIONS;
      default:
        return [];
    }
  };

  const options = getOptions();
  const question = QUESTIONS[currentStep];

  if (showConfirm) {
    return <CompletionConfirm data={data} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all z-50 border border-white/30"
        >
          <Home size={24} className="text-white" />
        </motion.button>
      </Link>

      <div className="max-w-3xl mx-auto">
        <ProgressBar current={currentStep} total={totalQuestions} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {question?.label}
            </h2>

            {options.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-white/70 mb-4">
                  💡 Available options:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {options.slice(0, 12).map((option, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-center hover:bg-white/20 transition-all"
                    >
                      <p className="text-sm font-medium text-white">
                        {option}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-blue-500/20 border border-blue-400/50 rounded-xl"
                >
                  <p className="text-xs text-blue-300 mb-2">You said:</p>
                  <p className="text-lg text-blue-100 font-semibold italic">
                    "{transcript}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {parsedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl"
                >
                  <p className="text-xs text-green-300 mb-2">Understood:</p>
                  <p className="text-lg text-green-100 font-semibold">
                    ✓ {getDisplayAnswer()}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex gap-4">
              <PhaseIndicator name="Speaking" active={phase === 'speaking'} />
              <div className="text-white/40">→</div>
              <PhaseIndicator name="Listening" active={phase === 'listening'} />
              <div className="text-white/40">→</div>
              <PhaseIndicator name="Confirm" active={phase === 'confirm' || phase === 'processing'} />
            </div>
          </motion.div>

          <div className="flex justify-center mb-8">
            <MicrophoneVisualizer phase={phase} timer={timer} />
          </div>

          <div className="flex flex-col gap-4">
            {phase === 'ready' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSpeaking}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all text-lg"
              >
                🎤 Start Speaking (10s)
              </motion.button>
            )}

            {phase === 'speaking' && (
              <>
                <motion.div
                  className="text-center text-white/80"
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <p className="text-lg font-semibold">AI Speaking... {timer}s</p>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={proceedToListening}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all text-lg"
                >
                  Ready to Speak ({timer}s)
                </motion.button>
              </>
            )}

            {phase === 'listening' && (
              <>
                <motion.div
                  className="text-center text-white/80"
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <p className="text-lg font-semibold">🎤 Listening... {timer}s</p>
                </motion.div>
                <motion.button
                  onClick={() => {
                    stopListening();
                    setPhase('confirm');
                  }}
                  className="w-full px-8 py-4 bg-red-600/80 text-white font-bold rounded-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <Square size={20} />
                  Done Speaking
                </motion.button>
              </>
            )}

            {(phase === 'confirm' || phase === 'processing') && parsedAnswer && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmAnswer}
                disabled={phase === 'processing'}
                className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all text-lg disabled:opacity-50"
              >
                {phase === 'processing' ? 'Processing...' : '✓ Confirm & Continue'}
              </motion.button>
            )}

            {(phase === 'confirm' || phase === 'processing') && !parsedAnswer && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSpeaking}
                className="w-full px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all text-lg"
              >
                🔄 Try Again
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PhaseIndicator({ name, active }: { name: string; active: boolean }) {
  return (
    <motion.div
      animate={active ? { scale: 1.1 } : { scale: 1 }}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
        active
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
          : 'bg-white/10 text-white/50 border border-white/20'
      }`}
    >
      {name}
    </motion.div>
  );
}

function MicrophoneVisualizer({ phase, timer }: { phase: Phase; timer: number }) {
  return (
    <motion.div className="relative">
      <motion.div
        animate={
          phase === 'listening'
            ? { scale: [1, 1.2, 1] }
            : phase === 'speaking'
            ? { scale: [1, 1.1, 1] }
            : {}
        }
        transition={{ duration: 0.8, repeat: Infinity }}
        className={`w-40 h-40 rounded-full flex flex-col items-center justify-center ${
          phase === 'speaking'
            ? 'bg-gradient-to-br from-purple-600 to-pink-600'
            : phase === 'listening'
            ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
            : phase === 'processing'
            ? 'bg-gradient-to-br from-green-600 to-emerald-600'
            : 'bg-gradient-to-br from-gray-600 to-slate-600'
        }`}
      >
        <Mic className="w-20 h-20 text-white" />
        <p className="text-white font-bold mt-2 text-lg">{timer > 0 ? timer : '-'}s</p>
      </motion.div>

      {(phase === 'speaking' || phase === 'listening') && (
        <>
          <motion.div
            animate={{ scale: [1, 1.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-4 border-white/30"
          />
          <motion.div
            animate={{ scale: [1, 1.7] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="absolute inset-0 rounded-full border-4 border-white/20"
          />
        </>
      )}
    </motion.div>
  );
}

function CompletionConfirm({ data }: { data: any }) {
  useEffect(() => {
    localStorage.setItem('jackieJeansProfile', JSON.stringify(data));
  }, [data]);

  const summary = `Height: ${data.height || 'N/A'} | Waist: ${data.waist || 'N/A'}"  | Hip: ${data.hip || 'N/A'}"`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center p-6"
    >
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="fixed top-6 left-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all border border-white/30"
        >
          <Home size={24} className="text-white" />
        </motion.button>
      </Link>

      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          className="mb-6"
        >
          <CheckCircle2 className="w-32 h-32 text-green-400 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold text-white mb-4"
        >
          🎉 Perfect!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/80 mb-4"
        >
          All 10 Questions Complete! ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
        >
          <p className="text-white/70 text-sm mb-3">Your Fit Profile:</p>
          <p className="text-white font-semibold text-lg">{summary}</p>
        </motion.div>

        <motion.a
          href="https://jackie-jeans.vercel.app/"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all"
        >
          Continue to Jackie Jeans →
        </motion.a>
      </div>
    </motion.div>
  );
}

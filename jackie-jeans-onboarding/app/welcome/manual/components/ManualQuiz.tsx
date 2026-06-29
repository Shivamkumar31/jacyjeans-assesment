'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import {
  HEIGHT_OPTIONS,
  WAIST_OPTIONS,
  HIP_OPTIONS,
  WAIST_FIT_OPTIONS,
  WAIST_FIT_VALUES,
  RISE_OPTIONS,
  RISE_VALUES,
  THIGH_OPTIONS,
  THIGH_VALUES,
  BRANDS,
  ISSUE_OPTIONS,
  QUESTIONS,
} from '@/data/quiz';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ManualQuiz() {
  const router = useRouter();
  const { data, currentStep, updateData, nextStep, prevStep } = useQuizStore();
  const [errors, setErrors] = useState<string[]>([]);

  const handleHeightChange = (value: string) => {
    updateData('height', value);
    setErrors([]);
  };

  const handleWeightChange = (value: string) => {
    updateData('weight', value);
  };

  const handleWaistChange = (value: string) => {
    updateData('waist', value);
    setErrors([]);
  };

  const handleHipChange = (value: string) => {
    updateData('hip', value);
    setErrors([]);
  };

  const handleWaistFitChange = (value: string) => {
    updateData('waistFit', value);
    setErrors([]);
  };

  const handleRiseChange = (value: string) => {
    updateData('rise', value);
    setErrors([]);
  };

  const handleThighChange = (value: string) => {
    updateData('thigh', value);
    setErrors([]);
  };

  const handleBrandToggle = (brand: string) => {
    const updatedBrands = data.brands?.includes(brand)
      ? data.brands.filter((b) => b !== brand)
      : [...(data.brands || []), brand];
    updateData('brands', updatedBrands);
    setErrors([]);
  };

  const handleBrandSizeChange = (brand: string, size: string) => {
    updateData('brandSizes', {
      ...data.brandSizes,
      [brand]: size,
    });
  };

  const handleIssueChange = (value: string) => {
    updateData('biggestIssue', value);
    setErrors([]);
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = [];

    if (currentStep === 0 && !data.height) {
      newErrors.push('Please select your height');
    }
    if (currentStep === 2 && !data.waist) {
      newErrors.push('Please select your waist size');
    }
    if (currentStep === 3 && !data.hip) {
      newErrors.push('Please select your hip size');
    }
    if (currentStep === 4 && !data.waistFit) {
      newErrors.push('Please select your waist fit preference');
    }
    if (currentStep === 5 && !data.rise) {
      newErrors.push('Please select your preferred rise');
    }
    if (currentStep === 6 && !data.thigh) {
      newErrors.push('Please select your thigh fit');
    }
    if (currentStep === 7 && (!data.brands || data.brands.length === 0)) {
      newErrors.push('Please select at least one brand');
    }
    if (currentStep === 8) {
      for (const brand of data.brands || []) {
        if (!data.brandSizes?.[brand]) {
          newErrors.push(`Please enter size for ${brand}`);
        }
      }
    }
    if (currentStep === 9 && !data.biggestIssue) {
      newErrors.push('Please select your biggest issue');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === QUESTIONS.length - 1) {
        router.push('/welcome/completion');
      } else {
        nextStep();
      }
    }
  };

  const handlePrev = () => {
    prevStep();
    setErrors([]);
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 0:
        return (
          <QuestionCard label={QUESTIONS[0].label}>
            <select
              value={data.height || ''}
              onChange={(e) => handleHeightChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
            >
              <option value="">Select height...</option>
              {HEIGHT_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </QuestionCard>
        );

      case 1:
        return (
          <QuestionCard label={QUESTIONS[1].label} optional>
            <div className="flex gap-2">
              <input
                type="number"
                value={data.weight || ''}
                onChange={(e) => handleWeightChange(e.target.value)}
                placeholder="e.g., 70"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
              />
              <span className="px-4 py-3 bg-gray-100 rounded-lg font-semibold text-gray-700">kg</span>
            </div>
            <button
              onClick={() => handleWeightChange('')}
              className="mt-4 w-full px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Skip
            </button>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard label={QUESTIONS[2].label}>
            <select
              value={data.waist || ''}
              onChange={(e) => handleWaistChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
            >
              <option value="">Select waist size...</option>
              {WAIST_OPTIONS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard label={QUESTIONS[3].label}>
            <select
              value={data.hip || ''}
              onChange={(e) => handleHipChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
            >
              <option value="">Select hip size...</option>
              {HIP_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard label={QUESTIONS[4].label}>
            <div className="space-y-3">
              {WAIST_FIT_OPTIONS.map((option, idx) => (
                <label
                  key={option}
                  className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-all"
                >
                  <input
                    type="radio"
                    name="waistFit"
                    value={WAIST_FIT_VALUES[idx]}
                    checked={data.waistFit === WAIST_FIT_VALUES[idx]}
                    onChange={(e) => handleWaistFitChange(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-medium">{option}</span>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard label={QUESTIONS[5].label}>
            <div className="space-y-3">
              {RISE_OPTIONS.map((option, idx) => (
                <label
                  key={option}
                  className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-all"
                >
                  <input
                    type="radio"
                    name="rise"
                    value={RISE_VALUES[idx]}
                    checked={data.rise === RISE_VALUES[idx]}
                    onChange={(e) => handleRiseChange(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-medium">{option}</span>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 6:
        return (
          <QuestionCard label={QUESTIONS[6].label}>
            <div className="space-y-3">
              {THIGH_OPTIONS.map((option, idx) => (
                <label
                  key={option}
                  className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-all"
                >
                  <input
                    type="radio"
                    name="thigh"
                    value={THIGH_VALUES[idx]}
                    checked={data.thigh === THIGH_VALUES[idx]}
                    onChange={(e) => handleThighChange(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-medium">{option}</span>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 7:
        return (
          <QuestionCard label={QUESTIONS[7].label}>
            <div className="space-y-3">
              {BRANDS.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={data.brands?.includes(brand) || false}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-medium">{brand}</span>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      case 8:
        return (
          <QuestionCard label={QUESTIONS[8].label}>
            <div className="space-y-4">
              {data.brands?.map((brand) => (
                <div key={brand}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What size do you buy in {brand}?
                  </label>
                  <input
                    type="text"
                    value={data.brandSizes?.[brand] || ''}
                    onChange={(e) => handleBrandSizeChange(brand, e.target.value)}
                    placeholder="e.g., 32"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </QuestionCard>
        );

      case 9:
        return (
          <QuestionCard label={QUESTIONS[9].label}>
            <div className="space-y-3">
              {ISSUE_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-all"
                >
                  <input
                    type="radio"
                    name="issue"
                    value={option}
                    checked={data.biggestIssue === option}
                    onChange={(e) => handleIssueChange(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="ml-3 text-lg font-medium">{option}</span>
                </label>
              ))}
            </div>
          </QuestionCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <ProgressBar current={currentStep} total={QUESTIONS.length} />

        <div className="mt-8 mb-8">
          <AnimatePresence mode="wait">
            {renderQuestion()}
          </AnimatePresence>
        </div>

        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded"
          >
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-700 text-sm">
                {error}
              </p>
            ))}
          </motion.div>
        )}

        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
          >
            {currentStep === QUESTIONS.length - 1 ? 'Complete' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

type SpeechRecognitionType = any;

interface UseVoiceOptions {
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

export const useVoice = (options: UseVoiceOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition API not supported');
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];

        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        options.onResult?.(finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
      options.onError?.(event.error || 'Speech recognition failed');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [options]);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;

    if (!('speechSynthesis' in window)) {
      console.warn('Speech Synthesis API not supported');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      setTranscript('');
      recognitionRef.current.start();
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    clearTranscript,
  };
};


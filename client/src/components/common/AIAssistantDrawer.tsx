import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, X, Send, Mic, MicOff, Volume2, 
  MapPin, Utensils, Landmark, Wallet, Compass, Loader2
} from 'lucide-react';
import { api } from '../../services/api';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickLinks?: string[];
}

export const AIAssistantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Vanakkam! I am **OorTrip AI**, your dedicated Tamil Nadu travel companion. How can I enrich your journey today?',
      timestamp: 'Just now',
      quickLinks: ['Plan Trip', 'Nearby Food', 'Budget Check']
    }
  ]);

  const quickPrompts = [
    'What can I visit near Mahabalipuram?',
    'Find vegetarian food nearby',
    'How much have I spent?',
    'Tell me about this temple',
    'Translate this into Tamil'
  ];

  const quickActions = [
    { label: 'Plan Trip', prompt: 'I want to plan a 2-day cultural trip starting from Chennai.', icon: Compass },
    { label: 'Food', prompt: 'Recommend authentic Tamil vegetarian restaurants nearby.', icon: Utensils },
    { label: 'Heritage', prompt: 'Explain the architecture and history of Shore Temple.', icon: Landmark },
    { label: 'Budget', prompt: 'How much have I spent out of my ₹5,000 budget?', icon: Wallet },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.askAI(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickLinks: response.quickLinks
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'I encountered a momentary connection hiccup. Tamil Nadu has 38 vibrant districts—please ask again!',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated / Web Speech voice input
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate speech-to-text after 2.5s
      setTimeout(() => {
        setIsRecording(false);
        setInput('What can I eat near Mahabalipuram?');
      }, 2500);
    }
  };

  // Text-to-speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const clean = text.replace(/[*_#]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group px-4 py-3.5 rounded-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold shadow-depth-lg hover:shadow-glow-terracotta transition-all duration-300 flex items-center gap-2.5 border border-white/20"
          aria-label="Open OorTrip AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="text-sm font-semibold tracking-wide">OorTrip AI</span>
        </button>
      </div>

      {/* Floating Chat Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] rounded-3xl bg-charcoal-900/95 backdrop-blur-2xl border border-white/15 shadow-depth-3d z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-charcoal-850 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-terracotta-500/20 border border-terracotta-500/40 flex items-center justify-center text-terracotta-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white leading-tight">OorTrip AI Assistant</h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 leading-none mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active Companion • Tamil Nadu
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-warmwhite-300 hover:text-white hover:bg-charcoal-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="px-3 py-2 bg-charcoal-950/50 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.label}
                  onClick={() => handleSend(qa.prompt)}
                  className="px-2.5 py-1 rounded-full bg-charcoal-800/80 hover:bg-charcoal-700 text-warmwhite-200 text-[11px] font-medium border border-white/10 whitespace-nowrap flex items-center gap-1 transition-colors"
                >
                  <Icon className="w-3 h-3 text-terracotta-400" />
                  <span>{qa.label}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-terracotta-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-charcoal-800 text-warmwhite-100 rounded-tl-none border border-white/10 shadow-depth-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  
                  {msg.sender === 'ai' && (
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-warmwhite-300/60">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-white flex items-center gap-1"
                        title="Listen to response"
                      >
                        <Volume2 className="w-3 h-3 text-terracotta-400" />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* AI Quick Follow-up Links */}
                {msg.quickLinks && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {msg.quickLinks.map((link) => (
                      <button
                        key={link}
                        onClick={() => handleSend(link)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-terracotta-500/10 text-terracotta-400 hover:bg-terracotta-500/20 border border-terracotta-500/30"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-charcoal-800/80 border border-white/10 text-xs text-warmwhite-300 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-terracotta-400" />
                <span>OorTrip AI is analyzing Tamil Nadu travel insights...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Carousel */}
          <div className="px-3 py-1.5 bg-charcoal-950/30 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-charcoal-850 hover:bg-charcoal-800 text-warmwhite-300 hover:text-white border border-white/10 whitespace-nowrap"
              >
                "{qp}"
              </button>
            ))}
          </div>

          {/* Recording Audio Wave Banner (Simulated) */}
          {isRecording && (
            <div className="px-4 py-2 bg-red-950/80 border-t border-red-500/30 flex items-center justify-between text-xs text-red-300 animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Listening to speech in Tamil / English...
              </span>
              <span className="font-mono text-[10px]">Tap mic to finish</span>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-charcoal-850 border-t border-white/10 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-2 rounded-xl transition-all ${
                isRecording
                  ? 'bg-red-600 text-white animate-bounce'
                  : 'bg-charcoal-800 text-warmwhite-300 hover:text-white hover:bg-charcoal-700'
              }`}
              title="Voice Input (Tamil/English)"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about destinations, food, temples, budget..."
              className="flex-1 bg-charcoal-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-warmwhite-300/40 focus:outline-none focus:border-terracotta-500"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-40 text-white transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

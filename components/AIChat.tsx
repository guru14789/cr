
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface AIChatProps {
  contextData?: string;
}

export const AIChat: React.FC<AIChatProps> = ({ contextData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am your CRM Copilot. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiText = await generateAIResponse(userMsg.text, contextData);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 text-white p-3 md:p-4 rounded-full shadow-lg shadow-primary-500/30 transition-transform hover:scale-105 z-50 flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse" />
          <span className="font-bold hidden md:inline tracking-wide">Ask Copilot</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 h-[80vh] md:h-[550px] bg-white md:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-teal-500 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">MediCRM AI Copilot</h3>
                <p className="text-[10px] text-white/80">Always here to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shadow-sm shrink-0">
                      AI
                   </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shadow-sm shrink-0">
                      AI
                 </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2 text-slate-500 text-sm rounded-bl-none">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 pb-safe">
            <div className="flex gap-2 items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a request..."
                className="flex-1 px-3 py-2 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white p-2 rounded-lg transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

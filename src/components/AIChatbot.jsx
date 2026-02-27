import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="glass-card mb-4 w-80 sm:w-96 overflow-hidden shadow-2xl flex flex-col h-[450px]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-violet-600/20 to-orange-500/20 px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">CampusAI Assistant</p>
                                    <p className="text-[10px] text-violet-400">Always active</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area (Placeholder) */}
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded bg-violet-600/20 flex items-center justify-center shrink-0">
                                    <Bot size={14} className="text-violet-400" />
                                </div>
                                <div className="p-2.5 rounded-2xl rounded-tl-none bg-white/5 text-[11px] text-[var(--text-primary)] max-w-[80%]">
                                    Hello! I'm your CampusAI assistant. How can I help you today?
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ask anything..."
                                    className="glass-input pr-10 py-2 text-xs"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-300">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-orange-500 flex items-center justify-center shadow-lg shadow-violet-500/30 text-white"
                aria-label="Open AI Assistant"
            >
                {isOpen ? <X size={24} /> : <Bot size={24} />}
            </motion.button>
        </div>
    );
}

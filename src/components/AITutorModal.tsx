import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
}

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  currentContext = 'Frações e Equivalência',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `Olá! Sou o seu Tutor IA Estudaí. Estou aqui para te ajudar a desatar qualquer nó nos estudos, sem complicação ou decoreba. Sobre o que você gostaria de conversar hoje?`,
      time: 'Agora',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    '💡 Me explique isso com uma analogia simples do dia a dia',
    '🍕 Como saber se duas frações são equivalentes?',
    '🔍 Qual é o segredo para simplificar frações rapidamente?',
    '🌱 Me explique como funciona a fotossíntese em Ciências',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/ask-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          context: currentContext,
        }),
      });

      const data = await response.json();
      const tutorReply = data.answer || 'Não consegui obter uma resposta. Tente novamente!';

      const tutorMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'tutor',
        text: tutorReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'tutor',
          text: 'Tive uma oscilação na conexão com a IA, mas estou aqui! Tente reenviar sua dúvida.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[85vh] max-h-[700px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-5 py-4 bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                psychology
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-on-surface">Tutor IA Estudaí</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Online
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Contexto: <strong className="text-primary">{currentContext}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
            title="Fechar Tutor IA"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-surface-container-lowest/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'tutor' && (
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    school
                  </span>
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-tr-none'
                    : 'bg-surface-container-low text-on-surface rounded-tl-none border border-outline-variant/30'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div
                  className={`mt-1.5 text-[10px] text-right ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-outline'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start animate-pulse">
              <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">school</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] animate-spin text-primary">
                  autorenew
                </span>
                <span>O Tutor IA está elaborando uma explicação com calma...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-surface-container-low/50 border-t border-outline-variant/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-semibold whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-primary border border-outline-variant/30 transition-all shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <footer className="p-3 sm:p-4 bg-surface-container-lowest border-t border-outline-variant/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida ou peça um exemplo..."
              disabled={loading}
              className="flex-1 h-11 px-4 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm border border-outline-variant/40 outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="h-11 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <span>Enviar</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

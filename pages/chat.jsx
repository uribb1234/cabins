import React, { useState, useRef, useEffect } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Zimmer, Reservation } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, Phone, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'שלום! אני הבוט של צימרי סבא 👋 אני כאן לעזור לכם למצוא את הצימר המושלם ולהזמין חופשה בלתי נשכחת. איך אוכל לעזור לכם היום?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const zimmers = await Zimmer.list();
      const reservations = await Reservation.list();
      
      const context = `
        אתה בוט חכם של "צימרי סבא" - מקום יוקרתי עם 4 צימרים במיקום אחד.
        
        פרטי הצימרים:
        ${zimmers.map(z => `- ${z.name}: ${z.description}, מחיר: ₪${z.price_per_night} ללילה, כשירות: ${z.capacity} אורחים`).join('\n')}
        
        הנחיות:
        1. תן מידע על הצימרים בצורה חמה ואישית
        2. אם שואלים על זמינות - תבקש תאריכים ותבדוק מול ההזמנות הקיימות
        3. אם רוצים להזמין - תלך שלב אחר שלב: שם, טלפון, תאריכים, מספר אורחים
        4. אם השלמת הזמנה - תציג את מספר הטלפון של סבא: 052-123-4567
        5. תן המלצות אישיות על הצימרים לפי הצרכים
        6. תהיה ידידותי, מקצועי ומועיל
        
        השב בעברית בלבד.
      `;

      const response = await InvokeLLM({
        prompt: `${context}\n\nמשתמש אמר: "${inputMessage}"\n\nתשובה:`,
        add_context_from_internet: false
      });

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Check if response contains phone number (indicating completed booking)
      if (response.includes('052-123-4567')) {
        setShowPhoneNumber(true);
      }

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'מצטער, נתקלתי בבעיה טכנית. אנא נסו שוב או פנו אלינו טלפונית.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 py-8" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-effect shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="font-bold">צ'אט בוט צימרי סבא</h1>
                  <p className="text-amber-100 text-sm font-normal">עוזר אישי לתכנון החופשה שלכם</p>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages Area */}
              <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4 bg-white/50">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row' : 'flex-row-reverse'
                      }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          message.type === 'user' 
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                            : 'bg-gradient-to-br from-amber-500 to-yellow-600'
                        }`}>
                          {message.type === 'user' ? 
                            <User className="w-5 h-5 text-white" /> : 
                            <Bot className="w-5 h-5 text-white" />
                          }
                        </div>
                        
                        <div className={`rounded-2xl px-6 py-4 shadow-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                            : 'bg-white border border-amber-200'
                        }`}>
                          <p className={`leading-relaxed ${
                            message.type === 'user' ? 'text-white' : 'text-gray-800'
                          }`}>
                            {message.content}
                          </p>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString('he-IL', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white border border-amber-200 rounded-2xl px-6 py-4 shadow-lg">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm text-gray-500">הבוט כותב...</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Phone Number Display */}
              <AnimatePresence>
                {showPhoneNumber && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-6 h-6" />
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-1">ההזמנה נקלטה בהצלחה!</h3>
                        <p className="mb-2">מספר הטלפון של סבא:</p>
                        <p className="text-2xl font-bold" dir="ltr">052-123-4567</p>
                      </div>
                      <Phone className="w-6 h-6" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-amber-200">
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="כתבו את ההודעה שלכם..."
                    className="flex-1 rounded-xl border-amber-200 focus:border-amber-500 focus:ring-amber-500 px-4 py-3 text-lg"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
import { ArrowRight, Sparkles, AlertCircle, Loader } from "lucide-react";
import aiAvatar from "../../assets/aiAvatar.png";
import { useState, useRef, useEffect } from "react";
import { askAI } from "../../lib/api";
import toast from "react-hot-toast";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Explain a topic",
    "Summarize notes",
    "Generate quiz questions",
    "Solve a problem",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (question: string) => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await askAI(question);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response.answer || response.message || "Unable to generate response",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get AI response";
      setError(errorMessage);
      toast.error("Failed to get response from AI. Please try again.");

      const errorAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I encountered an error: ${errorMessage}. Please try rephrasing your question.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const prompts: Record<string, string> = {
      "Explain a topic": "Can you explain a complex topic from my courses in simple terms?",
      "Summarize notes": "Can you help me summarize my notes on a topic?",
      "Generate quiz questions": "Can you generate practice quiz questions for me to test my knowledge?",
      "Solve a problem": "Can you help me solve a problem step by step?",
    };

    const prompt = prompts[suggestion] || suggestion;
    handleSendMessage(prompt);
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <section className="bg-gradient-to-t from-[#D6DAF5] to-[#ffffff] rounded-3xl p-8 shadow-lg max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#D6DAF5] to-[#E8D9FF] flex items-center justify-center ">
            <img
              src={aiAvatar}
              alt="AI"
              className="w-24 h-24 object-cover"
            />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#1D2040]">
            AI Study Assistant
          </h2>

          <p className="text-gray-600 mt-2 max-w-2xl">
            Get instant academic support and simplify your learning journey.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 items-start">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 min-h-96 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-center">
              <p>Start a conversation by asking a question or clicking a suggestion below.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-lg ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                        <Sparkles size={16} className="text-[#4C64E6]" />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-t from-[#1E2A7B] to-[#5B6CD7] text-white"
                          : "bg-gradient-to-t from-[#D6DAF5] to-[#FAFAFA] text-gray-800"
                      }`}
                    >
                      <p className="text-sm leading-6">{message.content}</p>
                      <span
                        className={`text-xs mt-2 block ${
                          message.type === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                      <Loader size={16} className="text-[#4C64E6] animate-spin" />
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => handleSuggestionClick(item)}
                disabled={isLoading}
                className="px-5 py-2 rounded-full text-white text-sm
                bg-gradient-to-b from-[#5B6CD7] to-[#141C52]
                shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage(inputValue);
              }
            }}
            placeholder="Ask anything about your courses..."
            disabled={isLoading}
            className="w-full rounded-full py-4 pl-6 pr-16
            bg-white shadow-xl outline-none border border-gray-200
            focus:border-[#5E72EB] focus:ring-2 focus:ring-[#5E72EB]/20
            disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            title="Send message"
            className="absolute right-2 top-1/2
            -translate-y-1/2
            w-12 h-12 rounded-full
            bg-[#1349EC]
            flex items-center justify-center
            text-white hover:bg-[#1e3fa0] transition
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight size={22} className="bg-[#1349EC]" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-5">
          AI can occasionally provide incorrect information. Always verify important facts with your course materials.
        </p>
      </section>
    </div>
  );
}

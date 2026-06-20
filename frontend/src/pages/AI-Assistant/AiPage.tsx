import {
  ArrowRight,
  Sparkles,
  AlertCircle,
  Loader,
  Images,
  X,
  FileText,
} from "lucide-react";
import aiAvatar from "../../assets/aiAvatar.png";
import { useState, useRef, useEffect } from "react";
import { askAI } from "../../lib/api";
import toast from "react-hot-toast";
import { useAiChat } from "../../context/AiChatContext";
import ReactMarkdown from "react-markdown";
interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function AiPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages } = useAiChat();

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

  // const handleSendMessage = async (question: string) => {
  //   if (!question.trim()) {
  //     toast.error("Please enter a question");
  //     return;
  //   }

  //   setError(null);
  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     type: "user",
  //     content: question,
  //     timestamp: new Date(),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);
  //   setInputValue("");
  //   setIsLoading(true);

  //   try {
  //     const response = await askAI(question);

  //     const aiMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       type: "ai",
  //       content:
  //         response.answer || response.message || "Unable to generate response",
  //       timestamp: new Date(),
  //     };

  //     setMessages((prev) => [...prev, aiMessage]);
  //   } catch (err) {
  //     const errorMessage =
  //       err instanceof Error ? err.message : "Failed to get AI response";
  //     setError(errorMessage);
  //     toast.error("Failed to get response from AI. Please try again.");

  //     const errorAiMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       type: "ai",
  //       content: `I encountered an error: ${errorMessage}. Please try rephrasing your question.`,
  //       timestamp: new Date(),
  //     };
  //     setMessages((prev) => [...prev, errorAiMessage]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Helper to check if PDF has real text
  // const extractPDFText = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  //   const pdfjsLib = await import("pdfjs-dist");

  //   // ✅ Fix worker like this for Vite projects
  //   pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  //     "pdfjs-dist/build/pdf.worker.min.mjs",
  //     import.meta.url,
  //   ).toString();

  //   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  //   let fullText = "";

  //   for (let i = 1; i <= pdf.numPages; i++) {
  //     const page = await pdf.getPage(i);
  //     const content = await page.getTextContent();
  //     fullText += content.items.map((item: any) => item.str).join(" ");
  //   }

  //   return fullText;
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["application/pdf", "text/plain"].includes(file.type)) {
      toast.error("Only PDF or TXT files are supported");
      return;
    }

    if (file.type === "application/pdf") {
      toast("📄 PDF loaded, it will be processed when you send your question", {
        icon: "✓",
      });
    }

    setSelectedFile(file);
  };

  const handleSendMessage = async (question: string) => {
    if (!question.trim() && !selectedFile) {
      toast.error("Please enter a question");
      return;
    }

    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: selectedFile
        ? `📎 ${selectedFile.name}\n\n${question}`
        : question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    if (selectedFile?.type === "application/pdf") {
      toast("📄 Processing PDF...", { icon: "⏳" });
    }

    try {
      let response;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("question", question);
        formData.append("file", selectedFile);
        response = await askAI(formData);
      } else {
        response = await askAI(question);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          response.answer || response.message || "Unable to generate response",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setSelectedFile(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get AI response";
      setError(errorMessage);

      // specific message for scanned PDF error from backend
      if (errorMessage.includes("scanned") || errorMessage.includes("images")) {
        toast.error("This PDF is scanned. Please upload a text-based PDF.");
      } else {
        toast.error("Failed to get response. Please try again.");
      }

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
      "Explain a topic":
        "Can you explain a complex topic from my courses in simple terms?",
      "Summarize notes": "Can you help me summarize my notes on a topic?",
      "Generate quiz questions":
        "Can you generate practice quiz questions for me to test my knowledge?",
      "Solve a problem": "Can you help me solve a problem step by step?",
    };

    const prompt = prompts[suggestion] || suggestion;
    handleSendMessage(prompt);
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <section className="bg-linear-to-t from-[#D6DAF5] to-[#ffffff] rounded-3xl p-8 shadow-lg max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-[#D6DAF5] to-[#E8D9FF] flex items-center justify-center ">
            <img src={aiAvatar} alt="AI" className="w-24 h-24 object-cover" />
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
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
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
              <p>
                Start a conversation by asking a question or clicking a
                suggestion below.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* {messages.map((message) => (
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
                      <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-[#4C64E6]" />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === "user"
                          ? "bg-linear-to-t from-[#1E2A7B] to-[#5B6CD7] text-white"
                          : "bg-linear-to-t from-[#D6DAF5] to-[#FAFAFA] text-gray-800"
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
              ))} */}
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
                      <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-[#4C64E6]" />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-lg ${
                        message.type === "user"
                          ? "bg-linear-to-t from-[#1E2A7B] to-[#5B6CD7] text-white"
                          : "bg-linear-to-t from-[#D6DAF5] to-[#FAFAFA] text-gray-800"
                      }`}
                    >
                      {/* ✅ updated bubble */}
                      {message.type === "ai" ? (
                        <div
                          className="text-sm leading-6 prose prose-sm max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-strong:text-gray-900
            prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-purple-600
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-3
            prose-ul:list-disc prose-ul:pl-4
            prose-ol:list-decimal prose-ol:pl-4
            prose-li:my-0.5"
                        >
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-6 whitespace-pre-wrap">
                          {message.content}
                        </p>
                      )}

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
                      <Loader
                        size={16}
                        className="text-[#4C64E6] animate-spin"
                      />
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
                bg-linear-to-b from-[#5B6CD7] to-[#141C52]
                shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* File Preview - shows above input when file selected */}
        {selectedFile && (
          <div className="flex items-center gap-2 mb-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-2xl w-fit">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-blue-800 max-w-[200px] truncate">
                {selectedFile.name}
              </span>
              <span className="text-xs text-blue-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="ml-1 text-blue-400 hover:text-red-500 transition"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="relative flex items-center">
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
            className="w-full rounded-full py-4 pl-6 pr-28  {/* ✅ enough right padding for both buttons */}
    bg-white shadow-xl outline-none border border-gray-200
    focus:border-[#5E72EB] focus:ring-2 focus:ring-[#5E72EB]/20
    disabled:opacity-50 disabled:cursor-not-allowed
    truncate"
          />

          {/* File Upload Button */}
          <div
            className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 cursor-pointer text-gray-400 hover:text-blue-600 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Images size={20} />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || (!inputValue.trim() && !selectedFile)}
            title="Send message"
            className="absolute right-2 top-1/2 -translate-y-1/2
    w-12 h-12 rounded-full bg-[#1349EC]
    flex items-center justify-center
    text-white hover:bg-[#1e3fa0] transition
    disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight size={22} />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-5">
          AI can occasionally provide incorrect information. Always verify
          important facts with your course materials.
        </p>
      </section>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a friendly travel assistant for TicketEasy. Help users book tickets, answer questions about the app, and provide travel suggestions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!input.trim()) {
      return;
    }

    const userMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/chat", {
        messages: nextMessages,
      });
      const assistantMessage = response.data.message;
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Chat service failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 max-w-screen-sm bg-white shadow-2xl rounded-3xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-primary text-white">
            <div className="font-semibold">TicketEasy Chat</div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-surface">
            {messages.slice(1).map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "assistant"
                    ? "rounded-2xl bg-gray-100 p-3 text-sm"
                    : "rounded-2xl bg-primary text-white p-3 text-sm self-end"
                }
              >
                {message.content}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="rounded-2xl bg-gray-100 p-3 text-sm">
                Hello! Need help with tickets or booking guidance? Ask me anything.
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 p-4 bg-white">
            {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(ev) => setInput(ev.target.value)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    ev.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 rounded-2xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-primary"
                placeholder="Ask about booking, tickets, or the app..."
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="rounded-2xl bg-primary px-4 py-2 text-white text-sm disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl hover:bg-primary/90"
          aria-label="Open chat"
        >
          💬
        </button>
      )}
    </div>
  );
}

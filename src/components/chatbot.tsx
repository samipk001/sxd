"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { aiQuickAnswers } from "@/ai/flows/ai-quick-answers";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAreaEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await aiQuickAnswers(currentInput);
      const botMessage: Message = { role: "bot", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = { role: "bot", text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out", isOpen ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0")}>
        <Button size="icon" className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg animate-pulse" onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </div>
      <div className={cn("fixed bottom-4 right-4 z-50 w-full max-w-sm transition-all duration-300 ease-in-out", isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none")}>
        <Card className="flex h-[70vh] flex-col shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-lg">Xavier's Helper</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close Chat</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                 <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 text-sm max-w-[80%]">
                        <p>Hello! How can I help you with information about St. Xavier's School?</p>
                    </div>
                </div>
                {messages.map((message, index) => (
                  <div key={index} className={cn("flex items-start gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                    {message.role === "bot" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                      </Avatar>
                    )}
                     <div className={cn("rounded-lg p-3 text-sm max-w-[80%]", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-muted p-3 text-sm">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                 )}
                 <div ref={scrollAreaEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

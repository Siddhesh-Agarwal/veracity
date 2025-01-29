"use client"

import {
  ArrowRight,
  // Focus,
  // Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

type Suggestion = {
  emoji: string
  text: string
}

function SuggestionCard({ emoji, text }: Suggestion) {
  return (
    <Button
      variant="outline"
      className="h-auto px-4 py-2 justify-start bg-card border-border hover:bg-accent"
    >
      <span className="mr-3 p-1 rounded-sm">{emoji}</span>
      <div className="text-left">
        <p className="font-normal text-foreground dark:text-gray-200">{text}</p>
      </div>
    </Button>
  )
}

export default function SearchPage() {
  const Suggestions: Suggestion[] = [
    { emoji: "🏠", text: "US housing market analysis by city" },
    { emoji: "🧹", text: "Top vacuums to clean up pet hair" },
    { emoji: "⚖️", text: "City with the most bike lanes" },
    { emoji: "📚", text: "Bestselling books released in 2025" },
  ]
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-3xl px-4 bg-background">
        <h1 className="text-4xl text-center text-foreground mb-8">What do you want to know?</h1>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="relative flex border items-center gap-2 rounded-lg p-4">
            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="flex items-center gap-3">
              {/* <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                <Focus className="w-4 h-4 mr-2" />
                Focus
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                <Paperclip className="w-4 h-4 mr-2" />
                Attach
              </Button>
              <div className="h-5 w-px bg-gray-700" /> */}
              <Switch />
              <span className="text-sm text-gray-400">Pro</span>
              <Button size="icon" className="bg-cyan-500 hover:bg-cyan-600">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Suggestion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {
            Suggestions.map((suggestion, i) => (
              <SuggestionCard key={i} {...suggestion} />
            ))
          }
        </div>
      </div>
    </div>
  )
}


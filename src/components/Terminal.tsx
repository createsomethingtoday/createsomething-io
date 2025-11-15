import { useState, useRef, useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'

interface TerminalProps {
  welcomeMessage?: string
  commands?: string[]
}

interface CommandResponse {
  output: string
  type: 'success' | 'error' | 'info'
  clearScreen?: boolean
}

export function Terminal({ welcomeMessage, commands = [] }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    welcomeMessage || '🚀 Welcome to Create Something Terminal v2.0',
    '',
    'Built with TanStack Start + Cloudflare Workers',
    'Type "help" for available commands',
    ''
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentPath, setCurrentPath] = useState('/')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const processCommand = async (input: string): Promise<CommandResponse> => {
    const [command, ...args] = input.trim().split(' ')
    const arg = args.join(' ')

    // Call API endpoint to process command
    try {
      const response = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, args: arg, path: currentPath })
      })

      if (!response.ok) {
        throw new Error(`Command failed: ${response.statusText}`)
      }

      const result = await response.json()

      // Handle special commands that affect terminal state
      if (command === 'cd' && result.newPath) {
        setCurrentPath(result.newPath)
      }

      return result
    } catch (error) {
      // Fallback for client-side commands
      return processClientCommand(command, arg)
    }
  }

  const processClientCommand = (command: string, arg: string): CommandResponse => {
    switch (command.toLowerCase()) {
      case 'help':
        return {
          output: `
Available commands:
  help              Show this help message
  clear             Clear terminal screen
  ls [path]         List directory contents
  cd <path>         Change directory
  pwd               Show current directory
  papers            List all technical papers
  read <id>         Read a paper by ID
  search <query>    Search papers
  save <id>         Save paper to collection
  saved             View saved papers
  about             About Create Something
  contact           Contact information
  theme <dark|light> Change terminal theme
          `.trim(),
          type: 'info'
        }

      case 'clear':
        return {
          output: '',
          type: 'success',
          clearScreen: true
        }

      case 'pwd':
        return {
          output: currentPath,
          type: 'success'
        }

      case 'about':
        return {
          output: `
Create Something Terminal v2.0
───────────────────────────────
Built with:
• TanStack Start - Type-safe, edge-native framework
• Cloudflare Workers - Global edge computing
• D1 Database - Distributed SQLite
• KV Store - Session management
• R2 Storage - Object storage

© 2024 Create Something Agency
          `.trim(),
          type: 'info'
        }

      case 'contact':
        return {
          output: `
Contact Create Something:
• Email: hello@createsomething.agency
• GitHub: github.com/createsomethingtoday
• Twitter: @createsomething
          `.trim(),
          type: 'info'
        }

      case '':
        return {
          output: '',
          type: 'success'
        }

      default:
        return {
          output: `Command not found: ${command}. Type "help" for available commands.`,
          type: 'error'
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentInput.trim()) {
      setHistory(prev => [...prev, `$ ${currentInput}`, ''])
      return
    }

    // Add command to history
    setCommandHistory(prev => [...prev, currentInput])
    setHistoryIndex(-1)

    // Display command in terminal
    setHistory(prev => [...prev, `$ ${currentInput}`])

    // Process command
    const result = await processCommand(currentInput)

    // Handle output
    if (result.clearScreen) {
      setHistory([])
    } else if (result.output) {
      setHistory(prev => [...prev, result.output, ''])
    } else {
      setHistory(prev => [...prev, ''])
    }

    // Clear input
    setCurrentInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Add tab completion logic here
    }
  }

  return (
    <div className="h-screen bg-gray-900 font-mono flex flex-col">
      {/* Terminal Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-sm">
          Create Something Terminal — {currentPath}
        </div>
        <div className="text-gray-500 text-xs">
          TanStack Start + Cloudflare
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 text-green-400"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-cyan-400 mr-2">
            user@createsomething:{currentPath}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <span className="animate-pulse">_</span>
        </form>
      </div>

      {/* Terminal Footer */}
      <div className="bg-gray-800 border-t border-gray-700 p-2 text-xs text-gray-500 flex justify-between">
        <div>
          Ready • {commandHistory.length} commands
        </div>
        <div>
          Powered by Cloudflare Workers • Global Edge Network
        </div>
      </div>
    </div>
  )
}
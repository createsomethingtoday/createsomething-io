import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'error' | 'info' | 'ascii' | 'system' | 'success'
  content: string
  timestamp: number
}

export function TerminalExperience() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentPath, setCurrentPath] = useState('/')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Welcome sequence
  useEffect(() => {
    if (showWelcome) {
      const asciiArt = `
   ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗
  ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝
  ██║     ██████╔╝█████╗  ███████║   ██║   █████╗
  ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝
  ╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗
   ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝`

      const welcomeMessages = [
        { type: 'ascii' as const, content: asciiArt, delay: 0 },
        { type: 'system' as const, content: 'SYSTEM INITIALIZED', delay: 500 },
        { type: 'info' as const, content: 'Welcome to Create Something Terminal v3.0', delay: 700 },
        { type: 'info' as const, content: 'Powered by TanStack Start + Cloudflare Workers', delay: 900 },
        { type: 'output' as const, content: '', delay: 1000 },
        { type: 'info' as const, content: 'Type "help" for available commands', delay: 1100 },
        { type: 'output' as const, content: '', delay: 1200 },
      ]

      welcomeMessages.forEach(({ type, content, delay }) => {
        setTimeout(() => {
          setLines(prev => [...prev, {
            id: `welcome-${Date.now()}-${delay}`,
            type,
            content,
            timestamp: Date.now(),
          }])
        }, delay)
      })

      setTimeout(() => setShowWelcome(false), 1300)
    }
  }, [showWelcome])

  // Auto-scroll to bottom with smooth animation
  useEffect(() => {
    if (terminalRef.current) {
      gsap.to(terminalRef.current, {
        scrollTop: terminalRef.current.scrollHeight,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }, [lines])

  const processCommand = async (command: string) => {
    const [cmd, ...args] = command.trim().toLowerCase().split(' ')
    const arg = args.join(' ')

    switch (cmd) {
      case '':
        return

      case 'clear':
      case 'cls':
        setLines([])
        return

      case 'help':
        addOutput([
          '',
          '╔════════════════════════════════════════════════════════╗',
          '║                  AVAILABLE COMMANDS                    ║',
          '╚════════════════════════════════════════════════════════╝',
          '',
          'Navigation:',
          '  ls [path]         List directory contents',
          '  cd <path>         Change directory',
          '  pwd               Print working directory',
          '',
          'Content:',
          '  papers            List all technical papers',
          '  read <id>         Read a specific paper',
          '  search <query>    Search papers',
          '',
          'System:',
          '  clear/cls         Clear terminal screen',
          '  about             About Create Something',
          '  contact           Contact information',
          '  help              Show this help message',
          '',
          '────────────────────────────────────────────────────────',
          'Tip: Use ↑/↓ for command history',
          '',
        ], 'info')
        return

      case 'about':
        addOutput([
          '',
          '╔════════════════════════════════════════════════════════╗',
          '║              CREATE SOMETHING TERMINAL                 ║',
          '╚════════════════════════════════════════════════════════╝',
          '',
          'Version: 3.0.0',
          'Platform: TanStack Start + Cloudflare Workers',
          '',
          'Infrastructure:',
          '  • Edge Computing: 300+ global locations',
          '  • Database: Cloudflare D1 (SQLite at edge)',
          '  • Storage: Cloudflare R2',
          '  • Cache: Cloudflare KV',
          '',
          'Performance:',
          '  • Cold Start: ~14ms',
          '  • Global Latency: <50ms',
          '  • Availability: 99.99%',
          '',
          '© 2024 Create Something Agency',
          'Building the future, one command at a time.',
          '',
        ], 'info')
        return

      case 'contact':
        addOutput([
          '',
          '╔════════════════════════════════════════════════════════╗',
          '║                   CONTACT US                           ║',
          '╚════════════════════════════════════════════════════════╝',
          '',
          'Email:    hello@createsomething.agency',
          'GitHub:   github.com/createsomethingtoday',
          'Twitter:  @createsomething',
          'Web:      createsomething.agency',
          '',
        ], 'info')
        return

      case 'pwd':
        addOutput(currentPath, 'output')
        return

      default:
        // Server-side commands
        try {
          const response = await fetch('/api/terminal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: cmd, args: arg, path: currentPath })
          })

          if (!response.ok) {
            addOutput(`Error: ${response.statusText}`, 'error')
            return
          }

          const result = await response.json()

          if (result.newPath) {
            setCurrentPath(result.newPath)
          }

          if (result.output) {
            addOutput(result.output, result.type || 'output')
          }
        } catch (error) {
          addOutput(`Command not found: ${cmd}. Type "help" for available commands.`, 'error')
        }
    }
  }

  const addOutput = (content: string | string[], type: TerminalLine['type'] = 'output') => {
    const newLines = Array.isArray(content)
      ? content.map(line => ({
          id: `${Date.now()}-${Math.random()}`,
          type,
          content: line,
          timestamp: Date.now(),
        }))
      : [{
          id: `${Date.now()}-${Math.random()}`,
          type,
          content,
          timestamp: Date.now(),
        }]

    setLines(prev => [...prev, ...newLines])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isProcessing) return

    const input = currentInput.trim()
    if (!input) {
      setLines(prev => [...prev, {
        id: `empty-${Date.now()}`,
        type: 'input',
        content: '$ ',
        timestamp: Date.now(),
      }])
      return
    }

    // Add to history
    setCommandHistory(prev => [...prev, input])
    setHistoryIndex(-1)

    // Display command
    setLines(prev => [...prev, {
      id: `cmd-${Date.now()}`,
      type: 'input',
      content: `$ ${input}`,
      timestamp: Date.now(),
    }])

    setCurrentInput('')
    setIsProcessing(true)

    await processCommand(input)
    setIsProcessing(false)
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
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
      style={{ background: '#000000', color: '#ffffff' }}
    >
      {/* Terminal Header */}
      <motion.div
        className="bg-black border-b border-white/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
          </div>
          <div className="font-mono text-sm tracking-wider text-white">
            CREATE SOMETHING TERMINAL — {currentPath}
          </div>
          <div className="font-mono text-xs text-white/50">
            TanStack Start + Cloudflare
          </div>
        </div>
      </motion.div>

      {/* Terminal Content */}
      <motion.div
        className="flex-1 overflow-hidden flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="w-full max-w-6xl h-[calc(100vh-8rem)] rounded-xl overflow-hidden border border-white/20">
          <div
            ref={terminalRef}
            className="h-[calc(100%-4rem)] overflow-y-auto p-6 font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
            style={{ background: '#000000' }}
          >
            <AnimatePresence mode="popLayout">
              {lines.map((line, i) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i < 7 ? i * 0.08 : 0,
                    duration: 0.2,
                  }}
                  className={`whitespace-pre-wrap mb-1 ${
                    line.type === 'ascii' ? 'text-xs lg:text-sm leading-tight' : ''
                  }`}
                  style={{ color: '#ffffff' }}
                >
                  {line.content}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Line */}
          <div
            className="border-t border-white/20 px-6 py-3"
            style={{ background: '#000000' }}
            onClick={() => inputRef.current?.focus()}
          >
            <form onSubmit={handleSubmit} className="flex items-center font-mono text-sm">
              <span className="mr-2 text-white">
                user@createsomething:{currentPath}$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
                className="flex-1 bg-transparent border-none outline-none font-mono text-base text-white"
                style={{ caretColor: '#ffffff' }}
                placeholder={isProcessing ? "Processing..." : ""}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                autoFocus
              />
              <motion.span
                className="inline-block w-2 h-4 ml-1 bg-white"
                animate={{ opacity: isProcessing ? 0.3 : [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </form>
          </div>
        </div>
      </motion.div>

      {/* Terminal Footer */}
      <motion.div
        className="bg-black border-t border-white/20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="px-4 py-2 flex items-center justify-between text-xs font-mono">
          <div className="text-white/50">
            READY • {commandHistory.length} commands • Session Active
          </div>
          <div className="text-white/50">
            Powered by Cloudflare Workers • TanStack Start
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

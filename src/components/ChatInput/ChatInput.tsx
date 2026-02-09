import React from 'react'
import styles from './ChatInput.module.css'

/* Send アイコン */
const SendIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* Reset アイコン */
const ResetIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.51 15C4.16 17.09 5.48 18.88 7.28 20.06C9.08 21.24 11.22 21.73 13.33 21.45C15.44 21.17 17.39 20.14 18.82 18.55C20.24 16.95 21.06 14.89 21.12 12.74C21.18 10.59 20.48 8.49 19.14 6.82C17.81 5.16 15.93 4.03 13.85 3.63C11.76 3.23 9.6 3.59 7.73 4.65C5.86 5.72 4.41 7.42 3.58 9.47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onReset: () => void
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, onReset, disabled = false }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <input
            type="text"
            className={styles.input}
            placeholder="メッセージを入力..."
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />

          <button
            className={styles.sendButton}
            onClick={onSend}
            disabled={!value.trim() || disabled}
            aria-label="送信"
          >
            <SendIcon />
            <span>送信</span>
          </button>

          <button
            className={styles.resetButton}
            onClick={onReset}
            disabled={disabled}
          >
            <ResetIcon />
            <span>好感度とすべての会話履歴をリセット</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInput

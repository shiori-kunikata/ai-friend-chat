import React from 'react'
import AICharacter from '../AICharacter/AICharacter'
import styles from './ChatMessage.module.css'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  intimacyLevel: number
  isLatest?: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, intimacyLevel, isLatest = false }) => {
  const isUser = role === 'user'

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : styles.rowAssistant}`}>
      {!isUser && (
        <AICharacter intimacyLevel={intimacyLevel} animated={isLatest} />
      )}
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
        <p className={styles.text}>{content}</p>
      </div>
    </div>
  )
}

export default ChatMessage

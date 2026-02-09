import React from 'react'
import IntimacyBar from '../IntimacyBar/IntimacyBar'
import styles from './ChatHeader.module.css'

/* Heart アイコン */
const HeartIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21C12 21 3 15 3 8.5C3 5.46243 5.46243 3 8.5 3C10.3 3 11.9 3.9 12.5 5.1C13.1 3.9 14.7 3 16.5 3C19.5376 3 22 5.46243 22 8.5C22 15 12 21 12 21Z"
      fill="var(--color-pink-500)"
    />
  </svg>
)

interface ChatHeaderProps {
  intimacyLevel: number
  relationshipStatus: string
  statusEmoji: string
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ intimacyLevel, relationshipStatus, statusEmoji }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* タイトル行 */}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            <HeartIcon />
            <span>親密度チャット</span>
          </h1>
          <div className={styles.statusBlock}>
            <span className={styles.statusLabel}>関係性</span>
            <div className={styles.statusValue}>
              <span>{statusEmoji}</span>
              <span>{relationshipStatus}</span>
            </div>
          </div>
        </div>

        {/* 親密度バー */}
        <IntimacyBar
          level={intimacyLevel}
          status={relationshipStatus}
          statusEmoji={statusEmoji}
        />
      </div>
    </header>
  )
}

export default ChatHeader

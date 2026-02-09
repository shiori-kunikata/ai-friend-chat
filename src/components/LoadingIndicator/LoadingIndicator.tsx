import React from 'react'
import AICharacter from '../AICharacter/AICharacter'
import styles from './LoadingIndicator.module.css'

interface LoadingIndicatorProps {
  intimacyLevel: number
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ intimacyLevel }) => {
  return (
    <div className={styles.row}>
      <AICharacter intimacyLevel={intimacyLevel} animated />
      <div className={styles.bubble}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ animationDelay: '0ms' }} />
          <span className={styles.dot} style={{ animationDelay: '150ms' }} />
          <span className={styles.dot} style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator

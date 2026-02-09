import React from 'react'
import styles from './CTABanner.module.css'

const ArrowRightIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CTABanner: React.FC = () => {
  return (
    <button className={styles.banner}>
      <div className={styles.bgPattern} />
      <p className={styles.text}>
        まずは、あなたのキッチンカーを登録してみましょう！
      </p>
      <div className={styles.arrowIcon}>
        <ArrowRightIcon />
      </div>
    </button>
  )
}

export default CTABanner

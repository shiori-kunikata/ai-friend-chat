import React from 'react'
import styles from './Header.module.css'

/* アイコン SVG コンポーネント */
const MailIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="var(--color-text)" strokeWidth="1.5" />
    <path d="M2 7L12 13L22 7" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const UserIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="var(--color-text)" strokeWidth="1.5" />
    <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z" stroke="var(--color-text)" strokeWidth="1.5" />
  </svg>
)

interface HeaderProps {
  notificationCount?: number
}

const Header: React.FC<HeaderProps> = ({ notificationCount = 5 }) => {
  return (
    <header className={styles.header}>
      <button className={styles.iconButton} aria-label="メール">
        <MailIcon />
        {notificationCount > 0 && (
          <span className={styles.badge}>{notificationCount}</span>
        )}
      </button>

      <div className={styles.logo}>
        <span className={styles.logoText}>キッチンこねくと</span>
      </div>

      <button className={styles.iconButton} aria-label="ユーザー">
        <UserIcon />
      </button>
    </header>
  )
}

export default Header

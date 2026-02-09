import React from 'react'
import styles from './TabBar.module.css'

interface Tab {
  label: string
  active?: boolean
}

interface TabBarProps {
  tabs: Tab[]
  onTabChange?: (index: number) => void
}

const TabBar: React.FC<TabBarProps> = ({ tabs, onTabChange }) => {
  return (
    <div className={styles.tabBar}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${tab.active ? styles.active : ''}`}
          onClick={() => onTabChange?.(index)}
        >
          <span className={styles.tabLabel}>{tab.label}</span>
          {tab.active && <div className={styles.indicator} />}
        </button>
      ))}
    </div>
  )
}

export default TabBar

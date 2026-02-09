import React from 'react'
import styles from './SearchBar.module.css'

const SearchIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="var(--color-text)" strokeWidth="1.5" />
    <path d="M16 16L20 20" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.icon}>
        <SearchIcon />
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="キーワードを入力"
      />
    </div>
  )
}

export default SearchBar

import React from 'react'
import styles from './Tag.module.css'

interface TagProps {
  label: string
  color?: 'green' | 'lightbrown'
  size?: 'md' | 'sm'
}

const Tag: React.FC<TagProps> = ({ label, color = 'lightbrown', size = 'sm' }) => {
  const className = `${styles.tag} ${styles[color]} ${styles[size]}`

  return (
    <span className={className}>
      {label}
    </span>
  )
}

export default Tag

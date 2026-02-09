import React from 'react'
import styles from './IntimacyBar.module.css'

interface IntimacyBarProps {
  level: number
  status: string
  statusEmoji: string
}

const IntimacyBar: React.FC<IntimacyBarProps> = ({ level, status, statusEmoji }) => {
  const getBarColorClass = () => {
    if (level <= 20) return styles.barGray
    if (level <= 50) return styles.barBlue
    if (level <= 80) return styles.barPurple
    return styles.barPink
  }

  return (
    <div className={styles.container}>
      {/* 上段：ラベルと値 */}
      <div className={styles.labelRow}>
        <span className={styles.label}>親密度</span>
        <span className={styles.value}>{level} / 100</span>
      </div>

      {/* プログレスバー */}
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${getBarColorClass()}`}
          style={{ width: `${level}%` }}
        />
      </div>

      {/* ステージラベル */}
      <div className={styles.stages}>
        <span className={styles.stageLabel} style={{ left: '0%' }}>初対面</span>
        <span className={styles.stageLabel} style={{ left: '20%' }}>知り合い</span>
        <span className={styles.stageLabel} style={{ left: '50%' }}>友だち</span>
        <span className={styles.stageLabel} style={{ left: '80%' }}>親しい</span>
      </div>
    </div>
  )
}

export default IntimacyBar

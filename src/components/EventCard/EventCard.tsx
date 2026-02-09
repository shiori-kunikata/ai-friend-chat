import React from 'react'
import Tag from '../Tag/Tag'
import styles from './EventCard.module.css'

/* SVG アイコン */
const TruckIcon: React.FC<{ color?: string }> = ({ color = 'var(--color-text)' }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3.5H12V13.5H1V3.5Z" stroke={color} strokeWidth="1.2" />
    <path d="M12 6.5H15.5L18 9.5V13.5H12V6.5Z" stroke={color} strokeWidth="1.2" />
    <circle cx="5" cy="14" r="1.5" stroke={color} strokeWidth="1.2" />
    <circle cx="15" cy="14" r="1.5" stroke={color} strokeWidth="1.2" />
  </svg>
)

const CalendarIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="2" width="9" height="8.5" rx="1.5" stroke="var(--color-text)" strokeWidth="1" />
    <path d="M1.5 5H10.5" stroke="var(--color-text)" strokeWidth="1" />
    <path d="M4 1V3" stroke="var(--color-text)" strokeWidth="1" strokeLinecap="round" />
    <path d="M8 1V3" stroke="var(--color-text)" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

const LocationIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1C3.79 1 2 2.79 2 5C2 8 6 11 6 11C6 11 10 8 10 5C10 2.79 8.21 1 6 1Z" stroke="var(--color-text)" strokeWidth="1" />
    <circle cx="6" cy="5" r="1.5" stroke="var(--color-text)" strokeWidth="1" />
  </svg>
)

const HeartIcon: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 24.5C14 24.5 3.5 18.5 3.5 10.5C3.5 7.18629 6.18629 4.5 9.5 4.5C11.5 4.5 13.25 5.5 14 7C14.75 5.5 16.5 4.5 18.5 4.5C21.8137 4.5 24.5 7.18629 24.5 10.5C24.5 18.5 14 24.5 14 24.5Z"
      fill={filled ? '#C60000' : 'rgba(0,0,0,0.1)'}
      stroke={filled ? '#C60000' : 'rgba(0,0,0,0.2)'}
      strokeWidth="1.5"
    />
  </svg>
)

export interface EventCardData {
  id: string
  title: string
  imageUrl: string
  dateRange: string
  location: string
  tags: string[]
  remainingSlots: number
  totalSlots: number
  isFavorite?: boolean
  isUrgent?: boolean
}

interface EventCardProps {
  data: EventCardData
  onFavoriteToggle?: (id: string) => void
}

const EventCard: React.FC<EventCardProps> = ({ data, onFavoriteToggle }) => {
  const isUrgent = data.remainingSlots <= 1

  return (
    <div className={styles.card}>
      {/* 画像エリア */}
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <img
            src={data.imageUrl}
            alt={data.title}
            className={styles.image}
          />
        </div>

        {/* 残り台数バッジ */}
        <div className={styles.slotBadge}>
          <TruckIcon color={isUrgent ? 'var(--color-red)' : 'var(--color-text)'} />
          <span className={styles.slotText}>
            <span className={`${styles.slotCount} ${isUrgent ? styles.urgent : ''}`}>
              残り{data.remainingSlots}台
            </span>
            <span className={styles.slotTotal}>/{data.totalSlots}</span>
          </span>
        </div>
      </div>

      {/* コンテンツ */}
      <div className={styles.content}>
        {/* タイトル */}
        <div className={styles.titleRow}>
          <p className={styles.title}>{data.title}</p>
        </div>

        {/* 日付 & 場所 */}
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <CalendarIcon />
            <span className={styles.metaText}>{data.dateRange}</span>
          </div>
          <div className={styles.metaItem}>
            <LocationIcon />
            <span className={styles.metaText}>{data.location}</span>
          </div>
        </div>

        {/* タグ */}
        <div className={styles.tagsRow}>
          {data.tags.map((tag, index) => (
            <Tag key={index} label={tag} color="lightbrown" size="sm" />
          ))}
        </div>
      </div>

      {/* お気に入りボタン */}
      <button
        className={styles.favoriteButton}
        onClick={() => onFavoriteToggle?.(data.id)}
        aria-label="お気に入り"
      >
        <HeartIcon filled={data.isFavorite} />
      </button>
    </div>
  )
}

export default EventCard

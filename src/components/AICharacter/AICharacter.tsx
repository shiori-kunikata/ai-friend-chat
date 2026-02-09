import React, { useEffect, useState } from 'react'
import styles from './AICharacter.module.css'

interface AICharacterProps {
  intimacyLevel: number
  animated?: boolean
}

const AICharacter: React.FC<AICharacterProps> = ({ intimacyLevel, animated = true }) => {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    if (!animated) return

    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(blinkInterval)
  }, [animated])

  const getFeatures = () => {
    if (intimacyLevel <= 20) {
      return {
        eyeHeight: isBlinking ? 2 : 8,
        eyeY: isBlinking ? 32 : 28,
        mouthPath: 'M 25 45 L 43 45',
        cheekOpacity: 0,
        bgColor: 'var(--color-gray-200)',
        accentColor: 'var(--color-gray-400)',
      }
    } else if (intimacyLevel <= 50) {
      return {
        eyeHeight: isBlinking ? 2 : 10,
        eyeY: isBlinking ? 31 : 27,
        mouthPath: 'M 25 44 Q 34 47 43 44',
        cheekOpacity: 0.3,
        bgColor: 'var(--color-blue-100)',
        accentColor: 'var(--color-blue-400)',
      }
    } else if (intimacyLevel <= 80) {
      return {
        eyeHeight: isBlinking ? 2 : 6,
        eyeY: isBlinking ? 30 : 28,
        mouthPath: 'M 25 43 Q 34 50 43 43',
        cheekOpacity: 0.6,
        bgColor: 'var(--color-purple-100)',
        accentColor: 'var(--color-purple-400)',
      }
    } else {
      return {
        eyeHeight: isBlinking ? 2 : 4,
        eyeY: isBlinking ? 30 : 30,
        mouthPath: 'M 22 42 Q 34 52 46 42',
        cheekOpacity: 0.9,
        bgColor: 'var(--color-pink-100)',
        accentColor: 'var(--color-pink-400)',
      }
    }
  }

  const features = getFeatures()
  const gradId = `grad-${intimacyLevel}`

  return (
    <div className={`${styles.wrapper} ${animated ? styles.animated : ''}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={features.bgColor} stopOpacity={1} />
            <stop offset="100%" stopColor={features.accentColor} stopOpacity={0.3} />
          </linearGradient>
          <filter id="charShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 顔の円 */}
        <circle cx="32" cy="32" r="28" fill={`url(#${gradId})`} filter="url(#charShadow)" />

        {/* 頬 */}
        <circle cx="20" cy="36" r="5" fill="var(--color-red-300)" opacity={features.cheekOpacity} />
        <circle cx="44" cy="36" r="5" fill="var(--color-red-300)" opacity={features.cheekOpacity} />

        {/* 目 */}
        <ellipse cx="24" cy={features.eyeY} rx="3" ry={features.eyeHeight} fill="var(--color-gray-700)" />
        <ellipse cx="40" cy={features.eyeY} rx="3" ry={features.eyeHeight} fill="var(--color-gray-700)" />

        {/* 目のキラキラ */}
        {!isBlinking && intimacyLevel > 50 && (
          <>
            <circle cx="25" cy="26" r="1.5" fill="white" opacity="0.8" />
            <circle cx="41" cy="26" r="1.5" fill="white" opacity="0.8" />
          </>
        )}

        {/* 口 */}
        <path d={features.mouthPath} stroke="var(--color-gray-700)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* 高親密度のハート */}
        {intimacyLevel > 80 && (
          <g className={styles.pulse}>
            <path d="M 32 12 L 34 16 L 30 16 Z" fill="var(--color-pink-400)" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  )
}

export default AICharacter

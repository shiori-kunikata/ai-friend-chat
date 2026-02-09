import React, { useState, useEffect, useRef } from 'react'
import ChatHeader from './components/ChatHeader/ChatHeader'
import ChatMessage from './components/ChatMessage/ChatMessage'
import ChatInput from './components/ChatInput/ChatInput'
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator'
import { sendChat, getIntimacy, getChatHistory, resetUser } from './api/supabase'
import styles from './App.module.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  intimacyLevel?: number
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [intimacyLevel, setIntimacyLevel] = useState(0)
  const [relationshipStatus, setRelationshipStatus] = useState('初対面')
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  /* ユーザーIDの取得 or 生成 & 初期データロード */
  useEffect(() => {
    let storedId = localStorage.getItem('intimacy_chat_userId')
    if (!storedId) {
      storedId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('intimacy_chat_userId', storedId)
    }
    setUserId(storedId)

    // 初期データをロード
    const loadInitialData = async () => {
      try {
        const [intimacyData, history] = await Promise.all([
          getIntimacy(storedId!),
          getChatHistory(storedId!),
        ])

        setIntimacyLevel(intimacyData.intimacyLevel)
        setRelationshipStatus(intimacyData.relationshipStatus)

        // 会話履歴を Message 型に変換
        const loadedMessages: Message[] = history.map((msg, i) => ({
          id: `${msg.role}_loaded_${i}`,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date(msg.timestamp).getTime(),
        }))
        setMessages(loadedMessages)
      } catch (err) {
        console.error('初期データの読み込みに失敗:', err)
      }
    }

    loadInitialData()
  }, [])

  /* 自動スクロール */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getStatusEmoji = () => {
    if (intimacyLevel <= 20) return '👋'
    if (intimacyLevel <= 50) return '🙂'
    if (intimacyLevel <= 80) return '😊'
    return '💕'
  }

  /* メッセージ送信 → Supabase Edge Function → OpenAI */
  const handleSend = async () => {
    if (!inputText.trim() || isLoading || !userId) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputText.trim(),
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const data = await sendChat(userId, userMessage.content)

      const aiMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.aiMessage,
        timestamp: Date.now(),
        intimacyLevel: data.intimacyLevel,
      }

      setMessages(prev => [...prev, aiMessage])
      setIntimacyLevel(data.intimacyLevel)
      setRelationshipStatus(data.relationshipStatus)
    } catch (err) {
      console.error('送信エラー:', err)
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'すみません、エラーが発生しました。もう一度お試しください。',
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  /* リセット */
  const handleReset = async () => {
    if (!confirm('親密度と会話履歴をリセットしますか？')) return

    try {
      await resetUser(userId)
      setMessages([])
      setIntimacyLevel(0)
      setRelationshipStatus('初対面')
    } catch (err) {
      console.error('リセットエラー:', err)
      alert('リセットに失敗しました。もう一度お試しください。')
    }
  }

  return (
    <div className={styles.page}>
      {/* ヘッダー */}
      <ChatHeader
        intimacyLevel={intimacyLevel}
        relationshipStatus={relationshipStatus}
        statusEmoji={getStatusEmoji()}
      />

      {/* チャットエリア */}
      <div className={styles.chatArea}>
        <div className={styles.chatInner}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyEmoji}>👋</div>
              <h2 className={styles.emptyTitle}>はじめまして！</h2>
              <p className={styles.emptyDescription}>
                たくさん会話して、親密度を高めていきましょう
              </p>
            </div>
          )}

          {messages.map((msg, index) => {
            const isLatestAssistant =
              msg.role === 'assistant' &&
              (index === messages.length - 1 ||
                messages.slice(index + 1).every(m => m.role === 'user'))

            return (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                intimacyLevel={msg.intimacyLevel ?? intimacyLevel}
                isLatest={isLatestAssistant}
              />
            )
          })}

          {isLoading && <LoadingIndicator intimacyLevel={intimacyLevel} />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 入力エリア */}
      <ChatInput
        value={inputText}
        onChange={setInputText}
        onSend={handleSend}
        onReset={handleReset}
        disabled={isLoading}
      />
    </div>
  )
}

export default App

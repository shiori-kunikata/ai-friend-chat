/**
 * Supabase Edge Functions への接続設定
 * Figma Make で自動生成された Supabase プロジェクトの情報
 */

export const SUPABASE_PROJECT_ID = 'fbzonmoegjxvvuvptxkc'
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiem9ubW9lZ2p4dnZ1dnB0eGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjMzMTAsImV4cCI6MjA4NDYzOTMxMH0.8dDycTNgVshYqJtthkpP0sfi1gLDc0s3-ll49uQ3PV8'

const BASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-5a3cc0f9`

const headers = {
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

/** ヘルスチェック */
export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/health`, { headers })
    return res.ok
  } catch {
    return false
  }
}

/** チャット送信 → AI応答 + 親密度更新 */
export async function sendChat(
  userId: string,
  message: string
): Promise<{
  aiMessage: string
  intimacyLevel: number
  relationshipStatus: string
  intimacyIncrease: number
}> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ userId, message }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'チャット送信に失敗しました')
  }

  return res.json()
}

/** 親密度取得 */
export async function getIntimacy(
  userId: string
): Promise<{ intimacyLevel: number; relationshipStatus: string }> {
  const res = await fetch(`${BASE_URL}/intimacy/${userId}`, { headers })

  if (!res.ok) {
    return { intimacyLevel: 0, relationshipStatus: '初対面' }
  }

  return res.json()
}

/** 会話履歴取得 */
export async function getChatHistory(
  userId: string
): Promise<{ role: string; content: string; timestamp: string }[]> {
  const res = await fetch(`${BASE_URL}/history/${userId}`, { headers })

  if (!res.ok) {
    return []
  }

  const data = await res.json()
  return data.messages || []
}

/** 親密度 & 会話履歴リセット */
export async function resetUser(userId: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/reset/${userId}`, {
    method: 'POST',
    headers,
  })

  if (!res.ok) {
    throw new Error('リセットに失敗しました')
  }
}

/**
 * JWT Utilities
 * Helper functions for working with JWT tokens
 */

export interface JWTPayload {
  sub?: string
  user_id?: string
  id?: string
  name?: string
  username?: string
  email?: string
  role?: string
  exp?: number
  iat?: number
  [key: string]: any
}

/**
 * Decode JWT token (basic decode without signature verification)
 * Note: This does NOT verify the token signature. Only use for reading claims.
 * Signature verification should be done on the backend.
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (error) {
    console.error('JWT decode error:', error)
    return null
  }
}

/**
 * Check if a JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) {
    return true
  }

  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now()
}

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem('auth_token')
}

/**
 * Save token to localStorage
 */
export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

/**
 * Remove token from localStorage
 */
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

/**
 * Get user info from JWT token
 */
export function getUserFromToken(token: string): {
  id: string
  email: string
  role: string
} | null {
  const payload = decodeJWT(token)
  if (!payload) {
    return null
  }

  return {
    id: payload.sub || payload.user_id || payload.id || '',
    name: payload.name || payload.username || '',
    email: payload.email || '',
    role: payload.role || 'user',
  }
}
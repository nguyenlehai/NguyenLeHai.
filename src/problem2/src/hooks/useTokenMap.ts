import { useState, useEffect } from 'react'
import { TokenItemTyped } from '../type'
import { getTokenList } from '../services/token'

const useTokenMap = () => {
  const [tokenMap, setTokenMap] = useState<Map<string, TokenItemTyped>>(new Map())

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokens = await getTokenList()
        const map = new Map<string, TokenItemTyped>()
        tokens.forEach((item) => {
          map.set(item.currency, item)
        })
        setTokenMap(map)
      } catch (error) {
        console.error('Failed to fetch tokens:', error)
      }
    }

    fetchTokens()
  }, [])

  return {
    tokenMap,
  }
}

export default useTokenMap

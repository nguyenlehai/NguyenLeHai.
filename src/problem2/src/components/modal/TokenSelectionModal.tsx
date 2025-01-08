import {Modal, Input, Spin, Typography} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import debounce from 'lodash.debounce'
import { useState, useEffect } from 'react'
import { TokenItemTyped } from '../../type'
import { getTokenList } from '../../services/token'
import EmptyPlaceholder from '../layout/EmptyPlaceholder'

type TokenSelectionModalProps = {
  open: boolean
  onSelectToken: (token: TokenItemTyped) => void
  onCancel: () => void
}

const TokenSelectionModal = ({ open, onSelectToken, onCancel }: TokenSelectionModalProps) => {
  const [keyword, setKeyword] = useState<string>()
  const [tokens, setTokens] = useState<TokenItemTyped[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true)
      try {
        const data = await getTokenList(keyword)
        setTokens(data)
      } catch (error) {
        console.error('Failed to fetch tokens:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokens()
  }, [keyword])

  const handleChange = debounce((value: string) => {
    setKeyword(value)
  }, 300)

  return (
    <Modal
      title="Select Token"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={550}
    >
      <div className="space-y-6">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Token name"
          onChange={(e) => handleChange(e.target.value)}
          allowClear
        />
        
        {isLoading ? (
          <div className="p-8 text-center">
            <Spin />
          </div>
        ) : tokens.length ? (
          <div className="max-h-80 overflow-auto space-y-2">
            {tokens.map((token) => (
              <div
                key={token.currency}
                className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => {
                  onSelectToken(token)
                  onCancel()
                }}
              >
                <img
                  src={`/token-icons/${token.currency}.svg`}
                  className="w-6 h-6"
                  alt={token.currency}
                />
                <div>
                  <Typography>{token.currency}</Typography>
                  <Typography>
                    ${token.price}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder description="Token with keyword cannot be found" />
        )}
      </div>
    </Modal>
  )
}

export default TokenSelectionModal

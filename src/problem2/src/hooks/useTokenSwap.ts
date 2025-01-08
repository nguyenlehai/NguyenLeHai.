import { useState, useEffect } from 'react'
import { message } from 'antd'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTokenStore } from '../store/useTokenStore.ts'
import { getExchangeRate, updateSwapToken } from '../services/token.ts'
import { tokenFormSchema, TokenFormData } from '../store/token.ts'
import {formatNumber} from "../utils/utils.ts";
import {ExchangeSide} from "../type";

function useTokenSwap() {
  const {
    from,
    to,
    selectedSide,
    isConfirmModalOpen,
    isTokenModalOpen,
    updateQuantity,
    swapTokens,
    setSelectedSide,
    setConfirmModalOpen,
    setTokenModalOpen
  } = useTokenStore()

  const [messageApi, contextHolder] = message.useMessage()
  const [rateData, setRateData] = useState<number>()
  const [isRateLoading, setIsRateLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TokenFormData>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      quantity: ''
    }
  })

  // Fetch exchange rate when currencies change
  useEffect(() => {
    const fetchRate = async () => {
      setIsRateLoading(true)
      try {
        const rate = await getExchangeRate(from.currency, to.currency)
        setRateData(rate)
        updateQuantity('to', formatNumber((from.quantity as number) * rate))
      } catch (error) {
        messageApi.error('Failed to fetch exchange rate')
      } finally {
        setIsRateLoading(false)
      }
    }

    fetchRate()
  }, [from.currency, to.currency])

  const handleConfirmSwap = () => {
    setConfirmModalOpen(true)
  }

  const handleConfirmModalOk = async () => {
    setConfirmModalOpen(false)
    messageApi.loading('Swapping your token...')
    try {
      await updateSwapToken()
      messageApi.success('Swapped successfully')
    } catch (error) {
      messageApi.error('Failed to swap tokens')
    }
  }

  const handleChangeQuantity = (value: number) => {
    const isEmpty = !value
    updateQuantity('from', isEmpty ? 0 : value)
    setValue('quantity', value.toString())
    
    if (rateData) {
      updateQuantity('to', isEmpty ? 0 : formatNumber(value * rateData))
    }
  }

  const handleChangeCurrency = (side: ExchangeSide) => {
    setSelectedSide(side)
    setTokenModalOpen(true)
  }

  return {
    from,
    to,
    rateData,
    isRateLoading,
    isConfirmModalOpen,
    isTokenModalOpen,
    selectedSide,
    errors,
    register,
    handleSubmit,
    handleChangeCurrency,
    handleConfirmSwap,
    handleConfirmModalOk,
    handleChangeQuantity,
    swapTokens,
    setConfirmModalOpen,
    setTokenModalOpen,
    contextHolder
  }
}

export default useTokenSwap

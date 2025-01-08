import { Input, Typography } from 'antd'
import { UseFormRegister } from 'react-hook-form'
import { TokenFormData } from '../../store/token.ts'
import TokenPicker from './TokenPicker'
import {formatCurrency} from "../../utils/utils.ts";
import {ExchangeSide} from "../../type";

type ExchangerProps = {
  side: ExchangeSide
  quantity: number
  currentToken: string
  onPickToken: (side: ExchangeSide) => void
  loading?: boolean
  disabledInput?: boolean
  onChangeQuantity?: (value: number) => void
  register?: UseFormRegister<TokenFormData>
  error?: string
}

const Exchanger = ({
  side,
  quantity,
  currentToken,
  onPickToken,
  disabledInput,
  onChangeQuantity,
  register,
  error,
}: ExchangerProps) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Typography.Text className="text-gray-600">{side === 'from' ? 'From' : 'To'}</Typography.Text>
      </div>
      
      <div className="flex justify-between items-center">
        <Typography.Text className="text-gray-600">Balance</Typography.Text>
        <Typography.Text className="text-gray-600">≈ ${formatCurrency(0)}</Typography.Text>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TokenPicker
            currentToken={currentToken}
            side={side}
            onClick={() => onPickToken(side)}
          />
        </div>

        {register ? (
          <Input
            {...register('quantity')}
            placeholder="0"
            type="number"
            disabled={disabledInput}
            onChange={(e) => onChangeQuantity?.(Number(e.target.value))}
            className="text-2xl text-right bg-transparent p-0 h-auto w-1/2"
            status={error ? 'error' : undefined}
          />
        ) : (
          <Typography.Text className="text-2xl">
            {formatCurrency(quantity)}
          </Typography.Text>
        )}
      </div>

      {error && (
        <Typography.Text className="text-red-500">
          {error}
        </Typography.Text>
      )}
    </div>
  )
}

export default Exchanger

import { DownOutlined } from '@ant-design/icons'
import {ExchangeSide} from "../../type";
import {Button} from "antd";

type TokenPickerProps = {
  currentToken: string
  side: ExchangeSide
  onClick: () => void
}

const TokenPicker = ({ currentToken, onClick }: TokenPickerProps) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center space-x-2 h-auto px-2 py-1"
      type="text"
    >
      <img
        src={`/token-icons/${currentToken}.svg`}
        className="w-6 h-6"
        alt={currentToken}
      />
      <span className="text-lg font-medium">{currentToken}</span>
      <DownOutlined className="text-xs" />
    </Button>
  )
}

export default TokenPicker

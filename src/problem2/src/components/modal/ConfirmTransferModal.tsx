import { Modal } from 'antd'
import { useTokenStore } from '../../store/useTokenStore'
import { formatCurrency } from '../../utils/utils'

interface ConfirmTransferModalProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmTransferModal = ({ open, onConfirm, onCancel }: ConfirmTransferModalProps) => {
  const { from, to } = useTokenStore()

  return (
    <Modal
      title="Confirm Swap"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
      okButtonProps={{
        className: 'bg-indigo-600 hover:bg-indigo-700',
      }}
    >
      <div className="space-y-4 py-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">From</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{formatCurrency(from.quantity)}</span>
            <span className="text-gray-500">{from.currency}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">To</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{formatCurrency(to.quantity)}</span>
            <span className="text-gray-500">{to.currency}</span>
          </div>
        </div>

        <div className="pt-2 text-sm text-gray-500">
          Please review the transaction details before confirming.
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmTransferModal

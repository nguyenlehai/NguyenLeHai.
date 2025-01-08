import { Skeleton, Typography } from 'antd'
import { useTokenStore } from '../../store/useTokenStore'
import {formatCurrency} from "../../utils/utils.ts";

type RateOneOneProps = {
  loading: boolean
  rateData?: number
}

const RateOneOne = ({ loading, rateData }: RateOneOneProps) => {
  const { from, to } = useTokenStore()

  return (
    <div className="flex w-full justify-between items-center">
      <Typography.Text className="text-gray-600">Rate</Typography.Text>
      {loading ? (
        <Skeleton.Input active style={{ width: 160 }} size="small" />
      ) : (
        <Typography.Text>
          1 {from.currency} = {formatCurrency(rateData || 0)} {to.currency}
        </Typography.Text>
      )}
    </div>
  )
}

export default RateOneOne

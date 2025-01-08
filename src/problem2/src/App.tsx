import {Button, Card} from 'antd'
import {useTokenStore} from './store/useTokenStore'
import Exchanger from './components/TokenSwap/Exchanger'
import Switcher from './components/TokenSwap/Switcher'
import useTokenSwap from './hooks/useTokenSwap'
import RateOneOne from './components/TokenSwap/RateOneOne'
import ConfirmTransferModal from "./components/modal/ConfirmTransferModal"
import TokenSelectionModal from "./components/modal/TokenSelectionModal"
import { SwapLogo } from './assets/swap-logo'

function App() {
  const {
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
    contextHolder,
  } = useTokenSwap()

  const {changeCurrency} = useTokenStore()

  const onSubmit = handleSubmit(() => {
    handleConfirmSwap()
  })

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Header */}
        <header className="w-full py-6 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[46px] rounded-lg bg-indigo-600 flex items-center justify-center">
                <SwapLogo />
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="text-2xl leading-7 font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                  Token Swap
                </div>
                <div className="text-sm leading-5 text-gray-500">Fast & Secure Token Exchange</div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <span className="text-gray-500">Best Exchange Rate</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">Low Fees</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">Instant Swaps</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex justify-center items-center p-4">
          <Card 
            className="w-[450px] max-sm:w-full max-sm:mx-4 shadow-xl rounded-xl" 
            bordered={false}
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <Exchanger
                side="from"
                currentToken={from.currency}
                quantity={from.quantity}
                onChangeQuantity={(value) => handleChangeQuantity(Number(value))}
                onPickToken={handleChangeCurrency}
                register={register}
                error={errors.quantity?.message}
              />
              <div className="flex justify-center w-full">
                <Switcher onClick={swapTokens} />
              </div>
              <Exchanger
                side="to"
                currentToken={to.currency}
                quantity={to.quantity}
                loading={isRateLoading}
                disabledInput
                onPickToken={handleChangeCurrency}
              />
              <RateOneOne loading={isRateLoading} rateData={rateData} />
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={from.quantity === 0}
                block
                className="h-14 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 
                           transition-colors duration-200 rounded-lg"
              >
                Swap Tokens
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <ConfirmTransferModal
        open={isConfirmModalOpen}
        onConfirm={handleConfirmModalOk}
        onCancel={() => setConfirmModalOpen(false)}
      />

      <TokenSelectionModal
        open={isTokenModalOpen}
        onSelectToken={(token) => {
          changeCurrency(selectedSide, token.currency)
          setTokenModalOpen(false)
        }}
        onCancel={() => setTokenModalOpen(false)}
      />
    </>
  )
}

export default App

import './App.css'
import { Input } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'
import { useState } from 'react'

function App() {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState(0)

    const currencyInfo = useCurrencyInfo(from)

    const options = Object.keys(currencyInfo || {})

    const swap = () => {
        setFrom(to)
        setTo(from)

        setAmount(convertedAmount)
        setConvertedAmount(amount)
    }

    const convert = () => {
        if (!currencyInfo || !currencyInfo[to]) {
            return
        }

        setConvertedAmount(amount * currencyInfo[to])
    }

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/4025825/pexels-photo-4025825.jpeg')"
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            convert()
                        }}
                    >

                        {/* FROM */}
                        <div className="w-full mb-1">
                            <Input
                                label="From"
                                amount={amount}
                                currency={from}
                                currencyOptions={options}
                                onAmountChange={(amount) => setAmount(amount)}
                                onCurrencyChange={(currency) => setFrom(currency)}
                            />
                        </div>

                        {/* SWAP */}
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                Swap
                            </button>
                        </div>

                        {/* TO */}
                        <div className="w-full mt-1 mb-4">
                            <Input
                                label="To"
                                amount={convertedAmount}
                                currency={to}
                                currencyOptions={options}
                                amountDisable={true}
                                onCurrencyChange={(currency) => setTo(currency)}
                            />
                        </div>

                        {/* CONVERT */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                        >
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
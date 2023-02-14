const API_KEY = '9403c8504d0195d80aaa24e857abb8dc1184f2b3cffde0829a4306059d0ffe22'

const tickersHandlers = new Map()

// TODO: refactor to use URLSearchParams
const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickersHandlers.keys()].join(',')}&tsyms=USD&api_key=${API_KEY}`
  )
    .then(res => res.json())
    .then(rawData => {
      const updatedPrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
        )

      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? []
        handlers.forEach(fn => fn(newPrice))
      })
    })
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || []
  tickersHandlers.set(ticker, [...subscribers, cb])
}

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker)
}

setInterval(loadTickers, 5000)

window.tickersHandlers = tickersHandlers

// получить стоимость криптовалютных пар с АПИ?
// нет, получать ОБНОВЛЕНИЯ стоимости криптовалютных пар с АПИ
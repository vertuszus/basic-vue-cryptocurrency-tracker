const API_KEY = '9403c8504d0195d80aaa24e857abb8dc1184f2b3cffde0829a4306059d0ffe22'

// TODO: refactor to use URLSearchParams
export const loadTickers = tickers => {
  return fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(',')}&api_key=${API_KEY}`
  )
    .then(res => res.json())
    .then(rawData =>
      Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, 1 / value])
      )
    )
}

/*

  { a: 2, b: 4 }
  => [ ['a', 2], ['b', 4] ]
  => [ ['a', 0.5], ['b', 0.25] ]
  => { a: 0.5, b: 0.25 }

 */
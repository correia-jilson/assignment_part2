// Fetch block height from Blockchain.info API
export async function fetchBlockHeight() {
    const response = await fetch('https://blockchain.info/q/getblockcount');
    const blockHeight = await response.text();
    return parseInt(blockHeight, 10);
}

// Fetch transaction count from Blockchain.info API
export async function fetchTransactionCount() {
    const response = await fetch('https://blockchain.info/q/24hrtransactioncount');
    const transactionCount = await response.text();
    return parseInt(transactionCount, 10);
}

// Fetch Bitcoin price from Coindesk API
export async function fetchBitcoinPrice() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();
    return parseFloat(data.bpi.USD.rate.replace(',', ''));
}

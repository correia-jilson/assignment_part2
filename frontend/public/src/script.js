import { createChart } from '../../src/chartConfig.js';
import { fetchBlockHeight, fetchTransactionCount, fetchBitcoinPrice } from '../../src/api.js';

// Create real-time charts for on-chain and off-chain metrics
const blockHeightChart = createChart('blockHeightChart', 'Block Height', []);
const transactionCountChart = createChart('transactionCountChart', 'Transaction Count', []);
const bitcoinPriceChart = createChart('bitcoinPriceChart', 'Bitcoin Price (USD)', []);

// Function to update block height and transaction count (on-chain metrics)
async function updateOnChainMetrics() {
    try {
        const blockHeight = await fetchBlockHeight();
        const transactionCount = await fetchTransactionCount();

        document.getElementById('block-height').textContent = `Current Block Height: ${blockHeight}`;
        blockHeightChart.data.labels.push(new Date().toLocaleTimeString());
        blockHeightChart.data.datasets[0].data.push(blockHeight);
        blockHeightChart.update();

        transactionCountChart.data.labels.push(new Date().toLocaleTimeString());
        transactionCountChart.data.datasets[0].data.push(transactionCount);
        transactionCountChart.update();
    } catch (error) {
        console.error('Error fetching on-chain metrics:', error);
    }
}

// Function to update Bitcoin price (off-chain metric)
async function updateOffChainMetrics() {
    try {
        const bitcoinPrice = await fetchBitcoinPrice();
        document.getElementById('bitcoin-price').textContent = `Current Bitcoin Price: $${bitcoinPrice}`;

        bitcoinPriceChart.data.labels.push(new Date().toLocaleTimeString());
        bitcoinPriceChart.data.datasets[0].data.push(bitcoinPrice);
        bitcoinPriceChart.update();
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
}

// Set interval to fetch metrics every 60 seconds
setInterval(updateOnChainMetrics, 60000);
setInterval(updateOffChainMetrics, 60000);

// Initial fetch to populate data
updateOnChainMetrics();
updateOffChainMetrics();

const API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT';
let priceChart;

// Function to initialize the chart
function initializeChart() {
    const ctx = document.getElementById('price-chart').getContext('2d');
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'ETH Price (USD)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Function to update chart data
function updateChartData(price) {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    priceChart.data.labels.push(timeLabel);
    priceChart.data.datasets[0].data.push(price);
    priceChart.update();
}

// Function to update Bitcoin price
async function updateBitcoinPrice() {
    const bitcoinPriceElement = document.getElementById('bitcoin-price');
    const bitcoinPrice = await fetchBitcoinPrice();
    if (bitcoinPrice !== null) {
		let price = parseFloat(bitcoinPrice).toFixed(2);
        bitcoinPriceElement.textContent = `当前价格: $${price}`;
        updateChartData(price);
    } else {
        bitcoinPriceElement.textContent = 'Price: N/A';
    }
}

// Fetch Bitcoin price from Binance API
async function fetchBitcoinPrice() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.price;
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        return null;
    }
}

// Initialize chart
initializeChart();

// 更新比特币价格初始值
updateBitcoinPrice();

// Update price every minute
setInterval(updateBitcoinPrice, 5000);

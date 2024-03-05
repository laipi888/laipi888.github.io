const btcPriceElement = document.getElementById('btc-price');
const updateBtn = document.getElementById('update-btn');
const ctx = document.getElementById('priceChart').getContext('2d');

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Bitcoin Price',
      data: [],
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    }
  }
});

async function fetchBitcoinPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    const price = data.bitcoin.usd;
    return price;
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return null;
  }
}

function updateBitcoinPrice() {
  fetchBitcoinPrice()
    .then(price => {
      if (price !== null) {
        const timestamp = new Date().toLocaleTimeString();
        btcPriceElement.textContent = `$${price}`;

        // Update chart
        if (chart.data.labels.length >= 30) {
          chart.data.labels.shift();
          chart.data.datasets[0].data.shift();
        }
        chart.data.labels.push(timestamp);
        chart.data.datasets[0].data.push(price);
        chart.update();
      } else {
        btcPriceElement.textContent = 'Updates are too frequent, please try again later';
      }
    });
}

updateBitcoinPrice(); // Initial update

// Event listener for update button
updateBtn.addEventListener('click', updateBitcoinPrice);

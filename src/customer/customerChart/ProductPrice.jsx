import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ProductPrice = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to generate random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/chart/product/details')
      .then(response => {
        const products = response.data;
        const labels = products.map(product => product.name);
        const data = products.map(product => parseFloat(product.unit_price));
        const backgroundColors = products.map(() => getRandomColor());

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Unit Price',
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 1,
            }
          ]
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Product Unit Prices'
            }
          }
        }}
      />
    </div>
  );
};

export default ProductPrice;

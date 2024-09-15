import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Container, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';


// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Analytics() {
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    const fetchUrlData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Fetch all URL analytics data or top-clicked URLs data
        const response = await axios.get('https://urlshortener-backend-lja7.onrender.com/api/url/clicked-urls', 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUrlData(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchUrlData();
  }, []);

  // Prepare data for Chart.js
  const chartData = {
    labels: urlData.map((data) => data.shortUrl), // X-axis labels
    datasets: [
      {
        label: 'Clicks',
        data: urlData.map((data) => data.clicked), // Data for the bar chart
        backgroundColor: 'rgba(136, 134, 216, 0.6)', // Bar color
        borderColor: 'rgba(136, 134, 216, 1)', // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Clicked: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Short URL',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Clicks',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">URL Shortener Analytics</Card.Title>
          <Bar data={chartData} options={options} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Analytics;

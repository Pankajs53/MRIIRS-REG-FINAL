import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { apiStart } from '../const';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const UsersGraph = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [dailyUsers, setDailyUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartRef = useRef(null); 

  useEffect(() => {
    fetchTotalUsers();
    fetchDailyUsers();

    // Cleanup chart instance on unmount
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${apiStart}/api/v1/admin/totalUsers`);
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  const fetchDailyUsers = async () => {
    try {
      const response = await axios.get('https://mriirs-reg-portal.onrender.com/api/v1/admin/dailyUsers');
      const dailyUserCounts = response.data.dailyUsers.map((entry) => ({
        date: entry._id,
        count: entry.count,
      }));
      setDailyUsers(dailyUserCounts);
    } catch (error) {
      console.error('Error fetching daily users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the chart
  const chartData = {
    labels: dailyUsers.map((entry) => entry.date),
    datasets: [
      {
        label: 'Daily User Count',
        data: dailyUsers.map((entry) => entry.count),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'User Count',
        },
        beginAtZero: true,
      },
    },
  };

  // Function to update chart data
  const updateChart = () => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.data = chartData;
      chartRef.current.chartInstance.options = chartOptions;
      chartRef.current.chartInstance.update();
    }
  };

  useEffect(() => {
    // On initial render and data change, update the chart
    updateChart();
  }, [dailyUsers]); // Update chart when dailyUsers change

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">User Statistics</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Daily User Count</h2>
          {loading ? (
            <p>Loading...</p>
          ) : dailyUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="w-full" style={{ position: 'relative', height: '400px' }}>
                <Line ref={chartRef} data={chartData} options={chartOptions} />
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersGraph;

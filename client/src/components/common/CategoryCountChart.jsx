import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { apiStart } from '../../const';

const CategoryCountChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await axios.get(`${apiStart}/api/v1/admin/categorycount`);
        const data = response.data;

        // Extracting data for chart
        const categories = Object.keys(data);
        const counts = Object.values(data);

        // Building chart data
        setChartData({
          labels: categories,
          datasets: [
            {
              label: 'Category Counts',
              data: counts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
              ],
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Category Counts Chart</h1>
      <div className="mb-4">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Count'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Category'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default CategoryCountChart;

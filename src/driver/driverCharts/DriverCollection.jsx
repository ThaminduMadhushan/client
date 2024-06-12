import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/auth/authenticated",
          { withCredentials: true }
        );
        if (res.data.authenticated) {
          const userId = res.data.user.id;
          await driverId(userId);
        } else {
          // Handle authentication failure
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error
      }
    };
    const driverId = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/driver/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch driver id");
        }
        const data = await response.json();
        fetchData(data.driver_id);
      } catch (error) {
        console.error("Error fetching driver id:", error);
        // Handle error
      }
    };

    const fetchData = async (userId) => {
      // Pass userId as a parameter
      try {
        const response = await fetch(
          `http://localhost:3001/api/chart/driver/bin/collection/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch collections data");
        }
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCollections([]); // Set collections to empty array in case of error
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Update the chart whenever collections data changes
    updateChart();
  }, [collections]);

  const updateChart = () => {
    if (!Array.isArray(collections)) return; // Ensure collections is an array

    const groupedData = collections.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) acc[date] = {};
      const binMaterial = `${curr.bin_name} - ${curr.material_name}`;
      if (!acc[date][binMaterial]) acc[date][binMaterial] = 0;
      acc[date][binMaterial] += curr.quantity;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const datasets = [];
    const binMaterialSet = new Set();

    labels.forEach((date) => {
      Object.keys(groupedData[date]).forEach((binMaterial) =>
        binMaterialSet.add(binMaterial)
      );
    });

    function generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    binMaterialSet.forEach((binMaterial, index) => {
      const data = labels.map((date) => groupedData[date][binMaterial] || 0);
      datasets.push({
        label: binMaterial,
        data,
        backgroundColor: generateRandomColor(),
      });
    });

    setChartData({ labels, datasets });
  };

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Driver Collections per Day",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;


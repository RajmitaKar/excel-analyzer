import React from 'react';
import PropTypes from 'prop-types';
import {
  Bar,
  Line,
  Pie,
  Scatter
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const GraphRenderer = ({ data, xKey, yKey, chartType }) => {
  if (!data || data.length === 0 || !xKey || !yKey || !chartType) {
    return <p>Please upload data and select axes and chart type.</p>;
  }

  const sampleX = data[0][xKey];
  const sampleY = data[0][yKey];

  // Normalize chart type
  const normalizedType = chartType.toLowerCase();

  // Defensive check for scatter chart
  if (
    normalizedType === 'scatter' &&
    (typeof sampleX !== 'number' || typeof sampleY !== 'number')
  ) {
    return <p>Scatter chart requires both axes to be numeric.</p>;
  }

  // Prevent rendering if both axes are categorical
  if (typeof sampleX === 'string' && typeof sampleY === 'string') {
    return <p>Unsupported chart type: both axes are categorical.</p>;
  }

  // Convert labels to strings
  const labels = data.map((row) => String(row[xKey]));

  // Sanitize values
  const values = data.map((row) => {
    const val = row[yKey];
    const num = typeof val === 'string' ? Number(val.trim()) : val;
    return isNaN(num) ? 0 : num;
  });

  // Dynamic pie colors
  const pieColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#C9CBCF', '#8E44AD', '#2ECC71', '#E67E22'
  ];

  // Chart-specific data configs
  const chartConfigs = {
    bar: {
      data: {
        labels,
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: values,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      },
    },
    line: {
      data: {
        labels,
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: values,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: false,
            tension: 0.3,
          },
        ],
      },
    },
    pie: {
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: pieColors.slice(0, values.length),
            borderWidth: 1,
          },
        ],
      },
    },
    scatter: {
      data: {
        datasets: [
          {
            label: `${yKey} vs ${xKey}`,
            data: data.map((row) => ({
              x: typeof row[xKey] === 'string' ? Number(row[xKey].trim()) : row[xKey],
              y: typeof row[yKey] === 'string' ? Number(row[yKey].trim()) : row[yKey],
            })),
            backgroundColor: 'rgba(75,192,192,0.6)',
          },
        ],
      },
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${chartType} Chart` },
    },
  };

  const chartMap = {
    bar: <Bar data={chartConfigs.bar.data} options={chartOptions} />,
    line: <Line data={chartConfigs.line.data} options={chartOptions} />,
    pie: <Pie data={chartConfigs.pie.data} options={chartOptions} />,
    scatter: <Scatter data={chartConfigs.scatter.data} options={chartOptions} />,
  };

  return (
    <div style={{ marginTop: '30px', width: '100%', maxWidth: '700px' }}>
      <h3>Rendered Chart</h3>
      {chartMap[normalizedType] || <p>Unsupported chart type.</p>}
    </div>
  );
};

GraphRenderer.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  chartType: PropTypes.string.isRequired,
};

export default GraphRenderer;
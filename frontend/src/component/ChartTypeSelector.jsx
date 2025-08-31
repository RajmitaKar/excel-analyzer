import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ChartTypeSelector = ({ onChartTypeSelect }) => {
  const [chartType, setChartType] = useState('');

  const handleChange = (e) => {
    const selectedType = e.target.value;
    setChartType(selectedType);
    onChartTypeSelect(selectedType);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Select Chart Type</h3>

      <label htmlFor="chart-type-select">Chart Type:</label>
      <select
        id="chart-type-select"
        value={chartType}
        onChange={handleChange}
        style={{ marginLeft: '10px' }}
      >
        <option value="">--Select Type--</option>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="scatter">Scatter Plot</option>
      </select>
    </div>
  );
};

ChartTypeSelector.propTypes = {
  onChartTypeSelect: PropTypes.func.isRequired,
};

export default ChartTypeSelector;
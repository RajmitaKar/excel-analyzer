import React, { useState } from 'react';
import FileUploader from '../component/FileUploader';
import ChartTypeSelector from '../component/ChartTypeSelector';
import GraphRenderer from '../component/GraphRenderer';

const ExcelAnalyzer = () => {
  const [columns, setColumns] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedAxes, setSelectedAxes] = useState({ x: '', y: '' });
  const [chartType, setChartType] = useState('');

  const handleParsedData = (data) => {
    setExcelData(data);
    if (data.length > 0 && typeof data[0] === 'object') {
      setColumns(Object.keys(data[0]));
    }
  };

  const handleAxisChange = (axis, value) => {
    setSelectedAxes((prev) => ({ ...prev, [axis]: value }));
  };

  const handleResetAxes = () => {
    setSelectedAxes({ x: '', y: '' });
  };

  return (
    <div className="min-h-screen bg-[url('/graph2.jpg')] bg-cover bg-center px-6 py-10">
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-sky-50 to-white shadow-lg rounded-xl p-8">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            📊 Excel Analyzer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload your Excel file and visualize data with interactive charts.
          </p>
        </header>

        {/* File Upload */}
        <section className="mb-10">
          <FileUploader onDataParsed={handleParsedData} />
        </section>

        {/* Axis Selection & Chart */}
        {columns.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Axis Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Axes</h2>
              <div className="space-y-4">
                {/* X-Axis */}
                <div>
                  <label htmlFor="x-axis" className="block text-sm font-medium text-gray-600">
                    X-Axis
                  </label>
                  <select
                    id="x-axis"
                    value={selectedAxes.x}
                    onChange={(e) => handleAxisChange('x', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">--Select Column--</option>
                    {columns
                      .filter((col) => col !== selectedAxes.y)
                      .map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Y-Axis */}
                <div>
                  <label htmlFor="y-axis" className="block text-sm font-medium text-gray-600">
                    Y-Axis
                  </label>
                  <select
                    id="y-axis"
                    value={selectedAxes.y}
                    onChange={(e) => handleAxisChange('y', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">--Select Column--</option>
                    {columns
                      .filter((col) => col !== selectedAxes.x)
                      .map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleResetAxes}
                  className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Reset Axes
                </button>

                {/* Summary */}
                {selectedAxes.x && selectedAxes.y && (
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>X:</strong> {selectedAxes.x} &nbsp;&nbsp;
                    <strong>Y:</strong> {selectedAxes.y}
                  </p>
                )}
              </div>
            </div>

            {/* Chart Type & Graph */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Chart & Visualization</h2>
              <ChartTypeSelector
                selectedType={chartType}
                onChartTypeSelect={(type) => setChartType(type.toLowerCase())}
              />
              <div className="mt-6">
                {chartType ? (
                  <GraphRenderer
                    data={excelData}
                    xKey={selectedAxes.x}
                    yKey={selectedAxes.y}
                    chartType={chartType}
                  />
                ) : (
                  <p className="text-gray-500">Please select a chart type to display the graph.</p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExcelAnalyzer;
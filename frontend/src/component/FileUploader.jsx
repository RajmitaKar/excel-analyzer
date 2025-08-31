import React from 'react';
import ExcelJS from 'exceljs';
import PropTypes from 'prop-types';

const FileUploader = ({ onDataParsed }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const buffer = evt.target.result;
      await parseExcelFile(buffer, onDataParsed);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-pink-500 rounded-xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-4">Upload Excel File</h2>
      <label
        htmlFor="excel-upload"
        className="block text-sm font-medium text-white mb-2"
      >
        Select a .xlsx file
      </label>
      <input
        id="excel-upload"
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100
                   transition duration-150 ease-in-out"
      />
    </div>
  );
};

const parseExcelFile = async (buffer, onDataParsed) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    const jsonData = [];

    let headers = [];

    worksheet.eachRow((row, rowIndex) => {
      const rowValues = row.values.slice(1); // Skip first empty cell
      if (rowIndex === 1) {
        headers = rowValues;
      } else {
        const rowData = {};
        rowValues.forEach((cell, i) => {
          if (headers[i]) {
            rowData[headers[i]] = cell;
          }
        });
        jsonData.push(rowData);
      }
    });

    if (jsonData.length === 0) {
      console.warn("No data found in Excel file");
    }

    onDataParsed(jsonData);
  } catch (err) {
    console.error("Error parsing Excel file:", err);
  }
};

FileUploader.propTypes = {
  onDataParsed: PropTypes.func.isRequired,
};

export default FileUploader;
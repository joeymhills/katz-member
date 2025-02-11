import './App.css'
import './styles/fonts.css';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

type Row = {
  [key: string]: string;
};

const App: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const [tabs, setTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('Publications');

  // Load the CSV data on component mount
  useEffect(() => {
    // Fetch and parse the CSV file
    fetch('/data.csv')  // Path to your static CSV file
      .then(response => response.text())
      .then(csvData => {
        const result = Papa.parse(csvData, { header: true, skipEmptyLines: true });
        
        // Log the result to ensure it's being parsed correctly
        console.log('Parsed CSV:', result);

        // Handle parsing result and organize the data
        const parsedData = result.data as Row[];

        // If parsing is successful, log and proceed
        if (parsedData.length > 0) {
          console.log('Parsed Data:', parsedData);
          
          // Get the column headers (excluding the 'Name' column) to determine the tabs
          const columnNames = Object.keys(parsedData[0]);
          console.log('Column Names:', columnNames);

          // Exclude 'Name' from tabs and set the rest as tabs
          setTabs(columnNames.slice(1));

          // Set the parsed data
          setData(parsedData);

          // Set default selected tab to the first column header (except 'Name')
          setSelectedTab(columnNames[1] || '');
        } else {
          console.log('No data found');
        }
      })
      .catch(error => {
        console.error('Error reading CSV file:', error);
      });
  }, []);

  // Handle tab selection
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  // Get the rows for the selected tab
  const selectedRows = data.filter(row => row[selectedTab]);

  return (
    <>
    <div className="w-full absolute left-0 top-0 h-24 bg-[#1e55a9] z-50">
      <img src="logo.svg" className="p-4 max-w-40"/>
    </div>

    <div className="w-[305px] xs:w-[418px] sm:w-[575px] md:w-[700px] lg:w-[900px] mx-auto">
      <p style={{ fontFamily: "GalaxiePolaris"}} className='text-[#1e55a9] text-[25px] xs:text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px] font-bold pt-24'>Member Achievements</p>
      <p style={{ fontFamily: "GalaxieCopernicus"}} className='py-2 sm:py-7 pb-12 text-[8px] xs:text-[10px] sm:text-[12px] md:text-[14px] lg:text-[20px] font-bold'>Our members are recognized experts across the health care industry and beyond. We’re proud of the academic
      contributions of the people who make up the Katz Institute. Below are selected honors from those members.</p>
    </div>

    <div className="w-[305px] xs:w-[418px] sm:w-[575px] md:w-[700px] lg:w-[900px] mx-auto">
      {/* Tab Buttons */}
      <div className="flex flex-row items-center justify-stretch gap-[1px] mb-[1px]">
        {tabs.length > 0 ? (
          tabs.map((tab) => (
            <button
              style={{ fontFamily: "GalaxiePolaris"}}
              key={tab}
              className={`flex flex-row w-full items-center justify-center font-bold text-white text-[5px] xs:text-[7px] sm:text-[10px] lg:text-sm ${selectedTab === tab ? 'bg-[#359dde]' : 'bg-[#add7f2]'}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))
        ) : (
          null
        )}
      </div>

      {/* Table */}
      <div>
        {selectedRows.length > 0 ? (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className='bg-[#1e55a9] border text-black'>
                <th style={{ fontFamily: "GalaxiePolaris"}} className="border text-[6px] xs:text-[8px] sm:text-[12px] lg:text-sm w-52 px-4 py-1 sm:py-2"><div className='text-white'>Member Name</div></th>
                <th style={{ fontFamily: "GalaxiePolaris"}} className="border text-[6px] xs:text-[8px] sm:text-[12px] lg:text-sm px-2 py-1 sm:py-2"><div className='text-white'>{selectedTab}</div></th>
              </tr>
            </thead>
            <tbody>
              {selectedRows.map((row, index) => (
                <tr className='text-sm text-start' key={index}>
                  <td style={{ fontFamily: "GalaxieCopernicus"}} className="border text-[6px] xs:text-[8px] sm:text-[12px] lg:text-sm text-left align-top font-bold px-2 py-2">
                    {row.Name}
                  </td>
                  <td style={{ fontFamily: "GalaxieCopernicus"}} className="border text-[6px] xs:text-[8px] sm:text-[12px] lg:text-sm text-sm px-2 py-2" dangerouslySetInnerHTML={{ __html: row[selectedTab]?.replace(/\n/g, '<br />') }} />
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for this tab.</p>
        )}
      </div>
    </div>
</>
  );
};

export default App;

import React, { useState } from 'react';

function DataFilter() {
  // State to hold your data and the filtered data
  const [data, setData] = useState([
    "spray",
    "limit",
    "elite",
    "exuberant",
    "destruction",
    "present",
  ]);

  



  

  return (
    <div>
      <input
        type="text"
        placeholder="Filter data"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFilter;

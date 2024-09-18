import React from 'react';

function PageSizeSetter({ setPageSize, totalRecord, pageSize, setPageNumber }) {
  
  return (
    <select
      className="form-select"
      id="floatingSelect"
      aria-label="Floating label select example"
      onChange={(e) => {
        const newSize = Number(e.target.value); // Ensure value is treated as a number
        setPageSize(newSize);
        setPageNumber(0); // Reset to first page when page size changes
        console.log("totalRecord========" + totalRecord);
        // Calculate and update total pages if needed
        // setTotalPages(Math.ceil(totalRecord / newSize)); 
      }}
      value={pageSize} // Ensure the selected value matches pageSize
    >
      <option value="" disabled>Select Page Size</option> {/* Placeholder option */}
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
  );
}

export default PageSizeSetter;

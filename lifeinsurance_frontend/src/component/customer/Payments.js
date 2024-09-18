import React from 'react';
import Table from '../shared/table/Table';

function Payments({ data }) {
  // Log data to check if it's being passed correctly
  console.log("Payments component data:", data);

  // Check if data is an array and has elements
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className='text-center fw-bold text-danger fs-1'>
        No Payments Found
      </div>
    );
  }

  return (
    <div className='row'>
      <div className='col-8 offset-2'>
        <Table data={data} />
      </div>
    </div>
  );
}

export default Payments;

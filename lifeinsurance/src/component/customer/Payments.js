import React, { useEffect, useState } from 'react';
import Table from '../shared/table/Table';
import { successAlet, warningAlert } from '../alerts/Alert';

function Payments(data) {
  
  console.log("data value is  99999999 ",data)
{}


  return (
    <>
      <div className='row'>
        <div className='col-8 offset-2'>
          <Table
            data={data.data}
          ></Table>
          
        </div>
      </div>
    </>
  );
}

export default Payments;

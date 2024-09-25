import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationApp = ({ totalpage, setpage, pageNumber }) => {
  const [active, setActive] = useState(pageNumber + 1);

  const handlePrevClick = () => {
    if (active > 1) {
      setpage(active - 2);
      setActive(active - 1);
    }
  };

  const handleNextClick = () => {
    if (active < totalpage) {
      setpage(active);
      setActive(active + 1);
    }
  };

  const handleLastPageClick = () => {
    setpage(totalpage - 1);
    setActive(totalpage);
  };

  const items = [];

  // Previous button
  items.push(
    <Pagination.Prev
      key="prev-button" // Unique key
      onClick={handlePrevClick}
      disabled={active === 1}
      style={{
        margin: '0 5px',
        fontWeight: 'bold',
        color: active === 1 ? 'gray' : '#007bff',
        cursor: active === 1 ? 'not-allowed' : 'pointer',
      }}
    />
  );

  // Page number buttons
  for (let number = 1; number <= totalpage; number++) {
    items.push(
      <Pagination.Item
        key={`page-${number}`} // Unique key for each page number
        active={number === active}
        onClick={() => {
          setpage(number - 1);
          setActive(number);
        }}
        style={{
          margin: '0 5px',
          fontWeight: number === active ? 'bold' : 'normal',
          backgroundColor: number === active ? '#007bff' : 'transparent',
          color: number === active ? 'white' : 'black',
          border: '1px solid #ccc',
          transition: 'background-color 0.2s, color 0.2s',
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Next button
  items.push(
    <Pagination.Next
      key="next-button" // Unique key
      onClick={handleNextClick}
      disabled={active === totalpage}
      style={{
        margin: '0 5px',
        fontWeight: 'bold',
        color: active === totalpage ? 'gray' : '#007bff',
        cursor: active === totalpage ? 'not-allowed' : 'pointer',
      }}
    />
  );

  // Last page button
  items.push(
    <Pagination.Item
      key="last-button" // Unique key
      onClick={handleLastPageClick}
      style={{
        margin: '0 5px',
        fontWeight: 'bold',
        backgroundColor: active === totalpage ? '#007bff' : 'transparent',
        color: active === totalpage ? 'white' : '#007bff',
        border: '1px solid #ccc',
      }}
    >
      Last
    </Pagination.Item>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default PaginationApp;

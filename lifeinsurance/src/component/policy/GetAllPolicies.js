import React, { useState, useEffect } from 'react';

function GetAllPolicies() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [data, setData] = useState([]);

  const GetPolicies = async () => {
    try {
      let response = await AllPolicies(pageNumber, pageSize);
      console.log("policies are ------------>", response);
      console.log("Response data content:", response.data.content);
      setData(response.data.content || []); // Default to an empty array if content is undefined
    } catch (error) {
      console.error("Failed to fetch policies:", error);
      setData([]); // Handle error by setting data to an empty array
    }
  };

  useEffect(() => {
    GetPolicies();
  }, [pageNumber, pageSize]);

  return (
    <div>get all policies</div>
  );
}

export default GetAllPolicies;

import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import { getAllCustomer } from "../../services/customer/CustomerService";
import Table from "../shared/table/Table";
import PaginationApp from "../shared/page/PaginationApp";
import PageSelect from "../shared/page/PageSizeSetter";

const GetCustomers = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCustomerData = async () => {
    try {
      let response = await getAllCustomer(pageNumber, pageSize);
      setData(response.data.content);
      setTotalPages(
        Math.ceil(parseInt(response.headers["customer-count"]) / pageSize)
      );
      setTotalElements(
        Math.ceil(parseInt(response.headers["customer-count"]) / pageSize)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomerData();
  }, [pageNumber, pageSize]);

  // Filtering the customer data based on search term
  const filteredData = data.filter(customer => 
    (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (customer.id && customer.id.toString().includes(searchTerm))
  );

  return (
    <>
      <Navbar />
      <div className="bg-warning text-center display-3 py-3 text-dark fw-bold">
        Customers
      </div>
      <div className="container">
        <div className="row my-5">
          <div className="col-4">
            <PaginationApp
              totalpage={totalPages}
              setpage={setPageNumber}
              pageNumber={pageNumber}
            />
          </div>

          <div className="col-4">
            <input
              className="rounded-pill px-3 text-primary fw-bold"
              placeholder="Search by ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-2 offset-2">
            <PageSelect
              setPageSize={setPageSize}
              setTotalpage={setTotalPages}
              totalrecord={totalElements}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Table data={filteredData} canViewMore={true} />
          </div>
        </div>
      </div>
      {filteredData.length === 0 ? (
        <div className="text-center fw-bold text-danger fs-1">
          No Customer Found
        </div>
      ) : null}

      <Footer />
    </>
  );
};

export default GetCustomers;

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { getAllCustomer } from '../../services/customer/CustomerService';
import Table from '../shared/table/Table';
import PaginationApp from '../shared/page/PaginationApp';
import PageSelect from '../shared/page/PageSizeSetter';

const GetAllCustomers = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [totalPages, setTotalPages] = useState();
    const [totalElements, setTotalElements] = useState();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const getCustomerData = async () => {
        try {
            let response = await getAllCustomer(pageNumber, pageSize, searchQuery);
            setData(response.data.content);
            setTotalPages(Math.ceil(parseInt(response.headers['customer-count']) / pageSize));
            setTotalElements(parseInt(response.headers['customer-count']));
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    useEffect(() => {
        getCustomerData();
    }, [pageNumber, pageSize, searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPageNumber(0); // Reset to the first page when searching
    };

    // Remove username from data before passing to Table
    const filteredData = data.map(({ username, ...rest }) => rest);

    return (
        <>
            <Navbar />
            <div className='bg-warning text-center display-3 py-3 text-dark fw-bold'>Customers</div>
            <div className='container'>

                <div className='row my-5'>
                    <div className='col-4'>
                        <PaginationApp
                            totalPages={totalPages}
                            pageSize={pageSize}
                            setPageNumber={setPageNumber}
                            pageNumber={pageNumber}
                        />
                    </div>

                    <div className='col-4'>
                        <input
                            className='rounded-pill px-3 text-primary fw-bold'
                            placeholder='Search by ID or Name'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    
                    <div className='col-2 offset-2'>
                        <PageSelect
                            totalElements={totalElements}
                            setPageSize={setPageSize}
                            setPageNumber={setPageNumber}
                            setTotalPages={setTotalPages}
                            pageSize={pageSize}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12'>
                        <Table data={filteredData} canViewMore={true} />
                    </div>
                </div>

            </div>
            {filteredData.length === 0 && (
                <div className='text-center fw-bold text-danger fs-1'>No Customer Found</div>
            )}

            <Footer />
        </>
    );
}

export default GetAllCustomers;

import React from 'react'
import Navbar from '../shared/navbar/Navbar'
import Footer from '../shared/footer/Footer'

const Claims = () => {
    return (
        <div>

            <Navbar></Navbar>
            <div className='background2 text-center display-3 py-3 text-white fw-bold'>All Claims</div>
            <div className='text-center display-3 py-3 text-danger fw-bold'>No Claims Found</div>
            <Footer></Footer>
        </div>
    )
}

export default Claims
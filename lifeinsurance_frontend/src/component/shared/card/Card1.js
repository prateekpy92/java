import React from 'react'

import slider2 from '../../../images/silder2.jpg'
import growthpic from '../../../images/Screenshot from 2023-11-24 09-33-37.png'
import familypic from '../../../images/slider3.webp'

const Card1 = () => {
    return (
        <div>
            <div class="container">
                <section class="mx-auto my-5" style={{ maxWidth: "23rem" }}>

                    <div class="card">
                        <div class="card-body d-flex flex-row">

                            <div>
                                <h5 class="card-title font-weight-bold mb-2 text-center">Growth Plan</h5>

                            </div>
                        </div>
                        <div class="bg-image hover-overlay ripple rounded-0" data-mdb-ripple-color="light">
                            <img class="img-fluid" className='img-fluid' src={

                                growthpic
                            }
                                alt="Card image cap" height={400} width={300} />
                            <a href="#!">
                                <div class="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                            </a>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <a class="btn btn-link link-danger p-md-1 my-1" data-mdb-toggle="collapse" href="#collapseContent"
                                    role="button" aria-expanded="false" aria-controls="collapseContent">know more</a>
                                <div>
                                    <i class="fas fa-share-alt text-muted p-md-1 my-1 me-2" data-mdb-toggle="tooltip"
                                        data-mdb-placement="top" title="Share this post"></i>
                                    <i class="fas fa-heart text-muted p-md-1 my-1 me-0" data-mdb-toggle="tooltip" data-mdb-placement="top"
                                        title="I like it"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
}

export default Card1
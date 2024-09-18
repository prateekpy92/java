import React from 'react'
import familypic from '../../../images/slider3.webp'

const Card2 = () => {
    return (
        <div>
            <div class="container">
                <section class="mx-auto my-5" style={{ maxWidth: "23rem" }}>

                    <div class="card">
                        <div class="card-body d-flex flex-row">

                            <div>
                                <h5 class="card-title font-weight-bold mb-2 text-center">Protection Plan</h5>

                            </div>
                        </div>
                        <div class="bg-image hover-overlay ripple rounded-1" data-mdb-ripple-color="light">
                            <img className='img-fluid' src={

                               familypic
                            }
                                alt="Card image cap" height={400} width={325}/>
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

export default Card2
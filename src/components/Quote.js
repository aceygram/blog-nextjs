export default function Quote() {
    return (
        <div className="container-fluid quote-section row m-0 section-primary">
            <div id="carouselExampleControls" className="carousel slide carousel-fade col-lg-6 col-md-12" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/speak-up-5.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/speak-up-2.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/speak-up-3.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/speak-up-4.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/speak-up-1.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/speak-up-6.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="quote col-lg-6 col-md-12 align-self-center d-flex flex-column justify-content-center ps-5">
                <div className="img-container align-self-center">
                    <img src="images/quote-secondary.svg" alt="" />
                </div>
                <div className="support-text">
                    "The most common way people give up their power is by thinking they don't have any." <span>— Alice Walker</span>
                </div>
            </div>
        </div>
    )
}
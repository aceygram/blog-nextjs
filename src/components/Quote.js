import Image from 'next/image';

export default function Quote() {
    return (
        <div className="container-fluid quote-section row m-0 section-primary justify-content-center justify-content-lg-start gap-5 gap-lg-0">
            <div id="carouselExampleControls" className="carousel slide carousel-fade col-lg-6 col-md-12" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Image 
                            src="/images/speak-up-5.jpg" 
                            className="d-block w-100" 
                            alt="Speaking up for justice" 
                            width={800}
                            height={600}
                            priority
                        />
                    </div>
                    <div className="carousel-item">
                        <Image 
                            src="/images/speak-up-2.jpg" 
                            className="d-block w-100" 
                            alt="Political commentary" 
                            width={800}
                            height={600}
                        />
                    </div>
                    <div className="carousel-item">
                        <Image 
                            src="/images/speak-up-3.jpg" 
                            className="d-block w-100" 
                            alt="Social activism" 
                            width={800}
                            height={600}
                        />
                    </div>
                    <div className="carousel-item">
                        <Image 
                            src="/images/speak-up-4.jpg" 
                            className="d-block w-100" 
                            alt="Public speaking" 
                            width={800}
                            height={600}
                        />
                    </div>
                    <div className="carousel-item">
                        <Image 
                            src="/images/speak-up-1.jpg" 
                            className="d-block w-100" 
                            alt="Political analysis" 
                            width={800}
                            height={600}
                        />
                    </div>
                    <div className="carousel-item">
                        <Image 
                            src="/images/speak-up-6.jpg" 
                            className="d-block w-100" 
                            alt="Community engagement" 
                            width={800}
                            height={600}
                        />
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
            <div className="quote col-lg-6 col-md-12 align-self-center d-flex flex-column justify-content-center justify-content-lg-start p-2 ps-lg-5">
                <div className="img-container align-self-center ps-lg-5">
                    <Image 
                        src="/images/quote-secondary.svg" 
                        alt="Quote icon" 
                        width={100}
                        height={100}
                    />
                </div>
                <div className="support-text align-self-center align-self-lg-start text-center">
                    &quot;The most common way people give up their power is by thinking they don&apos;t have any.&quot; <span>&mdash; Alice Walker</span>
                </div>
            </div>
        </div>
    )
}
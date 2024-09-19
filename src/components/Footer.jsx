import { Link } from 'react-router-dom'

function Footer(props) {
    return (
        <div>
            <footer className="text-center text-lg-start text-muted footer container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            <i className="fas fa-gem me-3"></i>Mewar Gallery
                        </h6>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam fuga rem eveniet rerum pariatur fugit voluptatibus maiores officia necessitatibus quaerat.
                        </p>
                    </div>
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Important Links
                        </h6>
                        <p>
                            <Link className='hyper-links' to="/" target='_blank'>XYZ</Link>
                        </p>
                        <p>
                            <Link className='hyper-links' to="/" target='_blank'>ABC</Link>
                        </p>
                        <p>
                            <Link className='hyper-links' to="/" target='_blank'>123</Link>
                        </p>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Important Links
                        </h6>
                        <p>
                            <a className='hyper-links' href="/" target='_blank'>Instagram Profile</a>
                        </p>
                        <p>
                            <a className='hyper-links' href="/" target='_blank'>Youtube Channel</a>
                        </p>
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i className="fas fa-home me-3"></i> India, Mathura 281200, Uttar Pradesh</p>
                        <p>
                            <i className="fas fa-envelope me-3"></i>
                            kumarakash@91384@gmail.com
                        </p>
                        <p><i className="fas fa-phone me-3"></i> +91 9528346969</p>
                        <p><i className="fas fa-print me-3"></i> +91 6202638080</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer

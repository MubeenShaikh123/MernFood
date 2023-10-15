import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <Link to="#" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <img className='rounded ms-3 ' id='logo' src={require('../../images/logo.jpg')} alt="Logo" />
                    </Link>
                    <span className="mb-3 mb-md-0 text-muted">© 2023 Company, Inc</span>
                    <span className='position-absolute' style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}>
                        <i class="fa fa-brands fa-instagram fa-lg p-1 ps-2 pe-2"></i>
                        <i class="fa text-black  fa-brands fa-facebook p-1 ps-2 pe-2"></i>
                    </span>
                </div>
            </footer>
        </div>
    )
}

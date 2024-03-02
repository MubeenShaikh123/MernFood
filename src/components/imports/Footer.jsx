import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-4 py-sm-3 my-4">
                {/* <div className="col-md-4 d-flex align-items-center"> */}
                    <span className="col-12 col-md-4 pb-1 pt-1">
                    <Link to="#" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <img className='rounded ms-3 ' id='logo' src={require('../../images/logo.jpg')} alt="Logo" />
                    </Link>
                        © 2023 Company, Inc
                        </span>
                    <span className='col-12 col-md-4 pb-1 pt-1 d-flex justify-content-center '>
                        <a href="https://instagram.com/__mubeen_shaikh?igshid=OGQ5ZDc2ODk2ZA==0" target='_blank' rel='noreferrer'>
                            <i className="fa fa-brands fa-instagram fa-lg p-1 ps-2 pe-2 insta-logo"></i>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100048574524041&mibextid=ZbWKwL" target='_blank' rel='noreferrer'>
                            <i className="fa fa-brands fa-facebook p-1 ps-2 pe-2 facebook-logo"></i>
                        </a>
                        <a href="https://github.com/MubeenShaikh123" target="_blank" rel="noreferrer">
                            <i className="fa fa-brands fa-github p-1 ps-2 pe-2 github-logo"></i>
                        </a>
                    </span>
                    <span className='col-12 col-md-4'>

                    </span>
            </footer>
        </div>
    )
}

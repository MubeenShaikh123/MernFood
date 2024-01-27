import { Link } from 'react-router-dom'
import { search } from '../../redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import NavLoggedIn from './Navbar/NavLoggedIn'
import NavLoggedOut from './Navbar/NavLoggedOut'

export default function Header() {
  let isLoggedIn = useSelector((state) => state.cart.isLoggedIn)
  const dispatch = useDispatch()

  return (
    <div className='header'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#"><img src={require('../../images/logo.jpg')} alt="Logo" id='logo' /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='#'>Home</Link>
              </li>
              {
                isLoggedIn ? <NavLoggedIn /> : <NavLoggedOut />
              }
            </ul>
            <div className="d-flex d-sm-none " role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                onChange={(e) => {
                  const temp = e.target.value;
                  dispatch(search(temp))
                }} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

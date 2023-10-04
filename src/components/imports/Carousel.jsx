import React from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../redux/reducer'

export default function Carousel() {
  const dispatch = useDispatch()
  return (
    <div className="myCarousel">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?burger"
              alt=""
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/900x700/?pizza"
              alt=""
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="carousel-caption d-none d-lg-block mb-3 ">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
          onChange={(e) => {
            const temp = e.target.value;
            dispatch(search(temp))
          }} />
      </div>
    </div>
  );
}

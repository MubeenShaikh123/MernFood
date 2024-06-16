import React from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../redux/reducer'
import imgsrc1 from '../../images/amirali-mirhashemian-ZSukCSw5VV4-unsplash.jpg'
import imgsrc2 from '../../images/ivan-torres-MQUqbmszGGM-unsplash.jpg'
import imgsrc3 from '../../images/robin-stickel-tzl1UCXg5Es-unsplash.jpg'

export default function Carousel() {
  const dispatch = useDispatch()
  return (
    <div className="myCarousel position-relative ">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src={imgsrc1}
              alt=""
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={imgsrc2}
              alt=""
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src={imgsrc3}
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
      <div className="carousel-caption d-none d-sm-block "
      style={{
          position: 'absolute',
          bottom: '2%',
          left: '50%',
          transform: 'translateX(-50%)',
          minWidth:'300px'
        }}
      >
        <input className="form-control me-2" 
        // style={{
        //   position: 'absolute',
        //   bottom: '1rem',
        //   left: '50%',
        //   transform: 'translateX(-50%)',
        // }}
         type="search" placeholder="Search" aria-label="Search"
          onChange={(e) => {
            const temp = e.target.value;
            dispatch(search(temp))
          }} />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './cards/Card'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Carousel from './Carousel';
import { addItemToCart } from '../../redux/reducer';
import Swal from 'sweetalert2';


export default function Body() {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.cart.email) || "MiyaBhai"
  const searchText = useSelector((state) => state.cart.searchText)
  const [foodItem, setFoodItem] = useState([])
  const [foodCat, setFoodCat] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('x-access-token');
    if (!token) {
      console.error('No JWT token found in localStorage');
    }
    // Make an HTTP GET request to server's endpoint
    axios.get('https://mernfoodserver.onrender.com/api/foodItem', {
      headers: {
        'x-access-token': token
      }
    })
      .then((response) => {
        setFoodItem(response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error Connecting With Server',
          icon: 'error',
          showConfirmButton: false,
          timer: 1200
        })
      });
    axios.get('https://mernfoodserver.onrender.com/api/foodCategory', {
      headers: {
        'x-access-token': token
      }
    })
      .then((response) => {
        setFoodCat(response.data);
      })
      .catch((error) => {
      });
    axios.get(`https://mernfoodserver.onrender.com/api/storedata?username=${username}`, {
      headers: {
        'x-access-token': token
      }
    })
      .then((response) => {
        const storedata = response.data[0].cartData;
        storedata.forEach((item, index) => (
          dispatch(
            addItemToCart({
              name: item.name,
              qty: item.qty,
              size: item.size,
              finalPrice: item.finalPrice
            })
          )
        ))
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Carousel></Carousel>
      <div className='container'>
        {foodCat.map((category) => (
          <div key={category._id}>
            <h1>{category.CategoryName}</h1>
            <hr className='hr' />
            <div className='row'>
              {foodItem
                .filter(
                  (item) =>
                    category.CategoryName === item.CategoryName &&
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((foodItem) => (
                  <div key={foodItem._id} className='col-12 col-lg-4 col-md-6 col-sm-12'>
                    <Card cardData={foodItem}></Card>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

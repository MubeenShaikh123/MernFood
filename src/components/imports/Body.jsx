import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './cards/Card'
import { useSelector } from 'react-redux/es/exports';
import Carousel from './Carousel';


export default function Body() {

  const searchText = useSelector((state) => state.cart.searchText)
  const [foodItem, setFoodItem] = useState([])
  const [foodCat, setFoodCat] = useState([])

  useEffect(() => {
    // Make an HTTP GET request to server's endpoint
    axios.get('http://localhost:4000/api/foodItem')
      .then((response) => {
        setFoodItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('http://localhost:4000/api/foodCategory')
      .then((response) => {
        setFoodCat(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <>
        <Carousel></Carousel>
      <div className='container'>
        {foodCat.map((category) => (
          <div key={category._id}>
            <h1>{category.CategoryName}</h1>
            <hr />
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

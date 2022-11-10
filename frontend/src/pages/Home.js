/* eslint-disable */
import axios from "../axios"
import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import categories from "../categories"
import "../styles/Home.css"
import { useDispatch, useSelector } from "react-redux"
import { updateProducts } from "../features/productSlice"
import ProductPreview from "../components/ProductPreview"
import banner from "../assets/banner.png"

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const lastProducts = products.slice(0, 8)
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)))
  }, [])
  return (
    <div className='main-container'>
      {/* image banner */}
      <img src={banner} className='home-banner' />
      <div className='featured-products-container container mt-4'>
        <h2>Last products</h2>
        {/* last products here */}
        <div className='d-flex justify-content-center flex-wrap'>
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link
            to='/category/all'
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      {/* sale banner */}
      <div className='sale__banner--container mt-4'>
        <img src='https://images.unsplash.com/photo-1531303435785-3853ba035cda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />
      </div>
      <div className='recent-products-container container mt-4'>
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className='category-tile'
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Home

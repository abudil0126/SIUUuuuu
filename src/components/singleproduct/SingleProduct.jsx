import React from 'react'
import './SingleProduct.css'
import { Container } from '../../utils'
import { useState, useEffect } from 'react'
import { instance } from '../../api'
import { useParams } from 'react-router-dom'
import { truncate } from '../../helpers/truncate'

const SingleProduct = () => {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const {id} = useParams()

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await instance.get(`/api/posts/${id}`)
        setPost(response.data)
        setLoading(false)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData()
    
  }, [])

  return (
    <Container>
      <div className='single-product'>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        post && (
          <div className='single-product__wp'>
            <h1 className='single-product__h1'>{post.title}</h1>
            <img src={post.image} className="single-product__image" alt="" />
            <p className='single-product__p'>{post.description}</p>
          </div>
        )
      )

      }
      </div>
    </Container>
  )
}

export default SingleProduct
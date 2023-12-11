import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Container } from '../../utils'
import './Home.css'
import Header from '../../images/Header.jpg'
import useFetch from '../../helpers/hooks/useFetch'
import { truncate } from '../../helpers/truncate'

const Home = () => {
   const [loading, setLoading] = useState(true)


   const result = useFetch("/api/posts")
   console.log(result)

   return (
      <Container>
         <header>
            <img className='header__img' src={Header} alt="" />
         </header>
         <h2 className='header__h2'>All articles</h2>
         <div className='posts__wp'>

            {
               result && result.map((post) => (
                  <Link className='post__card' to={`singleproduct/${post._id}`} key={post._id}>
                     <img className='post__image' src={post.image} alt="" />
                     <h3 className='post__h3'>{truncate(post.title, 30)}</h3>
                     <p className='post__desctiption'>{truncate(post.description, 80)}</p>
                  </Link>
               ))}
         </div>
      </Container>
   )
}

export default Home
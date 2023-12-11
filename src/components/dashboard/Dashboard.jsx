import React from 'react'
import './Dashboard.css'
import { Container } from '../../utils'
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { instance } from "../../api";
import { toast } from 'react-toastify';
import { useState, useEffect, useLayoutEffect } from 'react'


const Dashboard = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

    const handleCreatePost = (e) => {
      e.preventDefault();
      setLoading(true);
      instance.post("/api/posts", {
        title: title,
        image: image,
        description: description,
        category: category
      })
        .then(response => {
          setLoading(false);
          if (response.status === 201) {
            toast.success("You posted successfully");
            console.log(response)
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error)
          toast.error("Who is error?");
        })

    }

    useLayoutEffect(() => {
      instance("/api/categories")
        .then((response) => {
          setCategories(response.data.data);
        }).catch((error) => {
          console.log(error);
        });
    }, [])

    console.log(category)

    useLayoutEffect(() => {

      instance("/api/users/")
        .then((response) => {
          console.log(response.data);
        }).catch((error) => {
          console.log(error);
        });
    }, []);



    return (
      <Container>
        <div className='dashboard__wp'>
          <div className='sidebar'>
            <h1 className='sidebar__h1'>Dashboard</h1>
            <div className='profil__wp'>
              <p className='profil__p'>Abdulloh</p>
              <small className='profil__small'>Author</small>
            </div>
            <button className='sidebar__btn'>
              <NavLink className={({ isActive }) => isActive ? "sidebar__btn sidebar__btn--active" : "sidebar__btn"} to="/">Create Post</NavLink>
            </button>
            <button className='sidebar__btn'>
              <NavLink className={({ isActive }) => isActive ? "sidebar__btn sidebar__btn--active" : "sidebar__btn"} to="/">Manage Posts</NavLink>
            </button>
            <button className='sidebar__btn2' onClick={() => localStorage.clear()}>Sign Out ?</button>
          </div>
          <form className='create-post__form' onSubmit={handleCreatePost}>
            <h1 className='post__h1'>Create New Post</h1>
            <div className='hr'></div>
            <p className='post__p'>Post title</p>
            <input 
            className='post__input' 
            type="text" required 
            value={title} onChange={(e) => setTitle(e.target.value)} />
            <p className='post__p'>Post image</p>
            <div className='post__img-category'>
              <input 
              className='post__input2' 
              type="url" required 
              value={image} onChange={(e) => setImage(e.target.value)} />
              <select 
              className='post__select'
              value={category} onChange={(e) => setCategory(e.target.value)}
              required
              >
                {categories.map((category) => (
                  <option key={category._id}>{category._id}</option>
                ))}
              </select>
            </div>
            <p className='post__p'>Post description</p>
            <textarea 
            className='post__textarea' 
            cols="130" rows="10" required 
            value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button 
            type='submit' 
            className='post__btn' 
            disabled={loading}>
            {loading ? "Creating..." : "Create Post"}</button>
          </form>
        </div>
      </Container>
    )
  }

  export default Dashboard

import { useEffect, useState } from 'react';
import '../App.css'
const Navbar = ({movies,query,setQuery}) => {
  useEffect(function(){
    const el = document.querySelector('.search')
    el.focus()
  },[])
  let length;
  movies === undefined ? length = 0:length = movies.length
  return (
    <nav className='nav-bar'>
        <div className='logo'>
            <span role='img'>🍿</span>
            <h1>usePopcorn</h1>
        </div>
        <input className='search' type="text" placeholder='Search movies...' value={query} onChange={(e)=>setQuery(e.target.value)}/>
        <p className='num-results'>Found <strong>{length}</strong> results</p>
    </nav>
  )
}

export default Navbar
import { useEffect, useRef, useState } from 'react';
import '../App.css'
const Navbar = ({movies,query,setQuery}) => {
  const searchEl = useRef(null)

  useEffect(function(){
    function callback(e){
      if(document.activeElement === searchEl.current) return;
      if(e.code === 'Enter'){
        searchEl.current.focus()
        setQuery('')
      }
    }
    document.addEventListener('keydown',callback)
    return ()=> document.removeEventListener('keydown',callback)
  },[]) 

  let length;
  movies === undefined ? length = 0:length = movies.length
  return (
    <nav className='nav-bar'>
        <div className='logo'>
            <span role='img'>🍿</span>
            <h1>usePopcorn</h1>
        </div>
        <input className='search' type="text" placeholder='Search movies...' value={query} onChange={(e)=>setQuery(e.target.value)} ref={searchEl}/>
        <p className='num-results'>Found <strong>{length}</strong> results</p>
    </nav>
  )
}

export default Navbar
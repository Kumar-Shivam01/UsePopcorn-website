import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import StarRating from './components/StarRating.jsx'

// function Test(){
//   const [movieRating,setMovieRating] = useState(0);
//   return(
//     <div>
//       <StarRating color='blue' maxRating={10} onSetRating={setMovieRating}/>
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   )
// }
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <StarRating maxRating={5} className='test' messages={["Terrible","Bad","Okay","Good","Amazing"]}/>
    <StarRating size={24} color='red' className='test' defaultRating={3}/>
    <Test/> */}
    <App/>
  </StrictMode>,
)

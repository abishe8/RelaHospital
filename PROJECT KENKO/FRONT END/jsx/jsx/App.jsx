import React from 'react'
import Inerface from './component/Interface'
import Register from './component/Register'
import Steps from './component/Steps'
import { BrowserRouter , Routes , Route } from "react-router-dom"
import RotateLoader from './component/Rotateloader'
import Spinner from "./component/Spinner"
import Final from './component/Final'
import CompletedShow from './component/CompletedShow'


const App = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
            <Route path='/' element={<Inerface/>}/>               
            <Route path='/login' element={<Register/>}/>               
            <Route path='/levels' element={<Steps/>}/>                
           <Route path='/loader'  element={<RotateLoader/>}  />
           <Route path="/spinner"  element={<Spinner/>} />
           <Route path="/Final"  element={<Final/>} />
           <Route path="/completed"  element={<CompletedShow/>} />
           </Routes>
     </BrowserRouter>  
    </>
  )
}

export default App

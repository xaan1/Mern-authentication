import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import Privste from "./components/Privste"

import Headrr from "./components/Headrr"

function App() {
 return(
  <BrowserRouter>
  <Headrr/>

<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/" element={<Privste/>}>

  
  <Route path="/profile" element={<Profile/>}/>
  </Route>
 <Route path="/signin" element={<Signin/>}/>

</Routes>
</BrowserRouter>
 )
}

export default App

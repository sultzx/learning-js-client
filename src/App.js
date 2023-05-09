import React from "react";
import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import * as fetches from './redux/slices/user.js'
import { Main, Signup, Signin, Profile, Tutorial, Lessons, Ratings, Admin, Bootcamp } from './pages/index.js'
import {Variables} from './pages/Tutorial/index.js'
import { Header } from "./components/index.js";

import * as VariableExercises from './pages/Lessons/Variables/index.js'

function App() {

  const dispatch = useDispatch()

  React.useEffect( ()  => {
     dispatch(fetches.fetchAuthMe())
  }, [dispatch])

  const { data } = useSelector(state => state.user)

  return (
  <Routes>
    <Route path="/" element={<><Header/><Main/></>  } />
    <Route path="/registration" element={<><Header/><Signup/></>  } />
    <Route path="/login" element={<><Header/><Signin/></>  } />
    <Route path="/profile" element={<><Header/><Profile/></>  } />
    <Route path="/tutorial" element={<><Header/><Tutorial/></>  } />
    <Route path="/lessons" element={<><Header/><Lessons/></>  } />
    <Route path="/bootcamp" element={<><Header/><Bootcamp/></>  } />
    <Route path="/ratings" element={<><Header/><Ratings/></>  } />
    {
      data?.isAdmin == true && <Route path="/admin" element={<><Header/><Admin/></>  } />
    }
    
    ////////////////////////////////////////////

    <Route path="/tutorial/variables" element={<><Header/><Variables/></>  } /> 

    ////////////////////////////////////////////
    <Route path="/lessons/:id/variables/1" element={<><Header/><VariableExercises.E1/></>  } /> 
    <Route path="/lessons/:id/variables/2" element={<><Header/><VariableExercises.E2/></>  } />  
    <Route path="/lessons/:id/variables/3" element={<><Header/><VariableExercises.E3/></>  } />  
    <Route path="/lessons/:id/variables/4" element={<><Header/><VariableExercises.E4/></>  } />  
    <Route path="/lessons/:id/variables/5" element={<><Header/><VariableExercises.E5/></>  } />  
  </Routes>
  );
}

export default App;

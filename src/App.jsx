// App.jsx

// import { useState } from 'react';
import { createContext, useState } from 'react' // add createContext
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm' // import the SignupForm
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService'; // import the authservice

export const AuthedUserContext = createContext(null); // set the initial value of the context to null
    // creates a wrapper component and sets a dependent value

import './App.css';

const App = () => {
  
  // const [user, setUser] = useState(null);
  // const [user, setUser] = useState({ username: 'Shawn Doe' });
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <AuthedUserContext.Provider value={user}>
      {/* prop of value={object} to be grabbed by useContext in nested components */}
      {/* <NavBar user={user} /> */}
      <NavBar handleSignout={handleSignout} /> {/* pass the logout functionality to the navbar */}
        {/* user={user} // no longer necessary in NavBar and Dashboard due to createContext hook */} 
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard  />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        {/* <Route path='/signup' element={<SignupForm />} /> // import the signup form here */}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;

import React from 'react';
import './App.css';
import router from "./router/router";
import {RouterProvider} from "react-router-dom";
import {useState, useContext} from "react";

const UserContext = React.createContext();

const App = () => {
  const [userChange, setUserChange] = useState(0);
 

  return (
    <UserContext.Provider value={{userChange, setUserChange}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
export {UserContext};
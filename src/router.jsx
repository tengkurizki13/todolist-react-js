import {
    createBrowserRouter, redirect,
  } from "react-router-dom";
import App from "./App.jsx";
import SchedulPage from "./pages/SchedulPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";

  const router = createBrowserRouter([
    {
        element: <App />,
        children:[
            {
                path:"/",
                element: <LoginPage />
            },
            {
                path:"/home",
                element: <HomePage />
             },
            {
                path:"/schedule/:day",
                element: <SchedulPage />
            }
        ]
      },
  ]);


  export default router
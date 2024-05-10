import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import RootLayout from "./layouts/RootLayout";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

// create the router for pages
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Home />} />
//     </Route>
//   )
// );

const helmetContext = {};

function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <Navbar />
      <Home />
    </HelmetProvider>
  );
}

export default App;

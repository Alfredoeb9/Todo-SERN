import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<RootLayout />}></Route>)
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <header className="text-6xl">yooo</header>
      <h1 className="text-3xl font-bold underline text-red-600">test</h1> */}
    </div>
  );
}

export default App;

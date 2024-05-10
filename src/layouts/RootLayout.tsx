import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="container m-auto pt-4">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <Link to={"/"} className="text-black">
        Home
      </Link>
    </header>
  );
}

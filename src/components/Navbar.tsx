import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <Link to={"/"} className="text-nav-two text-xl sm:text-2xl font-bold">
        <span className="text-nav-one">A1.</span>TODO
      </Link>
    </header>
  );
}

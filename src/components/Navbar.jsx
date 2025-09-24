import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => (
  <nav className="bg-gradient-to-tr from-sky-400 to-fuchsia-600 sticky top-0 shadow-md p-4 flex justify-between items-center">
    <Link to="/" className="">
    <img className="h-10" src="./js-logo.png" alt="logo" />
    </Link>
    <div>
      <Link
        to="/cart"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Cart ({cartCount})
      </Link>
    </div>
  </nav>
);

export default Navbar;

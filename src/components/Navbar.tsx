import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-8 bg-[#f15a24] text-white">
      <div className="flex justify-between items-center max-w-[1300px] ml-auto mr-auto">
        <h1 className="text-3xl">Chuckle Norris</h1>
        <ul className="flex gap-8">
          <li>
            <NavLink className="text-2xl" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="text-2xl" to="/favorites">
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

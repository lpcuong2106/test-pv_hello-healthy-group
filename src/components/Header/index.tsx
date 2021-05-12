import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Counter</Link>
        </li>
        <li>
          <Link to="/employee">Employee</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header;

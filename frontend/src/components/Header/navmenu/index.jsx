import React, { useState, Children } from "react";
import PropTypes from "prop-types";
import style from "./navmenu.module.css";
import { IoClose } from 'react-icons/io5';
import { HiMenu } from 'react-icons/hi';

const NavMenu = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <nav className={style.navbar}>
      <button 
        className={style.button}
        onClick={handleOpenMenu}
      >
        <span className={style.icon}>
          {menuOpen ? <IoClose /> : <HiMenu />}
        </span>
      </button>
      <ul className={`${style.menu} ${menuOpen ? style.menu_open : ""}`}>
        {Children.map(children, (child) => (
          <li onClick={handleOpenMenu}>
            {child}
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavMenu;

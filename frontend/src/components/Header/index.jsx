import style from "./header.module.css";
import NavMenu from "./navmenu";

const Header = () => (
  <header className={style.header}>
    <NavMenu>
      <p className={style.link}>Inbox</p>
      <p className={style.link}>Upcoming</p>
      <p className={style.link}>Upcoming</p>
    </NavMenu>
  </header>
);

export default Header;
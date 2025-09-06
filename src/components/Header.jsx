import { faBars, faLanguage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LanguageIcon } from "./Language";
import { useTranslation } from "react-i18next";
import Logo from "../../src/assets/images/home/Logo.jpg";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [preScrollPos, setPreScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  const { t } = useTranslation();

  function handleMenu() {
    setIsOpen(!isOpen);
  }

  const navigate = useNavigate();

  function navigateToPage(path) {
    navigate(path);
    handleMenu();
  }

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < preScrollPos) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPreScrollPos(currentScrollPos);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [preScrollPos]);

  return (
    <>
      <nav
        className={`${
          visible ? "translate-y-0" : "-translate-y-full"
        } fixed top-0 left-0 w-full header px-9 py-3 h-[70px] flex justify-between items-center z-3  transition-transform duration-400 ease-in-out`}
      >
        <NavLink
          to="/"
          className="text-[1.2rem] whitespace-nowrap text-shadow-red-400 lg:ml-12 flex items-center "
        >
          <img src={Logo} className="w-[25px] h-[25px] rounded-full  mr-2" />
          T's Kitchen
        </NavLink>

        <div className="block md:hidden">
          <LanguageIcon />
        </div>
        <section className="hidden md:block md:pl-2 md:pr-2 lg:pr-8 = lg:flex lg:gap-7 items-center text-[0.9rem] lg:text-[1rem] ">
          <NavLink className="nav-item" to="/">
            {t("header.home")}
          </NavLink>
          <NavLink className="nav-item" to="/recipes">
            {t("header.recipes")}
          </NavLink>
          <NavLink className="nav-item" to="/favorites">
            {t("header.fav")}
          </NavLink>
          <NavLink className="nav-item" to="/cook-later">
            {t("header.cookLater")}
          </NavLink>
          <NavLink className="nav-item" to="/contact">
            {t("header.contact")}
          </NavLink>

          <div className="hidden md:inline">
            <LanguageIcon />
          </div>
        </section>
      </nav>
      <ul
        className={`nav-items-container fixed top-0 left-0 w-full h-screen bg-[var(--LIGHT-CREAM)] flex flex-col px-4 z-3
        transform transition-transform duration-700 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <li onClick={() => navigateToPage("/")}>
          <NavLink className="nav-item" to="/">
            {t("header.home")}
          </NavLink>
        </li>
        <li onClick={() => navigateToPage("recipes")}>
          <NavLink className="nav-item" to="/recipes">
            {t("header.recipes")}
          </NavLink>
        </li>
        <li onClick={() => navigateToPage("/favorites")}>
          <NavLink className="nav-item" to="/favorites">
            {t("header.fav")}
          </NavLink>
        </li>
        <li onClick={() => navigateToPage("/cook-later")}>
          <NavLink className="nav-item" to="/cook-later">
            {t("header.cookLater")}
          </NavLink>
        </li>
        <li onClick={() => navigateToPage("contact")}>
          <NavLink className="nav-item" to="/contact">
            {t("header.contact")}
          </NavLink>
        </li>
      </ul>
      <section
        onClick={handleMenu}
        className=" fixed flex justify-center items-center bottom-15 right-7 z-5 bg-[var(--TITLE-COLOR)] w-[40px] h-[40px] duration-200 rounded-full md:hidden hover:scale-110"
      >
        {isOpen ? (
          <FontAwesomeIcon
            className=" text-[var(--LIGHT-CREAM)]  text-[1.2rem]"
            icon={faXmark}
          />
        ) : (
          <FontAwesomeIcon
            className="text-[var(--LIGHT-CREAM)] text-[1.2rem]"
            icon={faBars}
          />
        )}
      </section>
    </>
  );
};

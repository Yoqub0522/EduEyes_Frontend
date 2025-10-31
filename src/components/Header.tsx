import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { Menu, X } from "lucide-react";
import { navLinks } from "../constants";
import { useTranslation } from "react-i18next";
import Language from "./shared/Language";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <header className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto max-w-[1170px] flex justify-between items-center py-5 px-2">
        <Link to={"/"}>
          <div className="cursor-pointer whitespace-nowrap font-inter font-extrabold text-2xl tracking-tight text-white drop-shadow-sm hover:opacity-90 transition-all">
            Edu Eyes
          </div>
        </Link>
        <nav className="hidden lg:flex gap-4">
          <ul className="flex gap-10 items-center">
            {navLinks.map((item) => (
              <li
                key={item.title}
                className="relative group font-poppins font-medium text-white text-base text-[14.5px] tracking-wide cursor-pointer transition-colors duration-300"
              >
                <a
                  className="inline-block py-1 transition-transform duration-300"
                  href={`#${item.title}`}
                >
                  {t(`nav.${item.path}`)}
                </a>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Flex gap={15} align="center">
            <Language />
            <Link to="/dashboard">
              <Button
                type="primary"
                className="bg-white! text-black!  py-5!  font-semibold px-8! rounded-3xl! border-none max-lg:hidden! hover:bg-white/90 hover:text-emerald-600 transition-all shadow-sm"
              >
                {t("buttons.button2")}
              </Button>
            </Link>
          </Flex>
          <div
            className="cursor-pointer lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-500 flex flex-col  items-center py-8 space-y-5 animate-slideDown lg:hidden shadow-lg">
          <ul className="flex flex-col gap-5 items-center">
            {navLinks.map((item) => (
              <li className="group relative">
                <a
                  key={item.title}
                  href={`#${item.title}`}
                  className="text-white group  text-lg font-medium hover:text-emerald-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${item.path}`)}
                </a>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
          <Link to="/dashboard">
            <Button
              type="primary"
              onClick={() => setIsOpen(false)}
              className="bg-white! text-black!  py-5!  font-semibold px-8! rounded-3xl! border-none  hover:bg-white/90 hover:text-emerald-600 transition-all shadow-sm"
            >
              {t("buttons.button2")}
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;

import Language from "../../components/shared/Language";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-64 right-0 z-50 bg-white h-20 flex justify-between items-center px-6">
      <h2 className="text-2xl font-inter font-semibold text-gray-800">
        Dashboard
      </h2>
      <Language color="text-black" />
    </header>
  );
};
export default Navbar;

import { FaBars } from 'react-icons/fa';

const NavMenu = () => {
  const handleMenuClick = () => {
    console.log('פתח/סגור תפריט');
  };

  return (
    <nav className="p-4 fixed right-0 top-0 z-50">
      <div className="flex justify-end w-screen">
        <FaBars onClick={handleMenuClick} className="text-3xl cursor-pointer text-white" />
        <ul className="hidden space-y-2 mt-2 bg-teal-700 p-4 rounded-lg absolute right-0 top-full">
          <li><a href="/" className="text-white hover:text-gray-300">בית</a></li>
          <li><a href="#contact" className="text-white hover:text-gray-300">צור קשר</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
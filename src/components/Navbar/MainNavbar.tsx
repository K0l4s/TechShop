import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const MainNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookie.get("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        Cookie.remove("token");
        setIsLoggedIn(false);
        setShowMenu(false);
        navigate("/Login");
    };

    return (
        <nav className="flex items-center justify-between px-12 py-4 shadow-xl sticky top-0 bg-white z-50">
            {/* Logo */}
            <div className="h-10 flex items-center">
                <img className="w-auto h-full" src="/image/logo.png" alt="logo" />
                <h1 className="text-xl font-bold text-blue-600">TECH GROUP</h1>
            </div>

            {/* Search bar */}
            <div className="flex items-center w-1/3 relative">
                <input type="text" placeholder="Laptop cấu hình mạnh..." className="border border-gray-300 p-2 px-5 rounded-3xl w-full" />
                <BiSearch className="absolute right-2 text-gray-500" />
            </div>

            {/* Navbar links */}
            <ul className="flex gap-4 items-center">
                <li>
                    <Link to="/cart" className="relative">
                        <AiOutlineShoppingCart className="text-2xl text-gray-700 hover:text-blue-600 transition" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">4</span>
                    </Link>
                </li>
                <li>
                    <Link to="/like-page" className="relative">
                        <AiOutlineHeart className="text-2xl text-gray-700 hover:text-red-500 transition" />
                    </Link>
                </li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>

                {!isLoggedIn ? (
                    <li><Link to="/Login">Login</Link></li>
                ) : (
                    <li className="relative">
                        <button onClick={() => setShowMenu(!showMenu)} className="text-3xl text-gray-700 hover:text-blue-600 transition">
                            <FaUserCircle />
                        </button>
                        {showMenu && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg">
                                <li><Link to="/user-profile" className="block px-4 py-2 hover:bg-gray-100">Xem thông tin</Link></li>
                                <li><Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Xem đơn hàng</Link></li>
                                <li><Link to="/reset-password" className="block px-4 py-2 hover:bg-gray-100">Đặt lại mật khẩu</Link></li>
                                <li>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default MainNavbar;

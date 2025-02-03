import { BiSearch } from "react-icons/bi"

const MainNavbar = () => {
    return (
        <nav className="flex items-center justify-between px-12 py-4 shadow-xl sticky top-0 bg-white z-50">
            {/* logo */}
            <div className="h-10 flex items-center">
                <img className="w-auto h-full" src="/image/logo.png" alt="logo" />
                <h1 className="text-xl font-bold text-blue-600">TECH GROUP</h1>
            </div>
            {/* search bar */}
            <div className="flex items-center w-1/3 relative">
                <input type="text" placeholder="Laptop cấu hình mạnh..." className="border border-gray-300 p-2 px-5 rounded-3xl w-full" />
                <BiSearch className="absolute right-2 text-gray-500" />
                {/* search result */}
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md p-2 ">
                    <ul>
                        <li className=""><p>Result 1</p></li>
                        <li>Result 2</li>
                        <li>Result 3</li>
                    </ul>
                </div>
            </div>

            <ul className="flex gap-2">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    )
}

export default MainNavbar
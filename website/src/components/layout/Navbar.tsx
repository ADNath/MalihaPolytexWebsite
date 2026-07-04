import logo from "../../assets/logo/logo.png";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm">
            <div className="container-custom h-[90px] flex items-center justify-between">

                <img
                    src={logo}
                    alt="Maliha Poly Tex"
                    className="h-16 object-contain"
                />

                <ul className="flex items-center gap-10 font-medium text-[15px] text-gray-700">

                    <li className="cursor-pointer text-[#035D34] font-semibold">
                        Home
                    </li>

                    <li className="cursor-pointer hover:text-[#035D34] transition">
                        About
                    </li>

                    <li className="cursor-pointer hover:text-[#035D34] transition">
                        Products
                    </li>

                    <li className="cursor-pointer hover:text-[#035D34] transition">
                        Certificates
                    </li>

                    <li className="cursor-pointer hover:text-[#035D34] transition">
                        Contact
                    </li>

                </ul>

            </div>
        </nav>
    );
}
import { Link } from "react-router-dom";

const menuItems = [
    { icon: "💻", label: "Laptop", link: "/laptop" },
    { icon: "🎮", label: "Laptop Gaming", link: "/laptop-gaming" },
    { icon: "🖥️", label: "PC GVN", link: "/pc-gvn" },
    { icon: "🔧", label: "Main, CPU, VGA", link: "/components" },
    { icon: "📦", label: "Case, Nguồn, Tản", link: "/case-psu" },
    { icon: "💾", label: "Ổ cứng, RAM, Thẻ nhớ", link: "/storage" },
    { icon: "🎥", label: "Loa, Micro, Webcam", link: "/accessories" },
    { icon: "🖥️", label: "Màn hình", link: "/monitor" },
    { icon: "⌨️", label: "Bàn phím", link: "/keyboard" },
    { icon: "🖱️", label: "Chuột + Lót chuột", link: "/mouse" },
    { icon: "🎧", label: "Tai Nghe", link: "/headphone" },
    { icon: "🪑", label: "Ghế - Bàn", link: "/furniture" },
    { icon: "🌐", label: "Phần mềm, mạng", link: "/software" },
    { icon: "🎮", label: "Handheld, Console", link: "/console" },
    { icon: "🔌", label: "Phụ kiện (Hub, sạc, cáp..)", link: "/accessories" },
    { icon: "🎁", label: "Dịch vụ và thông tin khác", link: "/services" },
];

const MenuSidebar = () => {
    return (
        <div className="w-[280px] bg-white rounded-lg shadow-lg py-2">
            <ul className="space-y-1">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.link}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg w-6">{item.icon}</span>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#ED1C24]">
                                    {item.label}
                                </span>
                            </div>
                            <svg
                                className="w-3 h-3 text-gray-400 group-hover:text-[#ED1C24] transition-colors"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                fill="currentColor"
                            >
                                <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                            </svg>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuSidebar;

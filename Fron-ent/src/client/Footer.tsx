import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-700 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">VỀ GEARVN</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Giới thiệu</li>
              <li className="hover:text-blue-500 cursor-pointer">Tuyển dụng</li>
              <li className="hover:text-blue-500 cursor-pointer">Black Friday 2024</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">CHÍNH SÁCH</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Chính sách bảo hành</li>
              <li className="hover:text-blue-500 cursor-pointer">Chính sách giao hàng</li>
              <li className="hover:text-blue-500 cursor-pointer">Chính sách bảo mật</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">THÔNG TIN</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Hệ thống cửa hàng</li>
              <li className="hover:text-blue-500 cursor-pointer">Hướng dẫn mua hàng</li>
              <li className="hover:text-blue-500 cursor-pointer">Hướng dẫn thanh toán</li>
              <li className="hover:text-blue-500 cursor-pointer">Hướng dẫn trả góp</li>
              <li className="hover:text-blue-500 cursor-pointer">Tra cứu địa chỉ bảo hành</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)</h3>
            <ul className="space-y-2">
              <li>
                Mua hàng:{" "}
                <a href="tel:19005301" className="text-blue-500 hover:underline">
                  1900.5301
                </a>
              </li>
              <li>
                Bảo hành:{" "}
                <a href="tel:19005325" className="text-blue-500 hover:underline">
                  1900.5325
                </a>
              </li>
              <li>
                Khiếu nại:{" "}
                <a href="tel:18006173" className="text-blue-500 hover:underline">
                  1800.6173
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:cskh@gearvn.com"
                  className="text-blue-500 hover:underline"
                >
                  cskh@gearvn.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">ĐƠN VỊ VẬN CHUYỂN</h3>
            <div className="flex items-center space-x-2 mb-4">
              <img className="w-[60px]" src="https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=6821" alt="GHN" />
              <img className="w-[60px]" src="https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=6821" alt="EMS" />
              <img className="w-[60px]" src="https://theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=6821" alt="GVN" />
            </div>
            <h3 className="font-bold text-lg mb-4 text-gray-900">CÁCH THỨC THANH TOÁN</h3>
            <div className="flex items-center space-x-2">
              <img className="w-[60px]" src="https://theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=6821" alt="MasterCard" />
              <img className="w-[60px]" src="https://theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=6821" alt="Visa" />
              <img className="w-[60px]" src="https://theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=6821" alt="MoMo" />
              <img className="w-[60px]" src="https://theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=6821" alt="ZaloPay" />
            </div>
          </div>
        </div>
        {/* Kết nối với chúng tôi */}
        <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">KẾT NỐI VỚI CHÚNG TÔI</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-red-500">
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400">
              <i className="fab fa-zalo text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

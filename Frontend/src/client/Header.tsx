import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchBar from './components/searchBar';

const Header = () => {
  const [auth, setAuth] = useState<any>('');
  const navigate = useNavigate();
  const { cartCount, updateCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem('userInfo') as string);

  useEffect(() => {
    if (user) {
      setAuth(user);
    } else {
      setAuth('');
    }
  }, [JSON.stringify(user)]);

  useEffect(() => {
    updateCartCount();
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const logout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    setAuth('')
    navigate('/')
    window.location.reload()
  }

  return (
    <div className="relative  w-full">
      <div className='bg-[#111111] w-full overflow-hidden'>
        <img
          src="https://file.hstatic.net/200000722513/file/thang_11_pc_gvn_z890xcooler-1280x50px.jpg"
          alt="Banner"
          className='w-full h-[50px] object-cover hover:scale-105 transition-transform duration-300'
        />
      </div>

      <div className={`sticky top-0 left-0 right-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className='bg-[#ED1C24] w-full'>
          <div className='container mx-auto px-4 lg:px-8'>
            <div className='flex items-center justify-between h-[60px] gap-4'>
              <div className='flex items-center gap-4 lg:gap-8'>
                <button className='text-white lg:hidden hover:opacity-80 transition-opacity'>
                  <i className='fa-solid fa-bars text-xl'></i>
                </button>
                <Link to='/' className='w-[140px] lg:w-[180px] transform hover:scale-105 transition-transform'>
                  <img
                    src='https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg'
                    alt='Logo'
                    className='w-full h-auto object-contain'
                  />
                </Link>
              </div>

              <div className='hidden md:block flex-1 max-w-[500px] mx-4 lg:mx-8 relative group'>
                <SearchBar />
              </div>

              <div className='flex items-center gap-4 text-white'>
                <Link to='/' className='hidden md:flex items-center gap-2 group hover:opacity-80'>
                  <i className='fa-solid fa-headphones text-2xl'></i>
                  <div className='flex flex-col'>
                    <span className='text-xs text-white/90'>Hotline</span>
                    <span className='text-[13px] font-semibold'>1900.5301</span>
                  </div>
                </Link>

                <Link to='/' className='hidden md:flex items-center gap-2 group hover:opacity-80'>
                  <i className='fa-solid fa-location-dot text-2xl'></i>
                  <div className='flex flex-col'>
                    <span className='text-xs text-white/90'>Hệ thống</span>
                    <span className='text-[13px] font-semibold'>Showroom</span>
                  </div>
                </Link>
                <Link to='/' className='hidden md:flex items-center gap-2 group hover:opacity-80'>
                  <i className='fa-solid fa-truck-fast text-2xl'></i>
                  <div className='flex flex-col'>
                    <span className='text-xs text-white/90'>Tra cứu</span>
                    <span className='text-[13px] font-semibold'>đơn hàng</span>
                  </div>
                </Link>

                <Link to='/cart' className='flex items-center gap-2 group hover:opacity-80'>
                  <div className='relative'>
                    <i className='fa-solid fa-cart-shopping text-2xl'></i>
                    <span
                      className={`absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold
            ${cartCount > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            transition-all duration-300`}
                    >
                      {cartCount}
                    </span>
                  </div>
                  <div className='hidden md:flex flex-col'>
                    <span className='text-xs text-white/90'>Giỏ</span>
                    <span className='text-[13px] font-semibold'>hàng</span>
                  </div>
                </Link>

                {auth?.name ? (
                  <div className='group relative'>
                    <button className='flex items-center gap-2 hover:opacity-80'>
                      <i className='fa-solid fa-user text-2xl'></i>
                      <div className='hidden md:flex flex-col'>
                        <span className='text-xs text-white/90'>{auth?.name}</span>
                      </div>
                    </button>

                    <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-[calc(100%+0.5rem)] w-[280px] bg-white rounded-lg shadow-lg p-4 transition-all duration-300 z-50'>
                      <div className='flex items-center gap-3 mb-4 text-gray-700'>
                        <i className='fa-regular fa-hand-wave'></i>
                        <span>Xin chào, {auth?.name}!</span>
                      </div>
                      <div className='space-y-2'>
                        <button
                          onClick={logout}
                          className='block w-full py-2 px-4 bg-red-500 text-white text-center rounded font-semibold hover:bg-opacity-90 transition-all duration-300'
                        >
                          ĐĂNG XUẤT
                        </button>
                        <Link
                          to="/thong-tin"
                          className='block w-full py-2 px-4 border-2 border-black text-black text-center rounded font-semibold hover:bg-black hover:text-white transition-all duration-300'
                        >
                          THÔNG TIN CÁ NHÂN
                        </Link>
                      </div>
                      <div className='mt-4 pt-4 border-t flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer'>
                        <i className='fa-regular fa-circle-question'></i>
                        <span>Trợ giúp</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='group relative'>
                    <button className='flex items-center gap-2 hover:opacity-80'>
                      <i className='fa-solid fa-user text-2xl'></i>
                      <div className='hidden md:flex flex-col'>
                        <span className='text-xs text-white/90'>Đăng</span>
                        <span className='text-[13px] font-semibold'>nhập</span>
                      </div>
                    </button>

                    <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-[calc(100%+0.5rem)] w-[280px] bg-white rounded-lg shadow-lg p-4 transition-all duration-300 z-50'>
                      <div className='flex items-center gap-3 mb-4 text-gray-700'>
                        <i className='fa-regular fa-hand-wave'></i>
                        <span>Xin chào, vui lòng đăng nhập</span>
                      </div>
                      <div className='space-y-2'>
                        <Link
                          to="/signin"
                          className='block w-full py-2 px-4 bg-black text-white text-center rounded font-semibold hover:bg-opacity-90 transition-all duration-300'
                        >
                          ĐĂNG NHẬP
                        </Link>
                        <Link
                          to="/signup"
                          className='block w-full py-2 px 4 border-2 border-black text-black text-center rounded font-semibold hover:bg-black hover:text-white transition-all duration-300'
                        >
                          ĐĂNG KÝ
                        </Link>
                      </div>
                      <div className='mt-4 pt-4 border-t flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer'>
                        <i className='fa-regular fa-circle-question'></i>
                        <span>Trợ giúp</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='md:hidden bg-[#ED1C24] w-full pb-3 px-4'>
          <form method='get' className='relative'>
            <input
              type='text'
              className='w-full py-2 px-4 pr-10 rounded-lg border-2 border-transparent focus:border-yellow-400 outline-none text-sm transition-all'
              placeholder='Bạn cần tìm gì?'
            />
            <button type='submit' className='absolute right-3 top-1/2 -translate-y-1/2 hover:text-[#ED1C24] transition-colors'>
              <i className='fa-solid fa-magnifying-glass' />
            </button>
          </form>
        </div>

        <div className='bg-white border-b'>
          <div className='container flex justify-center mx-auto px-4 lg:px-8'>
            <div className='flex items-center justify-between lg:justify-start gap-4 lg:gap-8 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide'>
              <Link to='/' className='flex items-center gap-2 py-2 hover:text-[#ED1C24] transition-colors min-w-max'>
                <i className='fa-solid fa-ticket'></i>
                <span>Săn Voucher GEARVN</span>
              </Link>
              <Link to='/' className='flex items-center gap-2 py-2 hover:text-[#ED1C24] transition-colors min-w-max'>
                <i className='fa-solid fa-newspaper'></i>
                <span>Tin công nghệ</span>
              </Link>
              <Link to='/' className='hidden md:flex items-center gap-2 py-2 hover:text-[#ED1C24] transition-colors min-w-max'>
                <i className='fa-solid fa-screwdriver-wrench'></i>
                <span>Dịch vụ sửa chữa</span>
              </Link>
              <Link to='/' className='hidden md:flex items-center gap-2 py-2 hover:text-[#ED1C24] transition-colors min-w-max'>
                <i className='fa-solid fa-house-laptop'></i>
                <span>Dịch vụ kỹ thuật tại nhà</span>
              </Link>
              <Link to='/' className='hidden md:flex items-center gap-2 py-2 hover:text-[#ED1C24] transition-colors min-w-max'>
                <i className='fa-solid fa-arrows-rotate'></i>
                <span>Thu cũ đổi mới VGA</span>
              </Link>
              <Link to='/' className='hidden md:flex items-center gap-2 py-2 hover:text-[#ED1C24] transition-colors min-w-max'>
                <i className='fa-solid fa-shield'></i>
                <span>Tra cứu bảo hành</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

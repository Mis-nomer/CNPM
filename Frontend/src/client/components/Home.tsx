import { Carousel } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from '../../api/products'
import BannerSection from './branding'
import ProductSection from './productSection'
import { Product } from '@/type/Product'

const optionsByCategory: any = {
  productTypes: [
    'dienthoai',
    'laptop',
    'tablet',
    'amthanh',
    'dongho',
    'nhathongminh',
    'phukien',
    'pc_manhinh',
    'tivi',
    'hangcu'
  ]
}

const typeDisplayNames: { [key: string]: string } = {
  dienthoai: 'Điện thoại',
  laptop: 'Laptop',
  tablet: 'Máy tính bảng',
  amthanh: 'Âm thanh',
  dongho: 'Đồng hồ',
  nhathongminh: 'Nhà thông minh',
  phukien: 'Phụ kiện',
  pc_manhinh: 'PC-Màn hình',
  tivi: 'Tivi',
  hangcu: 'Hàng cũ'
}
const Home = () => {
  const [pro, setPro] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<{ [key: string]: Product[] }>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAll();
        setPro(data?.data);
      } catch (err) {
        console.log('Error:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterProductsByType = () => {
      const categorizedProducts: { [key: string]: Product[] } = {};
      optionsByCategory.productTypes.forEach((type: string) => {
        categorizedProducts[type] = pro.filter((product) => product?.type === type);
      });
      setFilteredProducts(categorizedProducts);
    };

    filterProductsByType();
  }, [pro]);
  return (
    <div>
      <div className='w-[1200px] h-[fit-content] m-auto flex'>
        <div className="w-[250px] mr-4 bg-white rounded-xl shadow-lg h-max">
          <div className="bg-[#ED1C24] p-3">
            <h3 className="text-white font-bold text-base">Danh mục sản phẩm</h3>
          </div>
          <div className="py-2">
            <ul>
              {optionsByCategory.productTypes.map((type: string) => (
                <li key={type} className="group">
                  <Link
                    to={`/product/${type}`}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-all"
                  >
                    <span className="text-[13px] font-medium text-gray-700 group-hover:text-[#ED1C24] transition-colors">
                      {typeDisplayNames[type]}
                    </span>
                    <div className="text-gray-400 w-[7px] group-hover:text-[#ED1C24] transform group-hover:translate-x-0.5 transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="fill-current"
                        height="10"
                      >
                        <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='banner'>
          <div className='banner-content'>
            <Carousel autoplay arrows>
              <div>
                <img src="https://file.hstatic.net/200000722513/file/uu_dai_soc_banner_web_slider_800x400.png" className=' w-full h-full object-cover' alt="" />
              </div>
              <div>
                <img src="https://file.hstatic.net/200000722513/file/thang_11_laptop_asus_rog800x400.jpg" className=' w-full h-full object-cover' alt="" />
              </div>
              <div>
                <img src="https://file.hstatic.net/200000722513/file/thang_11_laptop_vivobook_s_gearvn__800x400_.jpg" className=' w-full h-full object-cover' alt="" />
              </div>
              <div>
                <img src="https://file.hstatic.net/200000722513/file/thang_11_laptop_asus_gearvn_800x400.jpg" className=' w-full h-full object-cover' alt="" />
              </div>
            </Carousel>
            <div className='banner-title'>
              <div className='banner-outer-active'>
                <div data-v-78fbd3bf className=''>
                  GALAXY S22 SERIES
                  <br />
                  Ưu đãi đến 9 triệu
                </div>
              </div>
              <div className='banner-outer'>
                <div data-v-78fbd3bf className=''>
                  POCO X4 GT
                  <br />
                  Cấu hình mạnh mẽ
                </div>
              </div>
              <div className='banner-outer'>
                <div data-v-78fbd3bf className=''>
                  MACBOOK AIR M2
                  <br />
                  Ưu đãi đến 5 triệu
                </div>
              </div>
              <div className='banner-outer'>
                <div data-v-78fbd3bf className=''>
                  TIVI XIAOMI 4K P1
                  <br />
                  Mở bán quà khủng
                </div>
              </div>
              <div className='banner-outer'>
                <div data-v-78fbd3bf className=''>
                  HUAWEI WEEK
                  <br />
                  Deal ngon giá sốc
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='box-right-banner'>
          <div className='right-banner'>
            <a href='/' className='right-banner-item'>
              <img
                alt='img'
                className='rounded-[10px] w-full h-full object-cover'
                src='https://file.hstatic.net/200000722513/file/thang_10_layout_web_-01.png'
              />
            </a>
            <a href='/' className='right-banner-item'>
              <img
                alt='img'
                className='rounded-[10px] w-full h-full object-cover'
                src='https://file.hstatic.net/200000722513/file/thang_10_layout_web_-02.png'
              />
            </a>
            <a href='/' className='right-banner-item'>
              <img
                alt='img'
                className='rounded-[10px] w-full h-full object-cover'
                src='https://file.hstatic.net/200000722513/file/thang_10_layout_web_-03.png'
              />
            </a>
          </div>
        </div>
      </div>
      <div className="content pt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="overflow-hidden rounded-lg">
          <img
            alt='Banner 1'
            className='right-banner-item  object-cover hover:scale-105 transition-transform duration-300'
            src='https://file.hstatic.net/200000722513/file/khuyen_mai_t10_500x250.png'
          />
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            alt='Banner 2'
            className='right-banner-item  object-cover hover:scale-105 transition-transform duration-300'
            src='https://file.hstatic.net/200000722513/file/thang_10_layout_web_-08.png'
          />
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            alt='Banner 3'
            className='right-banner-item  object-cover hover:scale-105 transition-transform duration-300'
            src='https://file.hstatic.net/200000722513/file/thang_10_artboard_12_copy_10.png'
          />
        </div>
      </div>
      <ProductSection
        optionsByCategory={optionsByCategory}
        filteredProducts={filteredProducts}
        typeDisplayNames={typeDisplayNames}
      />
      <BannerSection />
    </div>
  )
}

export default Home

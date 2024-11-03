import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from '../../api/products'
import { ProductType } from '../../type/Product'

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
  const [pro, setPro] = useState<ProductType[]>([])
  const [filteredProducts, setFilteredProducts] = useState<{ [key: string]: ProductType[] }>({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAll()
        setPro(data?.data)
        console.log(data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filterProductsByType = () => {
      const categorizedProducts: { [key: string]: ProductType[] } = {}

      optionsByCategory.productTypes.forEach((type: string) => {
        categorizedProducts[type] = pro.filter((pro) => pro?.type === type)
      })

      setFilteredProducts(categorizedProducts)
    }

    filterProductsByType()
  }, [pro])
  return (
    <div>
      <div className='content'>
        <div className='menu-container'>
          <div className='menu-wrapper'>
            <div className='menu-tree'>
              <ul className='menu-tree'>
                {optionsByCategory.productTypes.map((type: string) => (
                  <li className='label-menu-tree'>
                    <Link to={`/product/${type}`} className='label-item'>
                      <span> {typeDisplayNames[type]}</span>
                      <div data-v-78fbd3bf='' className='icon-right'>
                        <svg height='{15}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                          <path d='M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'></path>
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
                <li className='label-menu-tree'>
                  <Link to={`/`} className='label-item'>
                    <span>Khuyến mãi</span>
                    <div data-v-78fbd3bf='' className='icon-right'>
                      <svg height='{15}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                        <path d='M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'></path>
                      </svg>
                    </div>
                  </Link>
                </li>
                <li className='label-menu-tree'>
                  <Link to={`/`} className='label-item'>
                    <span> Tin tức công nghệ</span>
                    <div data-v-78fbd3bf='' className='icon-right'>
                      <svg height='{15}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                        <path d='M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z'></path>
                      </svg>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='banner'>
          <div className='banner-content'>
            <img
              src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1716451572/iphone-15-pro-upgrader-stogage_pdzqmt.webp'
              alt=''
              className='banner-img'
            />
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
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1716451733/rightbanner-m34-14-5-2024_vv3gmz.webp'
                className='right-banner-img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1716451733/rightbanner-m34-14-5-2024_vv3gmz.webp'
              />
            </a>
            <a href='/' className='right-banner-item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1716451732/ipad-pro-m4-2024-20-5-right-banner_hlkhbw.webp'
                className='right-banner-img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1716451732/ipad-pro-m4-2024-20-5-right-banner_hlkhbw.webp'
              />
            </a>
            <a href='/' className='right-banner-item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1716451731/s-student-banner-block-home-update_2_wt4wfp.webp'
                className='right-banner-img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1716451731/s-student-banner-block-home-update_2_wt4wfp.webp'
              />
            </a>
          </div>
        </div>
      </div>
      <section>
        {optionsByCategory.productTypes.map((type: string) => (
          <div className='box-content'>
            <div className='box-title'>
              <Link to={`/product/${type}`} className='title'>
                {typeDisplayNames[type]}
              </Link>
              <Link to={`/product/${type}`} className='title1'>
                Xem tất cả
              </Link>
            </div>
            <div className='product-list'>
              {filteredProducts[type]?.slice(0, 5).map((item, index) => {
                return (
                  <div key={index} className='product'>
                    <Link to={`/products/${item?.id}`} className='product'>
                      <div className='product-img'>
                        <img src={item?.thumbnail} alt='' className='img-product' />
                      </div>
                      <h3 className='product-name'>{item?.name}</h3>
                      <div className='product-price'>
                        <span className='salePrice'>
                          {item?.salePrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </span>
                        <span className='costPrice'>
                          {item?.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </span>
                      </div>
                      <div className='product-desc'>
                        <div className='promotion'>
                          <p>[HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ</p>
                        </div>
                      </div>
                      <div className='product-sao'>
                        <div data-v-78fbd3bf className='icon-star'>
                          <svg height={12} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                            <path d='M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z'></path>
                          </svg>
                        </div>
                        <div data-v-78fbd3bf className='icon-star'>
                          <svg height={12} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                            <path d='M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z'></path>
                          </svg>
                        </div>
                        <div data-v-78fbd3bf className='icon-star'>
                          <svg height={12} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                            <path d='M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z'></path>
                          </svg>
                        </div>
                        <div data-v-78fbd3bf className='icon-star'>
                          <svg height={12} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                            <path d='M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z'></path>
                          </svg>
                        </div>
                        <div data-v-78fbd3bf className='icon-star'>
                          <svg height={12} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                            <path d='M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z'></path>
                          </svg>
                        </div>
                        &nbsp; &nbsp;
                        <span className='evaluate'>7 đánh giá</span>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <div className='band-banner'>
          <div className='box-title'>
            <a href='/' className='title'>
              Ưu đãi thanh toán
            </a>
          </div>
          <div className='brand-banner__content'>
            <a href='/' className='brand-banner__item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/uu-dai-vppay-apple-080324_2_flkv9c.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/uu-dai-vppay-apple-080324_2_flkv9c.webp'
              />
            </a>
            <a href='/' className='brand-banner__item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940012/vib-update-01-04-2024_2_f3m4vw.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940012/vib-update-01-04-2024_2_f3m4vw.webp'
              />
            </a>
            <a href='/' className='brand-banner__item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/uu-dai-thanh-toan-hsbc-0803-2024_j4w1an.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/uu-dai-thanh-toan-hsbc-0803-2024_j4w1an.webp'
              />
            </a>
            <a href='/' className='brand-banner__item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940010/momo-5-04-2024-slide_aopkxs.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940010/momo-5-04-2024-slide_aopkxs.webp'
              />
            </a>
          </div>
        </div>
        <div className='band-banner'>
          <div className='box-title'>
            <a href='/' className='title'>
              CHUYÊN TRANG THƯƠNG HIỆU
            </a>
          </div>
          <div className='brand-banner__content'>
            <a href='/' className='brand-banner__item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/apple-chinh-hang-home_tb7oe9.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/apple-chinh-hang-home_tb7oe9.webp'
              />
            </a>
            <a href='/' className='brand-banner__item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/SIS_asus_ihdv47.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/SIS_asus_ihdv47.webp'
              />
            </a>
            <a href='/' className='brand-banner__item'>
              <img
                alt=''
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940010/gian-hang-samsung-home_kai5jd.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940010/gian-hang-samsung-home_kai5jd.webp'
              />
            </a>
            <a href='/' className='brand-banner__item'>
              <img
                alt='Xiaomi'
                data-src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/xiaomi_alhqoi.webp'
                className='brand-banner__img'
                src='https://res.cloudinary.com/dvj4wwihv/image/upload/v1717940011/xiaomi_alhqoi.webp'
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

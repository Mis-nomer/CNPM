import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductType } from '../../../type/Product'
import { getAllProByType } from '@/api/products'

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

const ProductList = () => {
  const { type } = useParams()
  const [products, setProducts] = useState<ProductType[]>([])
  console.log(type)

  useEffect(() => {
    const getData = async (type: String) => {
      const { data } = await getAllProByType(type)
      console.log(data?.data)
      setProducts(data?.data)
    }
    getData(String(type))
  }, [String(type)])

  return (
    <div>
      <main className='my-[20px]'>
        <div className='w-[1080px] py-[10px] mx-auto flex border-b-2 border-[#f2f2f2]'>
          <div className='text-black'>
            <i className='fa-solid fa-house text-red-600 mr-[10px]'></i>
            <Link to='/' className='text-black hover:text-black font-semibold'>
              Trang chủ
            </Link>
          </div>
          <div className='mx-2 text-[#5d5f6c]'>
            <i className='fa fa-angle-right' aria-hidden='true' />
          </div>
          <div className='text-black font-semibold'>{typeDisplayNames[String(type)]}</div>
        </div>

        <div className='w-[1200px] h-auto mx-auto'>
          <div className='w-[1200px] my-[20px]'>
            <div className='product-list'>
              {products &&
                products.map((item, index) => {
                  return (
                    <div className='product' key={index}>
                      <Link to={`/products/${item.id}`} className='product'>
                        <div className='product-img'>
                          <img src={item?.thumbnail} alt='' className='img-product' />
                        </div>
                        <h3 className='product-name'>{item.name}</h3>
                        <div className='product-price'>
                          <span className='salePrice'>
                            {item?.salePrice.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
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
        </div>
      </main>
    </div>
  )
}

export default ProductList

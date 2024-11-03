import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { message } from 'antd'
import { getAll, listOnePro } from '@/api/products'
import { ProductType } from '@/type/Product'
import { addCartService } from '@/api/carts'
import { IAddCart } from '@/type/cart'
import { Minus, Plus } from 'lucide-react'
import numeral from 'numeral'

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
const ProductDetail = () => {
  const userInfoString = localStorage.getItem('userInfo')
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null
  const { id } = useParams()
  const [pro, setPro] = useState<ProductType>()
  const [similarpr, setSimilarpr] = useState<ProductType[]>([])
  const [quantityValue, setQuantityValue] = useState<number>(1)

  const handleIncrease = () => {
    setQuantityValue((prevValue) => prevValue + 1)
  }

  const handleDecrease = () => {
    setQuantityValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1)) // Đảm bảo số lượng không nhỏ hơn 1
  }

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await listOnePro(Number(id))
      setPro(data?.data as ProductType)
      if (data?.data && data?.data?.type) {
        const { data } = await getAll()
        setSimilarpr(data?.data)
      }
    }
    getProduct()
  }, [id])

  const addToCart = async (item: ProductType) => {
    if (!userInfo) {
      message.error('Bạn cần đăng nhập để thêm vào giỏ hàng')
      return
    }
    const data: IAddCart = {
      productId: Number(item.id),
      quantity: quantityValue,
      userId: userInfo.id || 0
    }
    await addCartService(data)
    message.success('Thêm vào giỏ hàng thành công')
  }
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
          <div className='text-black font-semibold'>
            <Link to={`/product/${pro?.type}`} className='text-black hover:text-black font-semibold'>
              {typeDisplayNames[String(pro?.type)]}
            </Link>
          </div>
          <div className='mx-2 text-[#5d5f6c]'>
            <i className='fa fa-angle-right' aria-hidden='true' />
          </div>
          <div className='text-black font-semibold'>{pro?.name}</div>
        </div>
        <div className='w-[1440px] h-auto mx-auto'>
          <div className='w-[1080px] h-auto mx-auto'>
            <div className='w-[1080px] py-[5px] flex border-b-2 border-[#f2f2f2]'>
              <div className='text-[24px] font-semibold w-[980px]'>{pro?.name}</div>
            </div>
            <div className='w-[1080px] h-auto flex justify-between mt-[20px]'>
              <div className='w-[398px] h-[398px] mx-auto border flex justify-center item-center'>
                <div>
                  <img src={pro?.image} alt='' className='w-[358px] h-[358px] my-[20px]' />
                </div>
              </div>
              <div className='w-[460px]'>
                <div className='flex mb-[20px]'>
                  <span className='text-[red] font-semibold text-[24px] mr-5'>
                    {pro?.salePrice.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </span>
                  <span className='text-[gray] font-semibold text-[18px] line-through mr-5'>
                    {pro?.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </span>
                </div>
                <div className='flex items-center'>
                  <div className='text-[#1e1e27] mt-1'>Số lượng:</div>
                  <div className='mx-3 border h-[40px] w-[120px] flex items-center justify-around'>
                    <button onClick={handleDecrease} className='p-1'>
                      <Minus size={16} />
                    </button>
                    <span className='w-10 text-center '>{quantityValue}</span>
                    <button onClick={handleIncrease} className='p-1'>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className='my-5'>
                  <p>
                    Số lượng hàng còn trong kho:{' '}
                    {numeral(pro?.quantity).format('0,0').replace(/,/g, '.').replace(/\./, ',')}
                  </p>
                </div>
                <div className='mt-7'>
                  {pro?.quantity === 0 ? (
                    <p className='text-red-500'>Sản phẩm đã hết hàng</p>
                  ) : (
                    <button
                      className='bg-red-500 h-10 w-44 rounded-sm text-white'
                      onClick={() => {
                        addToCart(pro as ProductType)
                      }}
                    >
                      <i className='fa-solid fa-cart-plus'></i> Thêm vào giỏ hàng
                    </button>
                  )}
                </div>
                <div className='text-[#51545f] my-[20px] w-[460px]'>
                  <div className='mb-[0.9375rem] p-2.5 rounded-[20px] border border-gray-300 w-[400px] text-gray-700'>
                    <span className='block text-sm font-bold text-gray-800 mb-2'>Chính sách mua hàng:</span>
                    <ul className='m-0 pl-6 text-sm list-none'>
                      <li className='flex mb-2.5'>
                        <i className='fas fa-check-circle text-green-600 mr-2 mt-1'></i>
                        <span className='text-gray-500'>
                          Máy mới 100% , chính hãng. Hoàn tiền 300% nếu phát hiện hàng giả
                        </span>
                      </li>
                      <li className='flex mb-2.5'>
                        <i className='fas fa-check-circle text-green-600 mr-2 mt-1'></i>
                        <span className='text-gray-500'>Hộp, Sách hướng dẫn, Cây lấy sim, Cáp sạc</span>
                      </li>
                      <li className='flex mb-2.5'>
                        <i className='fas fa-check-circle text-green-600 mr-2 mt-1'></i>
                        <span className='text-gray-500'>
                          1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo
                          hành chính hãng
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[1080px] h-auto mx-auto '>
            <div className='py-20'>
              <div className='container mx-auto'>
                <div className='flex justify-between items-start'>
                  <div className='w-8/12 p-3 rounded-2xl shadow'>
                    <h2 className='text-xl font-bold mb-4'>Đặc điểm nổi bật</h2>
                    <div className='ck-content' dangerouslySetInnerHTML={{ __html: pro?.description as string }}></div>
                  </div>
                  <div className='w-4/12 p-3 rounded-2xl shadow-md'>
                    <h2 className='text-xl font-bold mb-4'>Thông số kỹ thuật</h2>
                    <ul className='space-y-2'>
                      <li className='flex justify-between'>
                        <p>Kích thước màn hình</p>
                        <div>{pro?.screenSize}</div>
                      </li>
                      <li className='flex justify-between'>
                        <p>Độ phân giải màn hình</p>
                        <div>{pro?.screenReslution}</div>
                      </li>
                      <li className='flex justify-between'>
                        <p>Chipset</p>
                        <div>{pro?.cpu}</div>
                      </li>
                      <li className='flex justify-between'>
                        <p>Dung lượng RAM</p>
                        <div>{pro?.ram}</div>
                      </li>
                      <li className='flex justify-between'>
                        <p>Bộ nhớ trong</p>
                        <div>{pro?.storage}</div>
                      </li>
                      <li className='flex justify-between'>
                        <p>Pin</p>
                        <div>{pro?.battery}</div>
                      </li>
                      <li className='flex justify-between'>
                        <p>Hệ điều hành</p>
                        <div>{pro?.operatingSystem}</div>
                      </li>
                      <li className='flex justify-between'>
                        <p>Trọng lượng</p>
                        <div>{pro?.weight}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[1080px] h-auto mx-auto'>
            <div className='text-[#5d5f6c] text-2xl font-medium mt-14 uppercase border-b-2 border-[#f2f2f2]'>
              Sản phẩm liên quan
            </div>
            <div className='w-[1080px] my-[20px]'>
              <div className='product-list'>
                {similarpr
                  .filter((item) => item.type === pro?.type)
                  .filter((item) => item.id !== pro?.id)
                  .map((item, index) => {
                    return (
                      <div className='product' key={index}>
                        <Link to={`/products/${item.id}`} className='product'>
                          <div className='product-img'>
                            <img src={item.image} alt='' className='img-product' />
                          </div>
                          <h3 className='product-name'>{item.name}</h3>
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
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail

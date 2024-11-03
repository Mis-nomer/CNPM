import { deleteCartService, getCartService, updateCartService } from '@/api/carts'
import { message, Modal } from 'antd'
import { Minus, Plus, Trash } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

interface Product {
  id: number
  name: string
  price: number
  thumbnail: string
}

interface CartItem {
  id: number
  products: Product
  quantity: number
}

const Cart = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const [carts, setCarts] = useState<CartItem[]>([])
  const [priceCarts, setPriceCarts] = useState(0)
  const [checkboxStates, setCheckboxStates] = useState<{ [key: number]: boolean }>({})

  const fetchData = useCallback(async () => {
    const result = await getCartService(userInfo.id)
    setCarts(result.data.data)
    setCheckboxStates((prevState) => {
      const newCheckboxStates: { [key: number]: boolean } = {}
      result.data.data.forEach((item: CartItem) => {
        newCheckboxStates[item.products.id] = prevState[item.products.id] || false
      })
      return newCheckboxStates
    })
  }, [userInfo.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const total = carts.reduce((total, item) => {
      return checkboxStates[item.products.id] ? total + item.products.price * item.quantity : total
    }, 0)
    setPriceCarts(total)
  }, [carts, checkboxStates])

  const formatNumber = (number: number) => {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  }

  const updateQuantity = async (item: CartItem, quantity: number) => {
    const data = { id: item.id, quantity }
    if (quantity === 0) {
      Modal.confirm({
        title: 'Bạn có muốn xóa không?',
        onOk: async () => {
          await deleteCartService(item.id)
          fetchData()
          message.success('Xóa thành công')
        }
      })
    } else {
      await updateCartService(data)
      fetchData()
    }
  }

  const removeItem = async (item: CartItem) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa không?',
      onOk: async () => {
        await deleteCartService(item.id)
        fetchData()
        message.success('Xóa thành công')
      }
    })
  }

  const toggleCheckbox = (productId: number) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId]
    }))
  }

  const isPlaceOrderValid = Object.values(checkboxStates).some(Boolean)

  return (
    <div>
      <main className='mt-[20px]'>
        <div className='max-w-[600px] mx-auto'>
          <div className='text-red-600 hover:text-red-600 flex justify-between items-center w-[600px] h-[50px] bg-white font-bold '>
            <div className='ml-[20px]'>
              <Link to='/' className='text-red-600 hover:text-red-600'>
                <i className='fa-solid fa-angle-left'></i> Trở về
              </Link>
            </div>
            <div className='text-[24px]'>Giỏ hàng</div>
          </div>
          <div className='list-cart'>
            {carts.length > 0 ? (
              <table className='table-auto w-full border-collapse'>
                <tbody>
                  {carts.map((item) => (
                    <tr key={item.products.id} className='border-b'>
                      <td className='px-2 py-2 text-right'>
                        <input
                          type='checkbox'
                          checked={checkboxStates[item.products.id] || false}
                          onChange={() => toggleCheckbox(item.products.id)}
                        />
                      </td>
                      <td className='w-32 px-2 py-2'>
                        <div className='w-28 h-20'>
                          <img
                            className='w-full h-full object-cover'
                            src={item.products.thumbnail}
                            alt={item.products.name}
                          />
                        </div>
                      </td>
                      <td className='w-48 px-2 py-2'>
                        <Link to={`/products/${item.products.id}`}>
                          <p className='m-0 text-sm'>{item.products.name}</p>
                        </Link>
                      </td>
                      <td className='w-32 px-2 py-2 text-center'>
                        <div className='flex items-center justify-center'>
                          <button className='rounded w-5 h-5' onClick={() => updateQuantity(item, item.quantity - 1)}>
                            <Minus size={16} />
                          </button>
                          <span className='mx-2'>{item.quantity}</span>
                          <button className='rounded w-5 h-5' onClick={() => updateQuantity(item, item.quantity + 1)}>
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className='px-2 py-2 text-right'>
                        <span>{formatNumber(item.products.price)}</span>
                      </td>
                      <td className='px-2 py-2 text-right'>
                        <button className='rounded w-5 h-5' onClick={() => removeItem(item)}>
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='flex justify-center flex-col items-center'>
                <p>Giỏ hàng của bạn đang trống.</p>
                <p>Hãy chọn thêm sản phẩm để mua sắm nhé.</p>
              </div>
            )}
          </div>
          {carts.length > 0 && isPlaceOrderValid && (
            <div className='total'>
              <div className='font-semibold'>Tổng tiền tạm tính: </div>
              <div className='total-text'>{formatNumber(priceCarts)}</div>
            </div>
          )}
          <div className='uppercase'>
            {carts.length > 0 ? (
              <>
                <Link
                  to='/orders/add'
                  state={{ carts: carts.filter((item) => checkboxStates[item.products.id]), priceCarts }}
                  onClick={(e) => !isPlaceOrderValid && e.preventDefault()}
                >
                  <div
                    className={`max-w-[600px] h-[50px] border-[1px] uppercase font-semibold bg-[#dc3545] text-white rounded-[10px] flex justify-center items-center mb-4 ${isPlaceOrderValid ? '' : 'pointer-events-none opacity-50'}`}
                  >
                    Tiến hành đặt hàng
                  </div>
                </Link>
                <Link to='/'>
                  <div className='max-w-[600px] h-[50px] border-[1px] uppercase font-semibold bg-[#dc3545] text-white rounded-[10px] flex justify-center items-center'>
                    Chọn thêm sản phẩm khác
                  </div>
                </Link>
              </>
            ) : (
              <Link to='/'>
                <div className='max-w-[600px] h-[50px] border-[1px] uppercase font-semibold bg-[#dc3545] text-white rounded-[10px] flex justify-center items-center'>
                  Quay lại trang chủ
                </div>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Cart

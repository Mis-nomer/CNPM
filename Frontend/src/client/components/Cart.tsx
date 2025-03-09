import { deleteCartService, getCartService, updateCartService } from '@/api/carts'
import { message, Modal } from 'antd'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, AlertCircle } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import useAuthUser from '../../hooks/useAuthUser'

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

const EmptyCart = () => (
  <div className='flex flex-col items-center justify-center py-12 px-4'>
    <div className='bg-gray-50 rounded-full p-6 mb-4'>
      <ShoppingBag size={48} className='text-gray-400' />
    </div>
    <h3 className='text-lg font-semibold text-gray-900 mb-2'>Giỏ hàng trống</h3>
    <p className='text-gray-500 text-center mb-6'>Hãy chọn thêm sản phẩm để mua sắm nhé</p>
    <Link to='/' className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors'>
      Tiếp tục mua sắm
    </Link>
  </div>
)

const Cart = () => {
  const { auth: userInfo, error: authError, loading: authLoading } = useAuthUser()
  const [carts, setCarts] = useState<CartItem[]>([])
  const [priceCarts, setPriceCarts] = useState(0)
  const [checkboxStates, setCheckboxStates] = useState<{ [key: number]: boolean }>({})
  const [loading, setLoading] = useState(true)
  const { updateCartCount } = useCart()

  const fetchData = useCallback(async () => {
    try {
      if (authLoading) return
      setLoading(true)
      const result = await getCartService(String(userInfo.id))
      setCarts(result.data)

      console.log(result)
      setCheckboxStates((prevState) => {
        const newCheckboxStates: { [key: number]: boolean } = {}
        result.data.forEach((item: CartItem) => {
          newCheckboxStates[item.products.id] = prevState[item.products.id] || false
        })
        return newCheckboxStates
      })
    } catch (error) {
      console.error(authError)
      message.error('Không thể tải giỏ hàng')
    } finally {
      setLoading(false)
    }
  }, [authLoading])

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
    if (quantity === 0) {
      Modal.confirm({
        title: 'Xóa sản phẩm',
        icon: <AlertCircle className='text-red-500' />,
        content: 'Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?',
        okText: 'Xóa',
        cancelText: 'Hủy',
        okButtonProps: { className: 'bg-red-600' },
        onOk: async () => {
          try {
            await deleteCartService(item.id)
            await fetchData()
            updateCartCount()
            message.success('Đã xóa sản phẩm khỏi giỏ hàng')
          } catch (error) {
            message.error('Không thể xóa sản phẩm')
          }
        }
      })
    } else {
      try {
        await updateCartService({ id: item.id, quantity })
        await fetchData()
        updateCartCount()
        message.success('Đã cập nhật số lượng')
      } catch (error) {
        message.error('Không thể cập nhật số lượng')
      }
    }
  }

  const removeItem = async (item: CartItem) => {
    Modal.confirm({
      title: 'Xóa sản phẩm',
      icon: <AlertCircle className='text-red-500' />,
      content: 'Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { className: 'bg-red-600' },
      onOk: async () => {
        try {
          await deleteCartService(item.id)
          await fetchData()
          updateCartCount()
          message.success('Đã xóa sản phẩm khỏi giỏ hàng')
        } catch (error) {
          message.error('Không thể xóa sản phẩm')
        }
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

  if (loading || authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-600' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-3xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <Link to='/' className='flex items-center text-gray-600 hover:text-red-600 transition-colors'>
            <ArrowLeft className='w-5 h-5 mr-2' />
            <span>Trở về</span>
          </Link>
          <h1 className='text-2xl font-bold text-gray-900'>Giỏ hàng</h1>
        </div>

        {carts.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className='bg-white rounded-lg shadow-sm'>
            <div className='divide-y divide-gray-200'>
              {carts.map((item) => (
                <div key={item.products.id} className='p-4'>
                  <div className='flex items-center gap-4'>
                    <input
                      type='checkbox'
                      checked={checkboxStates[item.products.id] || false}
                      onChange={() => toggleCheckbox(item.products.id)}
                      className='w-4 h-4 text-red-600 rounded focus:ring-red-500'
                    />

                    <div className='flex-shrink-0'>
                      <img
                        src={item.products.thumbnail}
                        alt={item.products.name}
                        className='w-20 h-20 object-cover rounded-lg'
                      />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <Link
                        to={`/products/${item.products.id}`}
                        className='text-sm font-medium text-gray-900 hover:text-red-600 transition-colors line-clamp-2'
                      >
                        {item.products.name}
                      </Link>
                      <p className='mt-1 text-sm text-gray-500'>{formatNumber(item.products.price)}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        className='p-1 hover:bg-gray-100 rounded-full transition-colors'
                      >
                        <Minus size={16} />
                      </button>
                      <span className='w-8 text-center'>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className='p-1 hover:bg-gray-100 rounded-full transition-colors'
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item)}
                      className='p-2 text-gray-400 hover:text-red-600 transition-colors'
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isPlaceOrderValid && (
              <div className='border-t border-gray-200 p-4'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='font-medium text-gray-900'>Tổng tiền tạm tính:</span>
                  <span className='text-lg font-bold text-red-600'>{formatNumber(priceCarts)}</span>
                </div>

                <div className='space-y-3'>
                  <Link
                    to='/orders/add'
                    state={{ carts: carts.filter((item) => checkboxStates[item.products.id]), priceCarts }}
                    className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                      isPlaceOrderValid
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Tiến hành đặt hàng
                  </Link>

                  <Link
                    to='/'
                    className='block w-full text-center py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors'
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

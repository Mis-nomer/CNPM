import { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { getAll, listOnePro } from '@/api/products'
import { addCartService } from '@/api/carts'
import { ChevronRight, Home, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import numeral from 'numeral'
import { useCart } from '../../../context/CartContext'

// Types
interface ProductType {
  id: number
  name: string
  price: number
  salePrice: number
  image: string
  thumbnail: string
  type: string
  quantity: number
  description: string
  screenSize?: string
  screenReslution?: string
  cpu?: string
  ram?: string
  storage?: string
  battery?: string
  operatingSystem?: string
  weight?: string
}

interface UserInfo {
  id: number
  email: string
  username: string
}

interface IAddCart {
  productId: number
  quantity: number
  userId: number
}

interface ProductCardProps {
  item: ProductType
  onClick?: () => void
}

const typeDisplayNames: Record<string, string> = {
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

// Components
const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate(`/products/${item.id}`)
    window.scrollTo(0, 0)
  }, [item.id, navigate])

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
          {item.name}
        </h3>
        <div className="mt-2 space-y-1">
          <div className="text-lg font-bold text-red-600">
            {item.salePrice.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </div>
          <div className="text-sm text-gray-500 line-through">
            {item.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
            <span className="ml-2 text-sm text-gray-500">7 đánh giá</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600" />
  </div>
)

const ErrorState: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">Không tìm thấy sản phẩm</h2>
      <Link to="/" className="mt-4 inline-block text-red-600 hover:text-red-700">
        Quay về trang chủ
      </Link>
    </div>
  </div>
)

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<ProductType | null>(null)
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [addingToCart, setAddingToCart] = useState<boolean>(false)
  const { updateCartCount } = useCart();


  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null') as UserInfo | null

  const handleQuantityChange = useCallback((type: 'increase' | 'decrease') => {
    setQuantity(prev => {
      if (type === 'increase' && product) {
        return Math.min(prev + 1, product.quantity)
      }
      if (type === 'decrease') {
        return Math.max(prev - 1, 1)
      }
      return prev
    })
  }, [product])

  const fetchProductData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: productResponse } = await listOnePro(Number(id))

      if (!productResponse?.data) {
        throw new Error('Product not found')
      }

      setProduct(productResponse.data)

      if (productResponse.data.type) {
        const { data: allProductsResponse } = await getAll()
        const filteredProducts = allProductsResponse.data
          .filter((item: ProductType) =>
            item.type === productResponse.data.type &&
            item.id !== productResponse.data.id
          )
          .slice(0, 5)
        setSimilarProducts(filteredProducts)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      message.error('Không thể tải thông tin sản phẩm')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProductData()
  }, [fetchProductData])

  const addToCart = async (product: ProductType) => {
    try {
      if (!userInfo) {
        message.error('Bạn cần đăng nhập để thêm vào giỏ hàng')
        return
      }

      if (quantity > product.quantity) {
        message.error('Số lượng vượt quá hàng có sẵn')
        return
      }

      setAddingToCart(true)

      const cartData: IAddCart = {
        productId: product.id,
        quantity,
        userId: userInfo.id
      }

      await addCartService(cartData)
      updateCartCount();
      message.success('Thêm vào giỏ hàng thành công')
    } catch (err) {
      message.error('Không thể thêm vào giỏ hàng')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error || !product) return <ErrorState />

  const specifications = [
    { label: 'Kích thước màn hình', value: product.screenSize },
    { label: 'Độ phân giải', value: product.screenReslution },
    { label: 'Chipset', value: product.cpu },
    { label: 'RAM', value: product.ram },
    { label: 'Bộ nhớ trong', value: product.storage },
    { label: 'Pin', value: product.battery },
    { label: 'Hệ điều hành', value: product.operatingSystem },
    { label: 'Trọng lượng', value: product.weight }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={`/product/${product.type}`}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              {typeDisplayNames[product.type]}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900 line-clamp-1">
              {product.name}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square relative rounded-lg overflow-hidden bg-white border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-red-600">
                  {product.salePrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {product.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Số lượng:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                    disabled={quantity <= 1 || addingToCart}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                    disabled={quantity >= product.quantity || addingToCart}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Còn {numeral(product.quantity).format('0,0')} sản phẩm
                </span>
              </div>

              {product.quantity === 0 ? (
                <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg text-gray-500">
                  Hết hàng
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  disabled={addingToCart}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${addingToCart
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                >
                  <ShoppingCart size={20} />
                  {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                </button>
              )}

              {/* Policy Box */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Chính sách mua hàng
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <i className="fas fa-check text-green-600 text-xs" />
                    </div>
                    <span>
                      Máy mới 100%, chính hãng. Hoàn tiền 300% nếu phát hiện hàng giả
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <i className="fas fa-check text-green-600 text-xs" />
                    </div>
                    <span>
                      Bảo hành 12 tháng chính hãng
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <i className="fas fa-check text-green-600 text-xs" />
                    </div>
                    <span>
                      Hỗ trợ đổi mới trong 30 ngày
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications and Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Description */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Đặc điểm nổi bật
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Thông số kỹ thuật
            </h2>
            <dl className="space-y-3">
              {specifications
                .filter(spec => spec.value) // Only show specs that have values
                .map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-2 py-2 border-b border-gray-100 last:border-0"
                  >
                    <dt className="text-gray-600">{spec.label}</dt>
                    <dd className="text-gray-900 font-medium">{spec.value}</dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Sản phẩm tương tự
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similarProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </section>
        )}

        {/* Reviews Section - You can implement this later */}
        <section className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Đánh giá sản phẩm
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold text-gray-900">4.8</div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <div className="text-sm text-gray-500">7 đánh giá</div>
              </div>
            </div>

            {userInfo && (
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Viết đánh giá
              </button>
            )}
          </div>

          {/* Placeholder for review list */}
          <div className="mt-6 text-center text-gray-500">
            Chưa có đánh giá nào cho sản phẩm này
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProductDetail

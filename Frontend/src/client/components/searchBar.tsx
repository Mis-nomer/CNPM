import { getAll } from '@/api/products'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Product {
  id: number
  name: string
  thumbnail: string
  salePrice: number
  type: string
  price: number
  quantity: number
  status: number
}

interface ApiResponse {
  data: Product[]
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response: ApiResponse = await getAll()
        const data = response.data
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([])
      return
    }

    setLoading(true)
    const filteredProducts = products
      .filter((product: Product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filteredProducts)
    setLoading(false)
  }, [searchTerm, products])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleProductClick = (id: number): void => {
    navigate(`/products/${id}`)
  }

  const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div className='relative w-full'>
      <form onSubmit={handleSearch} className='relative'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className='w-full py-2 px-4 pr-10 rounded-lg border-2 border-transparent focus:border-yellow-400 outline-none text-sm transition-all duration-300 placeholder-gray-400'
          placeholder='Bạn cần tìm gì?'
        />
        <button
          type='submit'
          className='absolute right-3 top-1/2 -translate-y-1/2 hover:text-[#ED1C24] transition-colors'
        >
          <i className='fa-solid fa-magnifying-glass' />
        </button>
      </form>

      <div
        className={`
          absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 transition-all duration-300
          ${searchTerm ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        <p className='text-sm text-gray-500'>{loading ? 'Đang tìm kiếm...' : 'Gợi ý tìm kiếm:'}</p>
        <div className='mt-2 space-y-2'>
          {suggestions.length > 0 ? (
            suggestions.map((product: Product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group'
              >
                <img src={product.thumbnail} alt={product.name} className='w-10 h-10 object-cover rounded' />
                <div className='flex-1'>
                  <p className='text-sm font-medium group-hover:text-[#ED1C24] transition-colors'>{product.name}</p>
                  <p className='text-sm text-gray-500'>{formatCurrency(product.salePrice)}</p>
                </div>
              </div>
            ))
          ) : searchTerm ? (
            <p className='text-sm text-gray-500'>Không tìm thấy sản phẩm</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SearchBar

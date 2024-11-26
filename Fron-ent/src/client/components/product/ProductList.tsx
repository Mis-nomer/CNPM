import { getAllProByType } from '@/api/products';
import { ChevronRightIcon, HomeIcon, StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductType } from '../../../type/Product';

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

  useEffect(() => {
    const getData = async (type: String) => {
      const { data } = await getAllProByType(type)
      setProducts(data?.data)
    }
    getData(String(type))
  }, [type])

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
              <HomeIcon className="w-4 h-4 mr-1" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{typeDisplayNames[String(type)]}</span>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((item, index) => (
            <Link
              key={index}
              to={`/products/${item.id}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
            >
              <div className="aspect-w-1 aspect-h-1 relative">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px] mb-2">
                  {item.name}
                </h3>
                <div className="space-y-1 mb-3">
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
                <div className="bg-red-50 rounded-md p-2 mb-3">
                  <p className="text-xs text-red-700 line-clamp-2">
                    [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">7 đánh giá</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main >
    </div >
  )
}

export default ProductList

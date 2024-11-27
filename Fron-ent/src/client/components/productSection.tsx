import { Link } from "react-router-dom";
import { Carousel } from "antd";

interface Product {
    id: string;
    name: string;
    thumbnail: string;
    price: number;
    salePrice: number;
    type: string;
}

interface ProductCardProps {
    item: Product;
}

interface ProductSectionProps {
    optionsByCategory: {
        productTypes: string[];
    };
    filteredProducts: {
        [key: string]: Product[];
    };
    typeDisplayNames: {
        [key: string]: string;
    };
}

const ProductSection = ({ optionsByCategory, filteredProducts, typeDisplayNames }: ProductSectionProps) => {
    return (
        <section className="w-full max-w-screen-xl mx-auto px-4">
            {optionsByCategory.productTypes.map((type: string) => (
                <div key={type} className="mb-10">
                    {/* Box Title */}
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            to={`/product/${type}`}
                            className="text-xl font-bold text-gray-800 hover:text-[#ED1C24] transition-colors"
                        >
                            {typeDisplayNames[type]}
                        </Link>
                        <Link
                            to={`/product/${type}`}
                            className="text-sm font-medium text-gray-500 hover:text-[#ED1C24] transition-colors"
                        >
                            Xem tất cả
                        </Link>
                    </div>

                    <div className="relative product-carousel">
                        {filteredProducts[type]?.length > 4 ? (
                            <Carousel
                                dots={false}
                                arrows
                                slidesToShow={4}
                                className="product-carousel-container"
                                responsive={[
                                    {
                                        breakpoint: 1024,
                                        settings: { slidesToShow: 3 },
                                    },
                                    {
                                        breakpoint: 768,
                                        settings: { slidesToShow: 2 },
                                    },
                                    {
                                        breakpoint: 480,
                                        settings: { slidesToShow: 1 },
                                    },
                                ]}
                            >
                                {filteredProducts[type]?.map((item: Product) => (
                                    <div key={item.id} className="product-slide">
                                        <div className="px-2">
                                            <ProductCard item={item} />
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredProducts[type]?.map((item: Product) => (
                                    <ProductCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};

const ProductCard = ({ item }: ProductCardProps) => {
    if (!item) return null;

    return (
        <Link
            to={`/products/${item.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
            <div className="aspect-w-1 aspect-h-1 relative">
                <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-base font-medium text-gray-800 truncate mb-2">
                    {item.name}
                </h3>
                <div className="flex flex-col gap-1">
                    <span className="text-lg text-[#ED1C24] font-bold">
                        {item.salePrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                        {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>
                <div className="mt-2 p-2 bg-red-50 rounded-md">
                    <p className="text-xs text-red-600 line-clamp-2">
                        [HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ
                    </p>
                </div>
                <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                        >
                            <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                        </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">7 đánh giá</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductSection;

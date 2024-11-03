package vn.com.javaapi.service;

import vn.com.javaapi.bean.ProductsResponse;
import vn.com.javaapi.dto.ProductDTO;

public interface ProductService {
    void addPro(ProductDTO products);

    ProductsResponse listProduct();

    ProductsResponse listProductByType(String type);

    ProductsResponse getProductById(Long id);

    void updatePro(ProductDTO productDTO);

    void updateProductQuantity(Long id, Long quantity);
}

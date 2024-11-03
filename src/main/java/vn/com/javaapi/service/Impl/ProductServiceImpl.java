package vn.com.javaapi.service.Impl;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.com.javaapi.bean.ProductsResponse;
import vn.com.javaapi.constant.ProductContant;
import vn.com.javaapi.dto.ProductDTO;
import vn.com.javaapi.entity.Products;
import vn.com.javaapi.repository.ProductRepository;
import vn.com.javaapi.service.Mapper.ProductMapper;
import vn.com.javaapi.service.ProductService;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final Gson gson;
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    @Override
    public void addPro(ProductDTO request) {
        var startTime = System.currentTimeMillis();
        log.info("Begin create product with request: {}.", gson.toJson(request));
        request.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        request.setStatus(ProductContant.ProductStatus.ACTIVE.getCode());
        Products products = productMapper.toEntityProduct(request);
        log.info("Data products mapping: {}", products);
        productRepository.save(products);
        log.info("Created product successfully Time handler: {} ms.", (System.currentTimeMillis() - startTime));
    }

    public ProductsResponse listProduct() {
        var startTime = System.currentTimeMillis();
        log.info("Begin list product. ");
        List<Products> listProducts = productRepository.findAll();
        //// Get total rows

        List<ProductDTO> productDTOList = productMapper.toDTOProduct(listProducts);
        log.info("End list product with response size {} and Time handler: {} ms.", productDTOList.size(), (System.currentTimeMillis() - startTime));
        return ProductsResponse.builder()
            .code("00")
            .message("List products successful").data(productDTOList)
            .build();
    }

    public ProductsResponse getProductById(Long id) {
        var startTime = System.currentTimeMillis();
        log.info("Begin get product with id: {}.", id);
        Optional<Products> optProducts = productRepository.findById(id);
        if (optProducts.isEmpty()) {
            log.info("User not found at DMS.");
            ProductsResponse.builder()
                .code("01")
                .message("Product does not exist")
                .build();
        }
        Products products = optProducts.get();
        ProductDTO productDTO = productMapper.toDTO(products);

        log.info("End get product with response: {} and Time handler: {} ms.", gson.toJson(productDTO), (System.currentTimeMillis() - startTime));
        return ProductsResponse.builder()
            .code("00")
            .message("Get product successful").data(productDTO)
            .build();
    }

    @Override
    public void updatePro(ProductDTO request) {
        var startTime = System.currentTimeMillis();
        log.info("Begin update product with request: {}.", gson.toJson(request));
        Optional<Products> optProducts = productRepository.findById(request.getId());
        Products products = optProducts.get();
        products.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        products.setPrice(request.getPrice());
        products.setSalePrice(request.getSalePrice());
        products.setQuantity(request.getQuantity());
        products.setImage(request.getImage());
        products.setThumbnail(request.getThumbnail());
        products.setDescription(request.getDescription());
        productRepository.save(products);
        log.info("Update product successfully Time handler: {} ms.", (System.currentTimeMillis() - startTime));
    }

    @Override
    public void updateProductQuantity(Long id, Long quantity) {
        var startTime = System.currentTimeMillis();
        Optional<Products> optProducts = productRepository.findById(id);
        Products products = optProducts.get();
        Long remainingQuantity = products.getQuantity() - quantity;
        products.setQuantity(remainingQuantity);
        productRepository.save(products);
        log.info("Update quantity product successfully Time handler: {} ms.", (System.currentTimeMillis() - startTime));
    }

    @Override
    public ProductsResponse listProductByType(String type) {
        var startTime = System.currentTimeMillis();
        log.info("Begin list product by type: {}.", type);
        List<Products> listProducts = productRepository.findByType(type);
        List<ProductDTO> productDTOList = productMapper.toDTOProduct(listProducts);
        log.info("End list product by type with response size {} and Time handler: {} ms.", productDTOList.size(), (System.currentTimeMillis() - startTime));
        return ProductsResponse.builder()
            .code("00")
            .message("List products successful").data(productDTOList)
            .build();
    }
}

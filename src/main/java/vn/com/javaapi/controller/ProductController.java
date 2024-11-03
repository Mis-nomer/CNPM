package vn.com.javaapi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.com.javaapi.bean.ProductsResponse;
import vn.com.javaapi.bean.ResponseData;
import vn.com.javaapi.constant.BaseResponse;
import vn.com.javaapi.dto.ProductDTO;
import vn.com.javaapi.service.ProductService;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @ExceptionHandler  // đây là hàm xử lý khi trong postman ko có dữ liệu vẫn bấm gửi
    public ResponseEntity<ResponseData> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        log.info("Request data not found: ", ex);
        ResponseData responseData = ResponseData.builder().code("99")
            .message("Data not found!")
            .build();
        return ResponseEntity.badRequest().body(responseData);
    }


    @PostMapping("/add")
    public BaseResponse addProduct(@RequestBody ProductDTO request) {
        log.info("Product: " + request);
        productService.addPro(request);
        return BaseResponse.success();
    }

    @GetMapping
    public ResponseEntity<ProductsResponse> listProducts() {
        return new ResponseEntity<>(productService.listProduct(), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<ProductsResponse> getProductById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @PutMapping("/update")
    public BaseResponse updateProduct(@RequestBody ProductDTO request) {
        log.info("dataa requesst: " + request);
        productService.updatePro(request);
        return BaseResponse.success();
    }

    @GetMapping("/list-product-by-type/{type}")
    public ResponseEntity<ProductsResponse> listProductsByType(@PathVariable("type") String type) {
        return new ResponseEntity<>(productService.listProductByType(type), HttpStatus.OK);
    }

}

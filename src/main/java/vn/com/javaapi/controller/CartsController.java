package vn.com.javaapi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.com.javaapi.bean.CartResponse;
import vn.com.javaapi.bean.ResponseData;
import vn.com.javaapi.constant.BaseResponse;
import vn.com.javaapi.dto.CartsDTO;
import vn.com.javaapi.service.CartService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/carts")
public class CartsController {
    private final CartService cartService;
    @ExceptionHandler  // đây là hàm xử lý khi trong postman ko có dữ liệu vẫn bấm gửi
    public ResponseEntity<ResponseData> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        log.info("Request data not found: ", ex);
        ResponseData responseData = ResponseData.builder().code("99")
            .message("Data not found!")
            .build();
        return ResponseEntity.badRequest().body(responseData);
    }

    @PostMapping("/add")
    public BaseResponse addCart(@RequestBody CartsDTO request) {
        cartService.addCart(request);
        return BaseResponse.success();
    }
    @GetMapping("/users/{userId}")
    public ResponseEntity<CartResponse> listCarts(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(cartService.listCarts(userId), HttpStatus.OK);
    }

    @PutMapping("/update")
    public BaseResponse updateCart(@RequestBody CartsDTO request) {
        cartService.updateCart(request);
        return BaseResponse.success();
    }

    @DeleteMapping("/delete/{id}")
    public BaseResponse deleteCart(@PathVariable("id") Long id) {
        cartService.deleteCart(id);
        return BaseResponse.success();
    }
}

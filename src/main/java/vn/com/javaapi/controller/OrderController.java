package vn.com.javaapi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import vn.com.javaapi.bean.OrderRequest;
import vn.com.javaapi.bean.OrderResponse;
import vn.com.javaapi.bean.ResponseData;
import vn.com.javaapi.constant.BaseResponse;
import vn.com.javaapi.dto.OrderDTO;
import vn.com.javaapi.service.OrderService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @ExceptionHandler  // đây là hàm xử lý khi trong postman ko có dữ liệu vẫn bấm gửi
    public ResponseEntity<ResponseData> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        log.info("Request data not found: ", ex);
        ResponseData responseData = ResponseData.builder().code("99")
            .message("Data not found!")
            .build();
        return ResponseEntity.badRequest().body(responseData);
    }

    @PostMapping("/add")
    public BaseResponse addOrder(@RequestBody OrderRequest request) {
        log.info("Order: " + request);
        orderService.addOrder(request);
        return BaseResponse.success();
    }

    @GetMapping("/list-orders-admin")
    public ResponseEntity<OrderResponse> listOrder() {
        return ResponseEntity.ok(orderService.listOrders());
    }

    @GetMapping("/list-detail-admin/{id}")
    public ResponseEntity<OrderResponse> listDetailOrder(@PathVariable("id") Long id) {
        return ResponseEntity.ok(orderService.listDetailOrders(id));
    }

    @PutMapping("/update-status")
    public BaseResponse updateStatusOrder(@RequestBody OrderDTO request) {
        orderService.updateStatusOrder(request);
        return BaseResponse.success();
    }

    @GetMapping("/list-orders-by-user/{userId}")
    public ResponseEntity<OrderResponse> listOrdersByUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(orderService.listOrdersByUser(userId));
    }
}

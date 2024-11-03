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
import vn.com.javaapi.bean.ResponseData;
import vn.com.javaapi.bean.UserResponse;
import vn.com.javaapi.constant.BaseResponse;
import vn.com.javaapi.dto.OrderDTO;
import vn.com.javaapi.dto.UserDTO;
import vn.com.javaapi.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UsersController {
    private final UserService userService;

    @ExceptionHandler  // đây là hàm xử lý khi trong postman ko có dữ liệu vẫn bấm gửi
    public ResponseEntity<ResponseData> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        log.info("Request data not found: ", ex);
        ResponseData responseData = ResponseData.builder().code("99")
            .message("Data not found!")
            .build();
        return ResponseEntity.badRequest().body(responseData);
    }

    @GetMapping
    public ResponseEntity<UserResponse> getAllUser() {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<UserResponse> detailUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.getOneUser(id), HttpStatus.OK);
    }

    @PutMapping("/update")
    public BaseResponse updateUser(@RequestBody UserDTO request) {
        userService.updateUser(request);
        return BaseResponse.success();
    }
}

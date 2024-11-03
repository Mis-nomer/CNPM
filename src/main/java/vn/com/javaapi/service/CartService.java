package vn.com.javaapi.service;

import vn.com.javaapi.bean.CartResponse;
import vn.com.javaapi.dto.CartsDTO;


public interface CartService {
    void addCart(CartsDTO cartsDTO);

    CartResponse listCarts(Long userId);

    void updateCart(CartsDTO cartsDTO);

    void deleteCart(Long id);

}

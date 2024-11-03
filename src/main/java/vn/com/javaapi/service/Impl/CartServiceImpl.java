package vn.com.javaapi.service.Impl;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.com.javaapi.bean.CartResponse;
import vn.com.javaapi.bean.CartsData;
import vn.com.javaapi.dto.CartsDTO;
import vn.com.javaapi.entity.Carts;
import vn.com.javaapi.entity.Products;
import vn.com.javaapi.repository.CartRepository;
import vn.com.javaapi.repository.ProductRepository;
import vn.com.javaapi.service.CartService;
import vn.com.javaapi.service.Mapper.CartsMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final Gson gson;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartsMapper cartsMapper;

    @Override
    public void addCart(CartsDTO request) {
        var startTime = System.currentTimeMillis();
        log.info("Begin create cart with request: {}.", gson.toJson(request));
        Optional<Carts> optionalCarts = cartRepository.findCartByProAndUser(request.getUserId(), request.getProductId());
        if (optionalCarts.isPresent()) {
            Carts existingCart = optionalCarts.get();
            existingCart.setQuantity(existingCart.getQuantity() + request.getQuantity());
            cartRepository.save(existingCart);
            log.info("Updated cart entry: {}", existingCart);
        } else {
            Carts newCart = cartsMapper.toEntityProduct(request);
            cartRepository.save(newCart);
            log.info("Created new cart entry: {}", newCart);
        }
        log.info("Created product successfully Time handler: {} ms.", (System.currentTimeMillis() - startTime));
    }

    @Override
    public CartResponse listCarts(Long userId) {
        var startTime = System.currentTimeMillis();
        log.info("Begin list product. ");
        List<Carts> listCarts = cartRepository.findAllCartByUser(userId);
        List<Products> listProducts = productRepository.findAll();
        log.info("List cart by user: {}", gson.toJson(listCarts));
        log.info("List cart by user: {}", gson.toJson(listProducts));
        Map<Long, Products> productMap = listProducts.stream()
            .collect(Collectors.toMap(Products::getId, product -> product));

        List<CartsData> cartDataList = new ArrayList<>();
        for (Carts cart : listCarts) {
            Products product = productMap.get(cart.getProductId());
            CartsData cartsData = CartsData.builder()
                .id(cart.getId())
                .userId(cart.getUserId())
                .quantity(cart.getQuantity())
                .products(product)
                .build();
            cartDataList.add(cartsData);
        }
        // Create the list of CartResponse objects
        CartResponse cartResponses = CartResponse.builder()
            .code("00")
            .message("Cart retrieved successfully")
            .data(cartDataList)
            .build();
        // Optionally log the final response
        log.info("Cart responses: {}", gson.toJson(cartResponses));
        return cartResponses;
    }

    @Override
    public void updateCart(CartsDTO request) {
        var startTime = System.currentTimeMillis();
        log.info("Begin update quantity carts by user with request: {}.", gson.toJson(request));
        Optional<Carts> otpCart = cartRepository.findById(request.getId());
        Carts carts = otpCart.get();
        carts.setQuantity(request.getQuantity());
        cartRepository.save(carts);
        log.info("Update cartId {} success and Time handler: {} ms.", request.getId(),
            (System.currentTimeMillis() - startTime));
    }

    @Override
    public void deleteCart(Long id) {
        var startTime = System.currentTimeMillis();
        log.info("Begin delete  carts by id with request: {}.", id);
        cartRepository.deleteById(id);
        log.info("Delete cartId {} success and Time handler: {} ms.", id,
            (System.currentTimeMillis() - startTime));
    }
}

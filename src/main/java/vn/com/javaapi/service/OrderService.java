package vn.com.javaapi.service;

import vn.com.javaapi.bean.OrderRequest;
import vn.com.javaapi.bean.OrderResponse;
import vn.com.javaapi.dto.OrderDTO;

public interface OrderService {
    void addOrder(OrderRequest request);

    OrderResponse listOrders();

    OrderResponse listDetailOrders(Long id);

    OrderResponse listOrdersByUser(Long userId);

    void updateStatusOrder(OrderDTO request);

}

package vn.com.javaapi.service.Impl;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.com.javaapi.bean.OrderDataRes;
import vn.com.javaapi.bean.OrderRequest;
import vn.com.javaapi.bean.OrderResponse;
import vn.com.javaapi.constant.OrderContact.OrderStatus;
import vn.com.javaapi.dto.OrderDTO;
import vn.com.javaapi.entity.OrderDetails;
import vn.com.javaapi.entity.Orders;
import vn.com.javaapi.entity.Products;
import vn.com.javaapi.repository.OrderDetailRepository;
import vn.com.javaapi.repository.OrderRepository;
import vn.com.javaapi.repository.ProductRepository;
import vn.com.javaapi.service.Mapper.OrderMapper;
import vn.com.javaapi.service.OrderService;
import vn.com.javaapi.service.ProductService;
import vn.com.javaapi.utils.GenerateCode;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final Gson gson;
    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;
    private final OrderDetailRepository orderDetailRepository;


    @Override
    public void addOrder(OrderRequest request) {
        var startTime = System.currentTimeMillis();
        log.info("Begin create order with request: {}.", gson.toJson(request));
        Timestamp newTimestamp = Timestamp.valueOf(LocalDateTime.now().plusDays(5));
        Orders orders = Orders.builder()
            .userId(request.getUserId())
            .orderDate(new Timestamp(System.currentTimeMillis()))
            .name(request.getName())
            .orderCode(GenerateCode.generateCode())
            .phone(request.getPhone())
            .address(request.getAddress())
            .totalAmount(request.getTotalAmount())
            .orderStatus(OrderStatus.ORDER_PLACED.getMessage())
            .deliveryDate(newTimestamp)
            .notes(request.getNotes())
            .build();
        orderRepository.save(orders);
        Long id = orders.getId();
        request.getOrderDetail().forEach(orderDetailReq -> {
            OrderDetails orderDetails = OrderDetails.builder()
                .orderId(id)
                .productId(orderDetailReq.getProductId())
                .quantity(orderDetailReq.getQuantity())
                .unitPrice(orderDetailReq.getUnitPrice())
                .build();
            orderDetailRepository.save(orderDetails);
            productService.updateProductQuantity(orderDetailReq.getProductId(), orderDetailReq.getQuantity());
        });
        log.info("Created order successfully Time handler: {} ms.",
            (System.currentTimeMillis() - startTime));
    }

    @Override
    public OrderResponse listOrders() {
        var startTime = System.currentTimeMillis();
        log.info("Begin list order. ");
        List<Orders> listOrders = orderRepository.findAll();
        listOrders.sort((order1, order2) -> order2.getOrderDate().compareTo(order1.getOrderDate()));
        log.info("End list orders with response size {} and Time handler: {} ms.", listOrders.size(), (System.currentTimeMillis() - startTime));
        return OrderResponse.builder()
            .code("00")
            .message("List products successful").data(listOrders)
            .build();
    }

    @Override
    public OrderResponse listDetailOrders(Long id) {
        var startTime = System.currentTimeMillis();
        log.info("Begin list detail order. ");
        Optional<Orders> optionalOrderDetails = orderRepository.findById(id);
        if (optionalOrderDetails.isEmpty()) {
            log.info("Orders not found at DB.");
            OrderResponse.builder()
                .code("01")
                .message("Order does not exist")
                .build();
        }
        Orders orders = optionalOrderDetails.get();
        OrderDTO orderDTO = orderMapper.toDTO(orders);
        List<OrderDetails> listOrderDetails = orderDetailRepository.findAllByOrderId(orderDTO.getId());
        // Tạo danh sách mới để lưu thông tin của sản phẩm
        List<OrderDataRes.OrderDetails> orderDetailsList = new ArrayList<>();
        for (OrderDetails orderDetail : listOrderDetails) {
            OrderDataRes.OrderDetails orderDetails = OrderDataRes.OrderDetails.builder()
                .id(orderDetail.getId())
                .orderId(orderDetail.getOrderId())
                .productId(orderDetail.getProductId())
                .quantity(orderDetail.getQuantity())
                .unitPrice(orderDetail.getUnitPrice())
                .build();
            Optional<Products> optProducts = productRepository.findById(orderDetail.getProductId());
            Products products = optProducts.get();
            orderDetails.setName(products.getName());
            orderDetails.setImage(products.getImage());
            orderDetailsList.add(orderDetails);
        }

        // Gắn danh sách orderDetails đã có thông tin sản phẩm vào orderData
        OrderDataRes orderData = OrderDataRes.builder()
            .id(orderDTO.getId())
            .userId(orderDTO.getUserId())
            .orderDate(orderDTO.getOrderDate())
            .orderCode(orderDTO.getOrderCode())
            .name(orderDTO.getName())
            .phone(orderDTO.getPhone())
            .address(orderDTO.getAddress())
            .totalAmount(orderDTO.getTotalAmount())
            .orderStatus(orderDTO.getOrderStatus())
            .deliveryDate(orderDTO.getDeliveryDate())
            .notes(orderDTO.getNotes())
            .orderDetails(orderDetailsList)
            .build();

        log.info("OrderDetails: " + listOrderDetails);
        return OrderResponse.builder()
            .code("00")
            .message("List products successful").data(orderData)
            .build();
    }

    @Override
    public void updateStatusOrder(OrderDTO request) {
        var startTime = System.currentTimeMillis();
        log.info("Begin update status order. ");
        Optional<Orders> optionalOrderDetails = orderRepository.findById(request.getId());
        if (optionalOrderDetails.isEmpty()) {
            log.info("Orders not found at DB.");
            OrderResponse.builder()
                .code("01")
                .message("Order does not exist")
                .build();
        }
        Orders orders = optionalOrderDetails.get();
        orders.setOrderStatus(request.getOrderStatus());
        if (OrderStatus.ORDER_SHIPPING.getMessage().equals(request.getOrderStatus()) || OrderStatus.ORDER_DELIVERED.getMessage().equals(request.getOrderStatus())) {
            orders.setDeliveryDate(new Timestamp(System.currentTimeMillis()));
        }
        orderRepository.save(orders);
        log.info("Update status order successfully Time handler: {} ms.", (System.currentTimeMillis() - startTime));
    }

    @Override
    public OrderResponse listOrdersByUser(Long userId) {
        var startTime = System.currentTimeMillis();
        log.info("Begin list order by user.");

        // Tìm kiếm danh sách đơn hàng của người dùng theo userId
        List<Orders> listOrders = orderRepository.findAllOrderByUserId(userId);
        listOrders.sort((order1, order2) -> order2.getOrderDate().compareTo(order1.getOrderDate()));
        // Tạo một danh sách để lưu thông tin của từng đơn hàng
        List<OrderDataRes> orderDataList = new ArrayList<>();

        // Duyệt qua từng đơn hàng và lấy thông tin chi tiết của mỗi đơn hàng
        for (Orders order : listOrders) {
            // Lấy danh sách chi tiết đơn hàng của mỗi đơn hàng
            List<OrderDetails> listOrderDetails = orderDetailRepository.findAllByOrderId(order.getId());

            // Tạo danh sách mới để lưu thông tin chi tiết của sản phẩm trong đơn hàng
            List<OrderDataRes.OrderDetails> orderDetailsList = new ArrayList<>();

            // Duyệt qua từng chi tiết đơn hàng và lấy thông tin sản phẩm tương ứng
            for (OrderDetails orderDetail : listOrderDetails) {
                // Tạo đối tượng OrderDataRes.OrderDetails từ thông tin chi tiết đơn hàng
                OrderDataRes.OrderDetails orderDetails = OrderDataRes.OrderDetails.builder()
                    .id(orderDetail.getId())
                    .orderId(orderDetail.getOrderId())
                    .productId(orderDetail.getProductId())
                    .quantity(orderDetail.getQuantity())
                    .unitPrice(orderDetail.getUnitPrice())
                    .build();

                // Lấy thông tin sản phẩm từ productId và gắn vào orderDetails
                Optional<Products> optProduct = productRepository.findById(orderDetail.getProductId());
                optProduct.ifPresent(product -> {
                    orderDetails.setName(product.getName());
                    orderDetails.setImage(product.getImage());
                });

                // Thêm orderDetails vào danh sách chi tiết đơn hàng
                orderDetailsList.add(orderDetails);
            }

            // Tạo đối tượng OrderDataRes chứa thông tin của mỗi đơn hàng
            OrderDataRes orderData = OrderDataRes.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .orderDate(order.getOrderDate())
                .orderCode(order.getOrderCode())
                .name(order.getName())
                .phone(order.getPhone())
                .address(order.getAddress())
                .totalAmount(order.getTotalAmount())
                .orderStatus(order.getOrderStatus())
                .deliveryDate(order.getDeliveryDate())
                .notes(order.getNotes())
                .orderDetails(orderDetailsList)
                .build();

            // Thêm orderData vào danh sách orderDataList
            orderDataList.add(orderData);
        }

        log.info("List of orders: " + orderDataList);

        // Trả về danh sách đơn hàng kèm theo mã code và thông báo thành công
        return OrderResponse.builder()
            .code("00")
            .message("List orders successful")
            .data(orderDataList)
            .build();
    }

}

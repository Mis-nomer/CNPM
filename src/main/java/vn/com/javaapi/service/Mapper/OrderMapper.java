package vn.com.javaapi.service.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import vn.com.javaapi.dto.OrderDTO;
import vn.com.javaapi.entity.Orders;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface OrderMapper {
    @Mapping(target = "id", source = "orders.id")
    @Mapping(target = "userId", source = "orders.userId")
    @Mapping(target = "orderDate", source = "orders.orderDate")
    @Mapping(target = "name", source = "orders.name")
    @Mapping(target = "orderCode", source = "orders.orderCode")
    @Mapping(target = "phone", source = "orders.phone")
    @Mapping(target = "address", source = "orders.address")
    @Mapping(target = "totalAmount", source = "orders.totalAmount")
    @Mapping(target = "orderStatus", source = "orders.orderStatus")
    @Mapping(target = "deliveryDate", source = "orders.deliveryDate")
    @Mapping(target = "notes", source = "orders.notes")
    OrderDTO toDTO(Orders orders);

    List<OrderDTO> toDTOOrders(List<Orders> orders);

    Orders toEntityOrders(OrderDTO userDTO);
}

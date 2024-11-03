package vn.com.javaapi.service.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import vn.com.javaapi.dto.CartsDTO;
import vn.com.javaapi.entity.Carts;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CartsMapper {
    @Mapping(target = "id", source = "carts.id")
    @Mapping(target = "quantity", source = "carts.quantity")
    @Mapping(target = "userId", source = "carts.userId")
    @Mapping(target = "productId", source = "carts.productId")
    CartsDTO toDTO(Carts carts);

    List<CartsDTO> toDTOProduct(List<Carts> carts);

    Carts toEntityProduct(CartsDTO cartsDTO);
}

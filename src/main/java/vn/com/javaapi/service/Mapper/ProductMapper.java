package vn.com.javaapi.service.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import vn.com.javaapi.dto.ProductDTO;
import vn.com.javaapi.entity.Products;

import java.util.List;


@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductMapper {

    @Mapping(target = "id", source = "products.id")
    @Mapping(target = "name", source = "products.name")
    @Mapping(target = "type", source = "products.type")
    @Mapping(target = "brand", source = "products.brand")
    @Mapping(target = "description", source = "products.description")
    @Mapping(target = "battery", source = "products.battery")
    @Mapping(target = "cpu", source = "products.cpu")
    @Mapping(target = "createdAt", source = "products.createdAt")
    @Mapping(target = "updatedAt", source = "products.updatedAt")
    @Mapping(target = "operatingSystem", source = "products.operatingSystem")
    @Mapping(target = "ram", source = "products.ram")
    @Mapping(target = "screenReslution", source = "products.screenReslution")
    @Mapping(target = "screenSize", source = "products.screenSize")
    @Mapping(target = "status", source = "products.status")
    @Mapping(target = "storage", source = "products.storage")
    @Mapping(target = "thumbnail", source = "products.thumbnail")
    @Mapping(target = "image", source = "products.image")
    @Mapping(target = "weight", source = "products.weight")
    @Mapping(target = "price", source = "products.price")
    @Mapping(target = "salePrice", source = "products.salePrice")
    @Mapping(target = "quantity", source = "products.quantity")
    @Mapping(target = "productView", source = "products.productView")
    ProductDTO toDTO(Products products);

    List<ProductDTO> toDTOProduct(List<Products> products);

    Products toEntityProduct(ProductDTO productDTO);
}

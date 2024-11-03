package vn.com.javaapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    @JsonProperty("id")
    private Long id;
    private String name;
    private String type;
    private String brand;
    private String description;
    private String battery;
    private String cpu;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String operatingSystem;
    private String ram;
    private String screenReslution;
    private String screenSize;
    private Integer status;
    private String storage;
    private String thumbnail;
    private String image;
    private String weight;
    private BigDecimal price;
    private BigDecimal salePrice;
    private Long quantity;
    private Long productView;
}

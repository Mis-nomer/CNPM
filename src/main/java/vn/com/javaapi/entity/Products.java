package vn.com.javaapi.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String brand;
    private String description;
    private String battery;
    private String cpu;
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "operating_system")
    private String operatingSystem;
    private String ram;
    @Column(name = "screen_reslution")
    private String screenReslution;
    @Column(name = "screen_size")
    private String screenSize;
    private Integer status;
    private String storage;
    private String thumbnail;
    private String image;
    private String weight;
    private BigDecimal price;
    @Column(name = "sale_price")
    private BigDecimal salePrice;
    private Long quantity;
    @Column(name = "product_view")
    private Long productView;

}

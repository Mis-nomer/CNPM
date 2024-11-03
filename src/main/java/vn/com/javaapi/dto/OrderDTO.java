package vn.com.javaapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Long id;
    private Long userId;
    private Timestamp orderDate;
    private String name;
    private String orderCode;
    private String phone;
    private String address;
    private BigDecimal totalAmount;
    private String orderStatus;
    private Timestamp deliveryDate;
    private String notes;
}

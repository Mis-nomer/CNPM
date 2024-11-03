package vn.com.javaapi.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Data
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Long userId;
    private String name;
    private String orderCode;
    private String phone;
    private String address;
    private BigDecimal totalAmount;
    private String notes;
    private List<OrderDetailReq> orderDetail;
}

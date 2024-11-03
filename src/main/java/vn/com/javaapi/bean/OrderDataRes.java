package vn.com.javaapi.bean;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDataRes {
    private Long id;
    private Long userId;
    private Timestamp orderDate;
    private String name;
    private String phone;
    private String orderCode;
    private String address;
    private BigDecimal totalAmount;
    private String orderStatus;
    private Timestamp deliveryDate;
    private String notes;
    private List<OrderDetails> orderDetails;
    // Class lồng bên trong
    @Data
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderDetails {
        private Long id;
        private Long orderId;
        private Long productId;
        private Long quantity;
        private BigDecimal unitPrice;
        private String image;
        private String name;
    }
}

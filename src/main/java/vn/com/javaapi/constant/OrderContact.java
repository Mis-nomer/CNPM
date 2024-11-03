package vn.com.javaapi.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class OrderContact {


    @Getter
    @AllArgsConstructor
    public enum OrderStatus {
        ORDER_PLACED("Đặt hàng thành công"),
        ORDER_PREPARING("Đang chuẩn bị hàng"),
        ORDER_SHIPPING("Đang giao hàng"),
        ORDER_DELIVERED("Đã giao hàng"),
        ORDER_RECEIVED("Đã nhận hàng"),
        ORDER_CANCELLED("Hủy đơn hàng");
        private final String message;
    }
}

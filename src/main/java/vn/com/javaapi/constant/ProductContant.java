package vn.com.javaapi.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class ProductContant {
    public static final int ACTIVE_STATUS = 1;
    public static final int LOCK_STATUS = 4;

    @Getter
    @AllArgsConstructor
    public enum ProductStatus {
        ACTIVE(1, "Active"),
        LOCKED(2, "Locked");

        private final Integer code;
        private final String message;
    }
}

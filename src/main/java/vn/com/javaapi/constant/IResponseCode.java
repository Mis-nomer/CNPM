package vn.com.javaapi.constant;

/**
 * @author linhdq
 * @since 05/08/2022 2:00 PM
 * @description
 */

public interface IResponseCode {
    String getCode();

    String getMessage();

    default boolean codeIs(String code) {
        return this.getCode().equals(code);
    }

}

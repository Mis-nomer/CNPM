package vn.com.javaapi.constant;

/**
 * @author linhdq
 */
public enum ResponseCode implements IResponseCode {

    SUCCESS("00", "Success"),
    INVALID_REQUEST("01", "Invalid request"),
    TIMEOUT("08", "Hệ thống bị gián đoạn, vui lòng thực hiện lại."),

    UNAUTHORIZED("10", "Unauthorized"),
    FORBIDDEN("11", "Forbidden"),
    SYSTEM_MAINTAINING("96", "System is maintaining."),
    EXCEPTION("99", "Internal System Error...!");


    ResponseCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    private final String code;
    private final String message;

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

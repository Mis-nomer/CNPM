package vn.com.javaapi.constant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Collection;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse implements Serializable {
    private String code;
    private String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public static BaseResponse ok(Object data) {
        return of(ResponseCode.SUCCESS, data);
    }

    public static BaseResponse of(IResponseCode responseCode) {
        return of(responseCode, null);
    }

    public static BaseResponse of(IResponseCode responseCode, Object data) {
        return of(responseCode.getCode(), responseCode.getMessage(), data);
    }

    public static BaseResponse of(String code, String message) {
        return of(code, message, null);
    }

    public static BaseResponse success() {
        return of(ResponseCode.SUCCESS);
    }

    public static BaseResponse exception() {
        return of(ResponseCode.EXCEPTION);
    }

    public static BaseResponse timeout() {
        return of(ResponseCode.TIMEOUT);
    }

    @JsonIgnore
    public static BaseResponse of(String code, String message, Object data) {
        return BaseResponse.builder().code(code).message(message).data(data).build();
    }

    @JsonIgnore
    public boolean is(IResponseCode responseCode) {
        return this.code.equals(responseCode.getCode());
    }

    @JsonIgnore
    public boolean isNot(IResponseCode responseCode) {
        return !is(responseCode);
    }

    @JsonIgnore
    public boolean isSuccess() {
        return is(ResponseCode.SUCCESS);
    }

    @JsonIgnore
    public boolean isNotSuccess() {
        return !isSuccess();
    }

    @Override
    public String toString() {
        String dataToPrint = null;
        if (data != null) {
            boolean isCollection = data instanceof Collection;
            dataToPrint = isCollection ? String.valueOf(((Collection<?>) data).size()) : data.toString();
        }
        return "BaseResponse{" +
            "code='" + code + '\'' +
            ", message='" + message + '\'' +
            ", data=" + dataToPrint +
            '}';
    }
}

package vn.com.javaapi.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ObjectUtil {
    private static final Gson gson = new GsonBuilder().serializeNulls().create();

    // chuyển đổi dạng to string sang dạng json
    public static <T> String toJson(T object) {
        return gson.toJson(object);
    }
}

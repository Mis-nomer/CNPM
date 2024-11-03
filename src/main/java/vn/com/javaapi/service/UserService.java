package vn.com.javaapi.service;

import vn.com.javaapi.bean.UserResponse;
import vn.com.javaapi.dto.UserDTO;

public interface UserService {
    UserResponse getOneUser(Long userId);

    UserResponse getAllUser();

    void updateUser(UserDTO user);
}

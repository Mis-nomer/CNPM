package vn.com.javaapi.service;

import vn.com.javaapi.bean.AuthResponse;
import vn.com.javaapi.dto.UserDTO;
import vn.com.javaapi.entity.Users;

public interface AuthService {
    AuthResponse Signup(UserDTO users);

    AuthResponse Login(Users users);
}

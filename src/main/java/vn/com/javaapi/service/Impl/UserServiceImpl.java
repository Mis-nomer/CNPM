package vn.com.javaapi.service.Impl;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import vn.com.javaapi.bean.UserResponse;
import vn.com.javaapi.dto.UserDTO;
import vn.com.javaapi.entity.Users;
import vn.com.javaapi.repository.UserRepository;
import vn.com.javaapi.service.Mapper.UserMapper;
import vn.com.javaapi.service.UserService;
import vn.com.javaapi.utils.HashUtil;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final Gson gson;

    @Override
    public UserResponse getOneUser(Long userId) {
        var startTime = System.currentTimeMillis();
        log.info("Begin get detail one user: {}", userId);
        Optional<Users> optUsers = userRepository.findById(userId);
        if (optUsers.isEmpty()) {
            log.info("User not found at DB.");
            UserResponse.builder()
                .code("01")
                .message("User does not exist")
                .build();
        }
        Users users = optUsers.get();
        UserDTO userDTO = userMapper.toDTO(users);
        userDTO.setPassword(null);
        log.info("End get user with response: {} and Time handler: {} ms.", gson.toJson(userDTO), (System.currentTimeMillis() - startTime));
        return UserResponse.builder().code("00").message("Success").data(userDTO).build();
    }

    @Override
    public UserResponse getAllUser() {
        var startTime = System.currentTimeMillis();
        log.info("Begin get all user.");
        List<Users> listUsers = userRepository.findAll();
        List<UserDTO> listUserDTO = userMapper.toDTOUser(listUsers);
        log.info("End list user  with response size {} and Time handler: {} ms.", listUserDTO.size(), (System.currentTimeMillis() - startTime));
        return UserResponse.builder()
            .code("00")
            .message("List products successful").data(listUserDTO)
            .build();
    }

    @Override
    public void updateUser(UserDTO user) {
        var startTime = System.currentTimeMillis();
        log.info("Begin update user with request: {}.", gson.toJson(user));
        Optional<Users> optUsers = userRepository.findById(user.getUserId());
        Users users = optUsers.get();
        users.setName(user.getName());
        if (user.getPassword() != null) {
            users.setPassword(HashUtil.hash256PassWord(user.getPassword()));
        }
        users.setRoleId(user.getRoleId());
        users.setAddress(user.getAddress());
        users.setPhone(user.getPhone());
        users.setBirthday(user.getBirthday());
        users.setIsEnabled(user.getIsEnabled());
        users.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        userRepository.save(users);
        log.info("End update user with response: {} and Time handler: {} ms.", gson.toJson(users), (System.currentTimeMillis() - startTime));
    }
}

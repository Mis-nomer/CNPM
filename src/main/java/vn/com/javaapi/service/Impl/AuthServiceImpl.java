package vn.com.javaapi.service.Impl;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import vn.com.javaapi.bean.AuthResponse;
import vn.com.javaapi.constant.Constant;
import vn.com.javaapi.dto.UserDTO;
import vn.com.javaapi.entity.Users;
import vn.com.javaapi.repository.AuthRepository;
import vn.com.javaapi.service.AuthService;
import vn.com.javaapi.service.Mapper.UserMapper;
import vn.com.javaapi.utils.CheckToken;
import vn.com.javaapi.utils.HashUtil;
import vn.com.javaapi.utils.ObjectUtil;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Optional;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Value("${app.jwt.secret}")
    private String SECRET_KEY;

    @Value("${app.jwt.expiration}")
    private Long jwtExpiration;

    private final CheckToken checkToken;
    private final TemplateEngine templateEngine;
    private final AuthRepository authRepository;
    private final UserMapper userMapper;

    @Override
    public AuthResponse Signup(UserDTO userDTO) {
        try {
            log.info("Starting signup process for user: {}", ObjectUtil.toJson(userDTO));

            // Validate required fields
            if (userDTO.getEmail() == null || userDTO.getEmail().trim().isEmpty() ||
                userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
                return AuthResponse.builder()
                    .code("04")
                    .message("Email and password are required")
                    .build();
            }

            // Validate email format
            if (!userDTO.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                return AuthResponse.builder()
                    .code("05")
                    .message("Invalid email format")
                    .build();
            }

            // Check if email exists
            Optional<Users> optionalUserByEmail = authRepository.findByEmail(userDTO.getEmail());
            if (optionalUserByEmail.isPresent()) {
                log.info("Email {} is already registered", userDTO.getEmail());
                return AuthResponse.builder()
                    .code("02")
                    .message("Email is already registered")
                    .build();
            }

            // Generate username from email if not provided
            if (userDTO.getUsername() == null || userDTO.getUsername().trim().isEmpty()) {
                String userName = userDTO.getEmail().split("@")[0];
                userDTO.setUsername(userName);
            }

            // Set default values
            userDTO.setPassword(HashUtil.hash256PassWord(userDTO.getPassword()));
            userDTO.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            userDTO.setRoleId(1); // Default role
            userDTO.setIsEnabled(1); // Enable by default

            log.info("Processed signup data: {}", ObjectUtil.toJson(userDTO));

            // Convert DTO to entity and save
            Users newUser = userMapper.toEntityUsers(userDTO);
            Users savedUser = authRepository.save(newUser);
            log.info("User saved successfully with ID: {}", savedUser.getId());

            // Create response with user data
            UserDTO responseUserDTO = userMapper.toDTO(savedUser);

            return AuthResponse.builder()
                .code("00")
                .message("Sign-up successful")
                .data(new HashMap<>() {{
                    put("user", responseUserDTO);
                }})
                .build();

        } catch (Exception e) {
            log.error("Error during signup process: ", e);
            return AuthResponse.builder()
                .code("99")
                .message("System error occurred during signup")
                .build();
        }
    }

    @Override
    public AuthResponse Login(Users loginRequest) {
        try {
            log.info("Processing login request for email: {}", loginRequest.getEmail());

            // Validate input
            if (loginRequest == null ||
                loginRequest.getEmail() == null ||
                loginRequest.getEmail().trim().isEmpty() ||
                loginRequest.getPassword() == null ||
                loginRequest.getPassword().trim().isEmpty()) {
                return AuthResponse.builder()
                    .code("01")
                    .message("Email and password are required")
                    .build();
            }

            // Validate email format
            if (!loginRequest.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                return AuthResponse.builder()
                    .code("02")
                    .message("Invalid email format")
                    .build();
            }

            // Find user by email
            Optional<Users> userOptional = authRepository.findByEmail(loginRequest.getEmail());
            if (userOptional.isEmpty()) {
                log.warn("Login failed: User not found with email: {}", loginRequest.getEmail());
                return AuthResponse.builder()
                    .code("03")
                    .message("Invalid email or password")
                    .build();
            }

            Users user = userOptional.get();

            // Check if user is enabled
            if (user.getIsEnabled() != null && user.getIsEnabled() != 1) {
                log.warn("Login attempt for disabled account: {}", loginRequest.getEmail());
                return AuthResponse.builder()
                    .code("04")
                    .message("Account is disabled. Please contact support.")
                    .build();
            }

            // Verify password
            String hashedInputPassword = HashUtil.hash256PassWord(loginRequest.getPassword());
            if (!hashedInputPassword.equalsIgnoreCase(user.getPassword())) {
                log.warn("Login failed: Invalid password for email: {}", loginRequest.getEmail());
                return AuthResponse.builder()
                    .code("05")
                    .message("Invalid email or password")
                    .build();
            }

            // Create UserDTO for response
            UserDTO userDTO = userMapper.toDTO(user);

            // Generate JWT token
            String token = generateToken(user);

            // Update last login time
            user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            authRepository.save(user);

            log.info("Login successful for user: {}", user.getEmail());

            return AuthResponse.builder()
                .code("00")
                .message("Login successful")
                .data(new HashMap<>() {{
                    put("user", userDTO);
                    put("token", token);
                    put("tokenType", "Bearer");
                    put("expiresIn", jwtExpiration);
                }})
                .build();

        } catch (Exception e) {
            log.error("Error during login process: ", e);
            return AuthResponse.builder()
                .code("99")
                .message("System error occurred during login")
                .build();
        }
    }

    private String generateToken(Users user) {
        long currentTimeMillis = System.currentTimeMillis();
        Date issuedAt = new Date(currentTimeMillis);
        Date expiryDate = new Date(currentTimeMillis + jwtExpiration);

        return Jwts.builder()
            .setSubject(user.getUsername())
            .claim(Constant.USER_ID_FIELD, user.getId())
            .claim("email", user.getEmail())
            .claim("roles", user.getRoleId())
            .setIssuedAt(issuedAt)
            .setExpiration(expiryDate)
            .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
            .compact();
    }
}

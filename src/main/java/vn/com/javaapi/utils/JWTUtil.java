package vn.com.javaapi.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import vn.com.javaapi.dto.UserDTO;

import java.util.Date;

@Slf4j
@Component
public class JWTUtil {
    @Value("${app.jwt.secret}")
    private String SECRET_KEY;
    private static final String USER_ID_FIELD = "userId";
    public String createToken(UserDTO user) {
        Date cre = new Date();
        long now = cre.getTime();
        Date validity;
        validity = new Date(now);
        return Jwts.builder()
            .setSubject(user.getUsername())
            .claim(USER_ID_FIELD, user.getUserId())
            .setIssuedAt(cre)
            .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
            .setExpiration(validity)
            .compact();
    }
}

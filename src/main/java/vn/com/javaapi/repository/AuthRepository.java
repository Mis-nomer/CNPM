package vn.com.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.com.javaapi.entity.Carts;
import vn.com.javaapi.entity.Users;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Users, Long>, JpaSpecificationExecutor<Users> {

    @Query("SELECT u FROM Users u WHERE u.email = :email")
    Optional<Users> findByEmail(String email);

}

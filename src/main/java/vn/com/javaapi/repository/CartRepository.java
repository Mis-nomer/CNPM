package vn.com.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.com.javaapi.entity.Carts;
import vn.com.javaapi.entity.Users;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Carts, Long>, JpaSpecificationExecutor<Carts> {

    @Query("SELECT c FROM Carts c WHERE c.userId = :userId")
    List<Carts> findAllCartByUser(Long userId);

    @Query("SELECT c FROM Carts c WHERE c.userId = :userId and c.productId = :productId")
    Optional<Carts> findCartByProAndUser(Long userId, Long productId);

    Optional<Carts> findById(Long id);
}

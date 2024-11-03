package vn.com.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.com.javaapi.entity.Orders ;

import java.util.List;

@Repository
public interface OrderRepository  extends JpaRepository<Orders, Long>, JpaSpecificationExecutor<Orders> {
    @Query("SELECT o FROM Orders o WHERE o.userId = :userId")
    List<Orders > findAllOrderByUserId(Long userId);
}

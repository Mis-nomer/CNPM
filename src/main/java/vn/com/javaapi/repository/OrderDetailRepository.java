package vn.com.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.com.javaapi.entity.Carts;
import vn.com.javaapi.entity.OrderDetails;

import java.util.List;

@Repository
public interface OrderDetailRepository  extends JpaRepository<OrderDetails, Long>, JpaSpecificationExecutor<OrderDetails> {
    @Query("SELECT od FROM OrderDetails od WHERE od.orderId = :id")
    List<OrderDetails> findAllByOrderId(Long id);
}

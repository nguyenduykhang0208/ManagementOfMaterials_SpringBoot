package com.example.ogani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ogani.entity.ImportCouponDetail;

@Repository
public interface ImportCouponDetailRepository extends JpaRepository<ImportCouponDetail, Long>{
    @Query(value = "Select * from importcoupon_detail WHERE importcoupon_id = :id", nativeQuery = true)
    List<ImportCouponDetail> getListDetails(long id);
}

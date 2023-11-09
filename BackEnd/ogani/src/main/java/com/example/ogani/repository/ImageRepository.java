package com.example.ogani.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.ogani.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {
    
    @Query(value = "SELECT * FROM image WHERE uploaded_by = :userId;", nativeQuery = true)
    List<Image> getListImageOfUser(@Param("userId") long userId);
}

package com.example.ogani.service;

import java.util.List;

import com.example.ogani.entity.ImportCoupon;
import com.example.ogani.entity.ImportCouponDetail;
import com.example.ogani.model.request.CreateImportCouponRequest;

public interface ImportCouponService {
    
    void placeImportCoupon(CreateImportCouponRequest request);

    List<ImportCoupon> getList();

    void enableImportCoupon(long id);

    void deleteImportCoupon(long id);

    List<ImportCouponDetail> getListDetails(long id);
}

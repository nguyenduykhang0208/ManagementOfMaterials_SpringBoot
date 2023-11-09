package com.example.ogani.service;

import java.util.List;

import com.example.ogani.entity.Supplier;
import com.example.ogani.model.request.CreateSupplierRequest;

public interface SupplierService {
    List<Supplier> findAll();

    Supplier createSupplier(CreateSupplierRequest request);

    Supplier updateSupplier(long id,CreateSupplierRequest request);

    void deleteSupplier(long id);
}

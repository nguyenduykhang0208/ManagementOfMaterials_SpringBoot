package com.example.ogani.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.ogani.entity.Supplier;
import com.example.ogani.exception.NotFoundException;
import com.example.ogani.model.request.CreateSupplierRequest;
import com.example.ogani.repository.SupplierRepository;
import com.example.ogani.service.SupplierService;

@Service
public class SupplierServiceImpl implements SupplierService{
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public List<Supplier> findAll(){
        List<Supplier> list = supplierRepository.findAll(Sort.by("id").descending());
        return list;
    }

    @Override
    public Supplier createSupplier(CreateSupplierRequest request){
        Supplier supplier = new Supplier();
        supplier.setName(request.getName());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());
        supplier.setEmail(request.getEmail());
        supplierRepository.save(supplier);
        return supplier;
    }

    @Override
    public Supplier updateSupplier(long id, CreateSupplierRequest request){
        Supplier supplier = supplierRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Supplier With Id: " + id));
        supplier.setName(request.getName());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());
        supplier.setEmail(request.getEmail());
        supplierRepository.save(supplier);
        return supplier;
    }

    @Override
    public void deleteSupplier(long id){
        Supplier supplier = supplierRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found Supplier With Id: " + id));
        supplierRepository.delete(supplier);
    }
}

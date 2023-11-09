package com.example.ogani.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ogani.entity.Supplier;
import com.example.ogani.model.request.CreateSupplierRequest;
import com.example.ogani.model.response.MessageResponse;
import com.example.ogani.service.SupplierService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/supplier")
@CrossOrigin(origins = "*",maxAge = 3600)
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @GetMapping("/")
    @Operation(summary="Lấy danh sách nhà cung cấp")
    public ResponseEntity<?> getListSupplier(){
        List<Supplier> suppliers = supplierService.findAll();
        return ResponseEntity.ok(suppliers);
    }

    @PostMapping("/create")
    @Operation(summary="Tạo mới nhà cung cấp")
    public ResponseEntity<?> createSupplier(@Valid @RequestBody CreateSupplierRequest request){
        Supplier supplier = supplierService.createSupplier(request);

        return ResponseEntity.ok(supplier);
    }

    @PutMapping("/update/{id}")
    @Operation(summary="Tìm nhà cung cấp bằng id và cập nhật nhà cung cấp đó")
    public ResponseEntity<?> updateSupplier(@PathVariable long id, @Valid @RequestBody CreateSupplierRequest request){
        Supplier supplier = supplierService.updateSupplier(id, request);
        return ResponseEntity.ok(supplier);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary="Xóa nhà cung cấp bằng id")
    public ResponseEntity<?> delete(@PathVariable long id){
        supplierService.deleteSupplier(id);
        return ResponseEntity.ok(new MessageResponse("Xóa thành công"));
    }
}

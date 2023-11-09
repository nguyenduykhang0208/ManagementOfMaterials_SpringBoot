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

import com.example.ogani.entity.ImportCoupon;
import com.example.ogani.entity.ImportCouponDetail;
import com.example.ogani.model.request.CreateImportCouponRequest;
import com.example.ogani.model.response.MessageResponse;
import com.example.ogani.service.ImportCouponService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/importcoupon")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ImportCouponController {

    @Autowired
    private ImportCouponService importCouponService;

    @GetMapping("/")
    @Operation(summary="Lấy ra danh sách phiếu nhập")
    public ResponseEntity<List<ImportCoupon>> getList(){
        List<ImportCoupon> list = importCouponService.getList();

        return ResponseEntity.ok(list);
    }

    @PostMapping("/create")
    @Operation(summary="Tạo phiếu nhập")
    public ResponseEntity<?> placeImportCoupon(@Valid @RequestBody CreateImportCouponRequest request){

        importCouponService.placeImportCoupon(request);

        return ResponseEntity.ok(new MessageResponse("Import Coupon Placed Successfully!"));
    }

    @PutMapping("/enable/{id}")
    @Operation(summary="Kích hoạt phiếu nhập bằng id")
    public ResponseEntity<?> enabled(@PathVariable long id){
        importCouponService.enableImportCoupon(id);
        return ResponseEntity.ok(new MessageResponse("Cập nhật thành công"));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary="Xóa phiếu nhập bằng id")
    public ResponseEntity<?> delete(@PathVariable long id){
        importCouponService.deleteImportCoupon(id);
        return ResponseEntity.ok(new MessageResponse("Xóa thành công"));
    }

    @GetMapping("/{id}")
    @Operation(summary="Lấy ra chi tiết phiếu nhập")
    public ResponseEntity<List<ImportCouponDetail>> getDetails(@PathVariable long id){
        List<ImportCouponDetail> list = importCouponService.getListDetails(id);

        return ResponseEntity.ok(list);
    }
}

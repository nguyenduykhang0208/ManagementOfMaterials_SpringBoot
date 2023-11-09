package com.example.ogani.model.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateImportCouponDetailRequest {
    
    @NotNull(message = "Sản phẩm rỗng")
    @Positive(message = "Sản phẩm rỗng")
    @Schema(description = "ID của sản phẩm",example="1")
    private long productId;

    @NotNull(message = "Số lượng sản phẩm rỗng")
    @NotEmpty(message = "Số lượng sản phẩm rỗng")
    @Size(min = 1,message="Số lượng sản phẩm từ 1 trở lên")
    private int quantity;

    @NotNull(message="Đơn giá sản phẩm rỗng")
    @NotEmpty(message="Đơn giá sản phẩm rỗng")
    @Size(min=0,message ="Đơn giá sản phẩm từ 0 trở lên")
    private float unitPrice;

}

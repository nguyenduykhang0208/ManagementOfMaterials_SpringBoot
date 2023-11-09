package com.example.ogani.model.request;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateImportCouponRequest {

    @NotNull(message = "Người dùng rỗng")
    @Positive(message = "Người dùng rỗng")
    @Schema(description = "ID của người dùng",example="1")
    private long userId;

    @NotNull(message = "Nhà cung cấp rỗng")
    @Positive(message = "Nhà cung cấp rỗng")
    @Schema(description = "ID của nhà cung cấp",example="1")
    private long supplierId;

    private List<CreateImportCouponDetailRequest> importCouponDetail;
}

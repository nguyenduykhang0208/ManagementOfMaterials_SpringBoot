package com.example.ogani.model.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

// import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    
    @NotNull(message="Username rỗng")
    @NotEmpty(message="Username rỗng")
    @Size(min=4,max=30,message="Username có từ 4-30 ký tự")
//    @Schema(description = "Username", example="admin", required=true)
    private String username;

    @NotNull(message = "Mật khẩu rỗng")
    @NotEmpty(message = "Mật khẩu rỗng")
    @Size(min=5,max=30,message="Mật khẩu có từ 6-30 ký tự")
//    @Schema(description = "Mật khẩu",example = "123456")
    private String password;
}

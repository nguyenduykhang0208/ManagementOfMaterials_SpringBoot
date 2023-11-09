package com.example.ogani.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ogani.entity.Users;
import com.example.ogani.model.request.ChangePasswordRequest;
import com.example.ogani.model.request.UpdateProfileRequest;
import com.example.ogani.model.request.UpdateRoleUser;
import com.example.ogani.model.response.MessageResponse;
import com.example.ogani.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;
    

    @GetMapping("/")
    @Operation(summary="Lấy ra user bằng username")
    public ResponseEntity<Users> getuser(@RequestParam("username") String username){
        Users users = userService.getUserByUsername(username);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/all")
    @Operation(summary="Lấy ra danh sách tài khoản")
    public ResponseEntity<List<Users>> getList(){
        List<Users> list = userService.getList();

        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    @Operation(summary="Lấy ra user bằng id")
    public ResponseEntity<Users> getUserById(@PathVariable long id){
        Users users = userService.getUserById(id);
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update")
    @Operation(summary="Cập nhật user")
    public ResponseEntity<Users> updateProfile(@RequestBody UpdateProfileRequest request){
        Users users = userService.updateUser(request);

        return ResponseEntity.ok(users);
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
        userService.changePassword(request);
        return ResponseEntity.ok(new MessageResponse("Change Password Success!"));
    }

    @PutMapping("/enable/{id}")
    @Operation(summary="Kích hoạt tài khoản bằng id")
    public ResponseEntity<?> enabled(@PathVariable long id){
        userService.enableUser(id);
        return ResponseEntity.ok(new MessageResponse("Cập nhật thành công"));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary="Xóa tài khoản người dùng bằng id")
    public ResponseEntity<?> delete(@PathVariable long id){
        userService.deleteUser(id);
        return ResponseEntity.ok(new MessageResponse("Xóa thành công"));
    }

    @PutMapping("/role/{id}")
    @Operation(summary="Cập nhật quyền cho tài khoản bằng id")
    public ResponseEntity<?> updateRole(@PathVariable long id, @RequestBody UpdateRoleUser request){
        userService.updateRole(id, request);;
        return ResponseEntity.ok(new MessageResponse("Cập nhật thành công"));
    }
}

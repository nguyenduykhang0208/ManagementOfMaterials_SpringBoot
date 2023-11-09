package com.example.ogani.service;

import java.util.List;

import com.example.ogani.entity.Users;
import com.example.ogani.model.request.ChangePasswordRequest;
import com.example.ogani.model.request.CreateUserRequest;
import com.example.ogani.model.request.UpdateProfileRequest;
import com.example.ogani.model.request.UpdateRoleUser;

public interface UserService {
    
    void register(CreateUserRequest request);


    Users getUserByUsername(String username);

    Users getUserById(long id);

    Users updateUser(UpdateProfileRequest request);

    List<Users> getList();

    void changePassword(ChangePasswordRequest request);

    void enableUser(long id);

    void deleteUser(long id);

    void updateRole(long id,UpdateRoleUser request);

}

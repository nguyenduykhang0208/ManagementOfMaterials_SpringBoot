package com.example.ogani.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.ogani.entity.ERole;
import com.example.ogani.entity.Role;
import com.example.ogani.entity.Users;
import com.example.ogani.exception.BadRequestException;
import com.example.ogani.exception.NotFoundException;
import com.example.ogani.model.request.ChangePasswordRequest;
import com.example.ogani.model.request.CreateUserRequest;
import com.example.ogani.model.request.UpdateProfileRequest;
import com.example.ogani.model.request.UpdateRoleUser;
import com.example.ogani.repository.RoleRepository;
import com.example.ogani.repository.UsersRepository;
import com.example.ogani.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private EntityManager entityManager;

    @Override
    public void register(CreateUserRequest request) {
        // TODO Auto-generated method stub
        Users users = new Users();
        users.setUsername(request.getUsername());
        users.setEmail(request.getEmail());
        users.setFirstname(request.getUsername());
        users.setPassword(encoder.encode(request.getPassword()));
        Set<String> strRoles = request.getRole();
          Set<Role> roles = new HashSet<>();
      
          if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
          } else {
            strRoles.forEach(role -> {
              switch (role) {
              case "admin":
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);
      
                break;
              case "mod":
                Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(modRole);
      
                break;
              default:
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
              }
            });
          }
          users.setRoles(roles);
          users.setEnable(1);
          usersRepository.save(users);
    }

    @Override
    public Users getUserByUsername(String username) {
      // TODO Auto-generated method stub
      Users users = usersRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("Not Found User"));
      return users;
    }

    @Override
    public Users getUserById(long id) {
      // TODO Auto-generated method stub
      Users users = usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found User"));
      return users;
    }

    @Override
    public List<Users> getList() {
        // TODO Auto-generated method stub
        return usersRepository.findAll(Sort.by("id").descending());
    }

    @Override
    public Users updateUser(UpdateProfileRequest request) {
      // TODO Auto-generated method stub
      Users users = usersRepository.findByUsername(request.getUsername()).orElseThrow(() -> new NotFoundException("Not Found User"));
      users.setFirstname(request.getFirstname());
      users.setLastname(request.getLastname());
      users.setEmail(request.getEmail());
      users.setCountry(request.getCountry());
      users.setTown(request.getTown());
      users.setState(request.getState());
      users.setAddress(request.getAddress());
      users.setPhone(request.getPhone());
      usersRepository.save(users);
      return users;
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
      // TODO Auto-generated method stub
      Users user = usersRepository.findByUsername(request.getUsername()).orElseThrow(() -> new NotFoundException("Not Found User"));
      if(!encoder.matches(request.getOldPassword(), user.getPassword())){
        throw new BadRequestException("Old Passrword Not Same");
      }
      user.setPassword(encoder.encode(request.getNewPassword()));

      usersRepository.save(user);
      
    }

    @Override
    public void enableUser(long id) {
        // TODO Auto-generated method stub
        Users user = usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found User With Id: " + id));
        if(user.getEnable() == 1){
            user.setEnable(0);
        } else{
            user.setEnable(1);
        }
        usersRepository.save(user);
    }

    @Override
    public void deleteUser(long id) {
        usersRepository.deleteById(id);
        entityManager.clear();
    }

    @Override
    public void updateRole(long id, UpdateRoleUser request) {
        // TODO Auto-generated method stub
        Users user = usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Not Found User With Id: " + id));
        Set<String> strRoles = request.getRole();
          Set<Role> roles = new HashSet<>();
      
          if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
          } else {
            strRoles.forEach(role -> {
              switch (role) {
              case "ROLE_ADMIN":
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);
      
                break;
              case "ROLE_MODERATOR":
                Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(modRole);
      
                break;
              default:
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
              }
            });
          }
          user.setRoles(roles);
          usersRepository.save(user);
    }
}

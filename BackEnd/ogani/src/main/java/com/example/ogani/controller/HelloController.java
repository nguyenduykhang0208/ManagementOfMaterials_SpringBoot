package com.example.ogani.controller;

import com.example.ogani.model.request.CreateUserRequest;
import com.example.ogani.model.request.LoginRequest;
import com.example.ogani.model.response.MessageResponse;
import com.example.ogani.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/hello")
@CrossOrigin(origins = "*",maxAge = 3600)
public class HelloController {

    @Autowired
    private UserService userService;

    @Autowired
    JdbcTemplate jdbc;

    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<?> getProducts() {
        String sql = "SELECT * FROM PRODUCT";
        List<Product1> data = jdbc.query(sql, BeanPropertyRowMapper.newInstance(Product1.class));
        return ResponseEntity.ok(data);
    }
    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<?> login1(@Valid @RequestBody LoginRequest loginRequest){

        return ResponseEntity.ok(jdbc.queryForList("SELECT * FROM USERS"));
    }
    @GetMapping("/category")
    @ResponseBody
    public ResponseEntity<?> login2(@Valid @RequestBody LoginRequest loginRequest){
        // String username = loginRequest.getUsername();
        // String password = loginRequest.getPassword();
        String sql = "Select * from Category WHERE enable = 1";
        String sql1 = "SELECT * FROM USERS";
        List<Map<String, Object>> user = jdbc.queryForList(sql);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/categorys")
    @ResponseBody
    public List<Map<String,Object>> getCategory(){
        String sql = "Select * from Category WHERE enable = 1";
        return jdbc.queryForList(sql);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<?> register(@Valid @RequestBody CreateUserRequest request){
        userService.register(request);

       return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        // return ResponseEntity.ok(request.getUsername());
    }
}

package com.example.ogani.controller;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Product1 {

    @Id
    private Long id;
    private String name;
    private String description;
    private int price;
    private int quantity;

    public Product1() {}
}

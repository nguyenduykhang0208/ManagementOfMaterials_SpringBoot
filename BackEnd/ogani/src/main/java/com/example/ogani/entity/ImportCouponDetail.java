package com.example.ogani.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "importcoupon_detail")
public class ImportCouponDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name ="importcoupon_id")
    private ImportCoupon importcoupon;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String name;
    
    private int quantity;

    @Column(name = "unit_price")
    private float unitPrice;

    private float amount;
}

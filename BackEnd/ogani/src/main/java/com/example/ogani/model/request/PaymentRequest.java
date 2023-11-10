package com.example.ogani.model.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest implements Serializable{
    private String status;
    private String message;
    private String URL;
}

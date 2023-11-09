package com.example.ogani.service;

import java.util.List;

import com.example.ogani.entity.OrderDetails;
import com.example.ogani.entity.Orders;
import com.example.ogani.model.request.CreateOrderRequest;

public interface OrdersService {
    
    void placeOrder(CreateOrderRequest request);

    List<Orders> getList();

    Orders getOrder(long id);
    
    List<Orders> getOrdersByUser(String username);

    void deleteOrder(long id);

    List<OrderDetails> getListDetails(long id);

    void enableOrder(long id);
}

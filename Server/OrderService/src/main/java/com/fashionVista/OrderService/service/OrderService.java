package com.fashionVista.OrderService.service;

import com.fashionVista.OrderService.clinet.ProductClient;
import com.fashionVista.OrderService.dto.*;
import com.fashionVista.OrderService.entity.Order;
import com.fashionVista.OrderService.entity.OrderItem;
import com.fashionVista.OrderService.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductClient productClient;
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequest) {

        Order order = new Order();
        order.setUserId(orderRequest.getUserId());
        order.setOrderDate(new java.util.Date());
        final double[] totalPrice = {0};

        order.setItems(orderRequest.getOrderItems().stream().map(orderItemDTO -> {
            OrderItem item = new OrderItem();
            item.setProductId(orderItemDTO.getProduct().getId());
            item.setQuantity(orderItemDTO.getQuantity());
            double price = orderItemDTO.getProduct().getPrice();
            item.setPrice(price);
            totalPrice[0] += price * orderItemDTO.getQuantity();

            item.setOrder(order);

            return item;
        }).collect(Collectors.toList()));

        order.setTotalAmount(totalPrice[0]);

        Order savedOrder = orderRepository.save(order);

        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(savedOrder.getId());
        responseDTO.setUserId(savedOrder.getUserId());
        responseDTO.setOrderDate(savedOrder.getOrderDate().toString());
        responseDTO.setTotalAmount(savedOrder.getTotalAmount());
        responseDTO.setItems(savedOrder.getItems().stream().map(item -> {
            OrderItemDTO itemDTO = new OrderItemDTO();
            ProductDTO product = productClient.getProductById(item.getProductId());
            itemDTO.setProduct(product);
            itemDTO.setQuantity(item.getQuantity());
            return itemDTO;
        }).collect(Collectors.toList()));

        return responseDTO;
    }

    public List<OrderDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream().map(order -> {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setOrderId(order.getId());
            orderDTO.setOrderDate(order.getOrderDate().toString());
            orderDTO.setTotalAmount(order.getTotalAmount());

            List<OrderItemDTO> itemDTOs = order.getItems().stream().map(item -> {
                OrderItemDTO itemDTO = new OrderItemDTO();
                ProductDTO product = productClient.getProductById(item.getProductId());
                itemDTO.setProduct(product);
                itemDTO.setQuantity(item.getQuantity());
                return itemDTO;
            }).collect(Collectors.toList());

            orderDTO.setItems(itemDTOs);
            return orderDTO;
        }).collect(Collectors.toList());
    }
}
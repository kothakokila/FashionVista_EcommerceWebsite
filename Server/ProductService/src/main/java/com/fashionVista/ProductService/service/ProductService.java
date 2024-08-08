package com.fashionVista.ProductService.service;

import com.fashionVista.ProductService.model.Product;
import com.fashionVista.ProductService.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product getProductById(String productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Autowired
    private ObjectMapper objectMapper;

    @PostConstruct
    public void loadProducts() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Product>> typeReference = new TypeReference<List<Product>>() {};
        InputStream inputStream = TypeReference.class.getResourceAsStream("/products.json");

        try {
            List<Product> products = mapper.readValue(inputStream, typeReference);
            productRepository.saveAll(products);
            System.out.println("Products loaded successfully");
        } catch (IOException e) {
            System.out.println("Failed to load products: " + e.getMessage());
        }
    }

}
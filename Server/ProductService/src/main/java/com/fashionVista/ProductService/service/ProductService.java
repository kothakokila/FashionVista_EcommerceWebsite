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
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ObjectMapper objectMapper;

    private boolean productsLoaded = false;

    @PostConstruct
    public void loadProducts() {
        if (!productRepository.findAll().isEmpty()) {
            System.out.println("Products already exist in the database.");
            return;
        }

        try (InputStream inputStream = TypeReference.class.getResourceAsStream("/products.json")) {
            if (inputStream == null) {
                System.out.println("products.json file not found.");
                return;
            }

            TypeReference<List<Product>> typeReference = new TypeReference<>() {};
            List<Product> products = objectMapper.readValue(inputStream, typeReference);

            productRepository.saveAll(products);
            System.out.println("New products loaded successfully");
        } catch (IOException e) {
            System.out.println("Failed to load products: " + e.getMessage());
        }
    }


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

    public List<Product> searchProducts(String query) {
        List<Product> products=productRepository.findByNameContainingIgnoreCase(query);
        return products.stream().distinct().collect(Collectors.toList());
    }

}
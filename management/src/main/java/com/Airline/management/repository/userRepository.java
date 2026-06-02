package com.Airline.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Airline.management.model.user;

public interface userRepository extends JpaRepository<user, Long> {
    List<user> findAll();

    void deleteById(Long id);

    Optional<user> findById(Long id);

    Optional<user> findByEmail(String email);
}

package com.Airline.management.repository;

import com.Airline.management.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByPassengerId(Long passengerId);

    List<Booking> findByPassengerIdAndStatus(Long passengerId, String status);

    long countByPassengerIdAndStatus(Long passengerId, String status);

}

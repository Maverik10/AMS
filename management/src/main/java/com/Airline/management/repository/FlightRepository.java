package com.Airline.management.repository;

import com.Airline.management.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByCarrierName(String carrierName);
}


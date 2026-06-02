package com.Airline.management.repository;

import com.Airline.management.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByCarrierName(String carrierName);

    List<Flight> findByOriginIgnoreCaseAndDestinationIgnoreCaseAndDepartureDate(
            String origin,
            String destination,
            LocalDate departureDate
    );
}
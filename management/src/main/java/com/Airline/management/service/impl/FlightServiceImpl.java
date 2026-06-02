package com.Airline.management.service.impl;

import com.Airline.management.model.Flight;
import com.Airline.management.repository.FlightRepository;
import com.Airline.management.service.FlightService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    private final FlightRepository repository;

    public FlightServiceImpl(FlightRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flight addFlight(Flight flight) {
        return repository.save(flight);
    }

    @Override
    public List<Flight> getAllFlights() {
        return repository.findAll();
    }

    @Override
    public List<Flight> getByCarrierName(String name) {
        return repository.findByCarrierName(name);
    }

    @Override
    public Flight updateFlight(Long id, Flight flight) {

        Flight existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        existing.setCarrierName(flight.getCarrierName());
        existing.setOrigin(flight.getOrigin());
        existing.setDestination(flight.getDestination());
        existing.setAirFare(flight.getAirFare());
        existing.setSeatCapacityBusiness(flight.getSeatCapacityBusiness());
        existing.setSeatCapacityEconomy(flight.getSeatCapacityEconomy());
        existing.setSeatCapacityExecutive(flight.getSeatCapacityExecutive());

        return repository.save(existing);
    }
}
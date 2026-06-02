package com.Airline.management.service;
import com.Airline.management.model.Flight;

import java.util.List;

public interface FlightService {

    Flight addFlight(Flight flight);

    List<Flight> getAllFlights();

    List<Flight> getByCarrierName(String name);

    Flight updateFlight(Long id, Flight flight);
}
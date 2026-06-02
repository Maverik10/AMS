package com.Airline.management.service;

import com.Airline.management.dto.FlightRequestDto;
import com.Airline.management.dto.SearchFlightResponseDto;
import com.Airline.management.model.Flight;

import java.time.LocalDate;
import java.util.List;

public interface FlightService {

    Flight addFlight(FlightRequestDto request);

    List<Flight> getAllFlights();

    List<Flight> getByCarrierName(String name);

    Flight updateFlight(Long id, Flight flight);

    List<SearchFlightResponseDto> searchFlights(
            String origin,
            String destination,
            LocalDate departureDate,
            Integer noOfTravellers,
            String travelClass
    );

    Flight getFlightById(Long flightId);

    void deleteFlight(Long flightId);
}
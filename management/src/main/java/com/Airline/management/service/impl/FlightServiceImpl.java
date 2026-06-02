package com.Airline.management.service.impl;
import com.Airline.management.dto.SearchFlightResponseDto;
import com.Airline.management.dto.FlightRequestDto;
import com.Airline.management.model.Flight;
import com.Airline.management.repository.FlightRepository;
import com.Airline.management.service.FlightService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    private final FlightRepository repository;

    public FlightServiceImpl(FlightRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flight addFlight(FlightRequestDto request) {

        Flight flight = new Flight();

        flight.setCarrierName(request.getCarrierName());
        flight.setOrigin(request.getOrigin());
        flight.setDestination(request.getDestination());
        flight.setEconomyFare(request.getEconomyFare());
        flight.setBusinessFare(request.getBusinessFare());
        flight.setExecutiveFare(request.getExecutiveFare());
        flight.setDepartureDate(request.getDepartureDate());

        flight.setSeatCapacityBusiness(request.getSeatCapacityBusiness());
        flight.setSeatCapacityEconomy(request.getSeatCapacityEconomy());
        flight.setSeatCapacityExecutive(request.getSeatCapacityExecutive());

        flight.setLeftSeatCapacityBusiness(request.getSeatCapacityBusiness());
        flight.setLeftSeatCapacityEconomy(request.getSeatCapacityEconomy());
        flight.setLeftSeatCapacityExecutive(request.getSeatCapacityExecutive());

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
        existing.setDepartureDate(flight.getDepartureDate());
        existing.setSeatCapacityBusiness(flight.getSeatCapacityBusiness());
        existing.setSeatCapacityEconomy(flight.getSeatCapacityEconomy());
        existing.setSeatCapacityExecutive(flight.getSeatCapacityExecutive());

        return repository.save(existing);
    }

    @Override
    public List<SearchFlightResponseDto> searchFlights(
        String origin,
        String destination,
        LocalDate date,
        Integer noOfTravellers,
        String travelClass
        ) {

    List<Flight> flights =
            repository.findByOriginIgnoreCaseAndDestinationIgnoreCaseAndDepartureDate(
                    origin,
                    destination,
                    date
            );

    return flights.stream()
            .filter(flight ->
                    hasAvailableSeats(
                            flight,
                            travelClass,
                            noOfTravellers))
            .map(flight -> {

                Double fare;
                Integer seats;

                switch (travelClass.toUpperCase()) {

                    case "BUSINESS":
                        fare = flight.getBusinessFare();
                        seats = flight.getLeftSeatCapacityBusiness();
                        break;

                    case "EXECUTIVE":
                        fare = flight.getExecutiveFare();
                        seats = flight.getLeftSeatCapacityExecutive();
                        break;

                    default:
                        fare = flight.getEconomyFare();
                        seats = flight.getLeftSeatCapacityEconomy();
                }

                SearchFlightResponseDto dto =
                        new SearchFlightResponseDto();

                dto.setFlightId(flight.getFlightId());
                dto.setCarrierName(flight.getCarrierName());
                dto.setOrigin(flight.getOrigin());
                dto.setDestination(flight.getDestination());
                dto.setDepartureDate(flight.getDepartureDate());

                dto.setTravelClass(travelClass);
                dto.setFare(fare);
                dto.setAvailableSeats(seats);

                return dto;
            })
            .toList();
}


    private boolean hasAvailableSeats(
        Flight flight,
        String travelClass,
        Integer noOfTravellers
    ) {
        if (travelClass == null || noOfTravellers == null || noOfTravellers <= 0) {
            return false;
        }

        if (travelClass.equalsIgnoreCase("Business")) {
            return flight.getLeftSeatCapacityBusiness() != null
                    && flight.getLeftSeatCapacityBusiness() >= noOfTravellers;
        }

        if (travelClass.equalsIgnoreCase("Economy")) {
            return flight.getLeftSeatCapacityEconomy() != null
                    && flight.getLeftSeatCapacityEconomy() >= noOfTravellers;
        }

        if (travelClass.equalsIgnoreCase("Executive")) {
            return flight.getLeftSeatCapacityExecutive() != null
                    && flight.getLeftSeatCapacityExecutive() >= noOfTravellers;
        }

        return false;
    }

    @Override
    public Flight getFlightById(Long flightId) {

        return repository.findById(flightId)
                .orElseThrow(() ->
                        new RuntimeException("Flight not found"));
    }
    @Override
    public void deleteFlight(Long flightId) {

        Flight flight = repository.findById(flightId)
                .orElseThrow(() ->
                        new RuntimeException("Flight not found"));

        repository.delete(flight);
    }
}
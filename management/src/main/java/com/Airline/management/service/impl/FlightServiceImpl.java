package com.Airline.management.service.impl;
import com.Airline.management.dto.SearchFlightResponseDto;
import com.Airline.management.dto.FlightRequestDto;
import com.Airline.management.model.Booking;
import com.Airline.management.model.Flight;
import com.Airline.management.repository.BookingRepository;
import com.Airline.management.repository.FlightRepository;
import com.Airline.management.service.FlightService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    private final FlightRepository repository;
    private final BookingRepository bookingRepository;

    public FlightServiceImpl(FlightRepository repository,
                             BookingRepository bookingRepository) {
        this.repository = repository;
        this.bookingRepository = bookingRepository;
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
            .filter(flight -> "UPCOMING".equalsIgnoreCase(flight.getStatus()))
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
    @Transactional
    public Flight cancelFlight(Long flightId) {

        Flight flight = repository.findById(flightId)
                .orElseThrow(() ->
                        new RuntimeException("Flight not found"));

        if ("CANCELLED".equalsIgnoreCase(flight.getStatus())) {
            throw new RuntimeException("Flight is already cancelled");
        }

        // Cancel every upcoming ticket on this flight.
        List<Booking> tickets =
                bookingRepository.findByFlightIdAndStatus(flightId, "UPCOMING");

        for (Booking ticket : tickets) {
            ticket.setStatus("CANCELLED");
        }

        bookingRepository.saveAll(tickets);

        flight.setStatus("CANCELLED");

        return repository.save(flight);
    }

    @Override
    @Transactional
    public void completePastFlights() {

        List<Flight> pastFlights =
                repository.findByStatusAndDepartureDateBefore("UPCOMING", LocalDate.now());

        for (Flight flight : pastFlights) {
            flight.setStatus("COMPLETED");

            // Complete every upcoming ticket on this flight (leave cancelled ones as-is).
            List<Booking> tickets =
                    bookingRepository.findByFlightIdAndStatus(flight.getFlightId(), "UPCOMING");

            for (Booking ticket : tickets) {
                ticket.setStatus("COMPLETED");
            }

            bookingRepository.saveAll(tickets);
        }

        repository.saveAll(pastFlights);
    }
    @Override
    public long getActiveFlightCount() {
    return repository.count();
}
}
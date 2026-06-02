package com.Airline.management.controller;

import com.Airline.management.dto.FlightRequestDto;
import com.Airline.management.model.Flight;
import com.Airline.management.service.FlightService;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin("*")
public class FlightController {

    private final FlightService service;

    public FlightController(FlightService service) {
        this.service = service;
    }

    @PostMapping
    public Flight addFlight(@RequestBody FlightRequestDto request) {
        return service.addFlight(request);
    }

    @GetMapping
    public List<Flight> getAll() {
        return service.getAllFlights();
    }

    @GetMapping("/carrier/{name}")
    public List<Flight> getByCarrier(@PathVariable String name) {
        return service.getByCarrierName(name);
    }

    @PutMapping("/{id}")
    public Flight update(@PathVariable Long id, @RequestBody Flight flight) {
        return service.updateFlight(id, flight);
    }
    
    @GetMapping("/search")
    public List<Flight> searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam 
            @DateTimeFormat(pattern = "dd-MM-yyyy")
            LocalDate date,
            @RequestParam Integer noOfTravellers,
            @RequestParam String travelClass
    ) {
        return service.searchFlights(origin, destination, date, noOfTravellers, travelClass);
    }

    @GetMapping("/{flightId}")
    public Flight getFlightById(
            @PathVariable Long flightId) {

        return service.getFlightById(flightId);
    }
    @DeleteMapping("/{flightId}")
    public String deleteFlight(
            @PathVariable Long flightId) {

        service.deleteFlight(flightId);

        return "Flight deleted successfully";
    }
}

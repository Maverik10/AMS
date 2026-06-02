package com.Airline.management.controller;

import com.Airline.management.model.Flight;
import com.Airline.management.service.FlightService;
import org.springframework.web.bind.annotation.*;

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
    public Flight addFlight(@RequestBody Flight flight) {
        return service.addFlight(flight);
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
}

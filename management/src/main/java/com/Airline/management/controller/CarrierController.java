package com.Airline.management.controller;

import com.Airline.management.model.Carrier;
import com.Airline.management.service.CarrierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carriers")
@CrossOrigin("*")
public class CarrierController {

    private final CarrierService service;

    public CarrierController(CarrierService service) {
        this.service = service;
    }

    @PostMapping
    public Carrier addCarrier(@RequestBody Carrier carrier) {
        return service.addCarrier(carrier);
    }

    @GetMapping
    public List<Carrier> getAll() {
        return service.getAllCarriers();
    }

    @GetMapping("/{name}")
    public Carrier getByName(@PathVariable String name) {
        return service.getByName(name);
    }

    @PutMapping("/{id}")
    public Carrier update(@PathVariable Long id, @RequestBody Carrier carrier) {
        return service.updateCarrier(id, carrier);
    }
}

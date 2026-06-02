package com.Airline.management.service.impl;
import com.Airline.management.model.Carrier;
import com.Airline.management.repository.CarrierRepository;
import com.Airline.management.service.CarrierService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrierServiceImpl implements CarrierService {

    private final CarrierRepository repository;

    public CarrierServiceImpl(CarrierRepository repository) {
        this.repository = repository;
    }

    @Override
    public Carrier addCarrier(Carrier carrier) {
        return repository.save(carrier);
    }

    @Override
    public List<Carrier> getAllCarriers() {
        return repository.findAll();
    }

    @Override
    public Carrier updateCarrier(Long id, Carrier carrier) {
        Carrier existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carrier not found"));

        existing.setCarrierName(carrier.getCarrierName());
        existing.setDiscount30Days(carrier.getDiscount30Days());
        existing.setDiscount60Days(carrier.getDiscount60Days());
        existing.setDiscount90Days(carrier.getDiscount90Days());
        existing.setBulkBookingDiscount(carrier.getBulkBookingDiscount());
        existing.setSilverUserDiscount(carrier.getSilverUserDiscount());
        existing.setGoldUserDiscount(carrier.getGoldUserDiscount());
        existing.setPlatinumUserDiscount(carrier.getPlatinumUserDiscount());

        existing.setRefund2Days(carrier.getRefund2Days());
        existing.setRefund10Days(carrier.getRefund10Days());
        existing.setRefund20Days(carrier.getRefund20Days());

        return repository.save(existing);
    }

    @Override
    public Carrier getByName(String name) {
        return repository.findByCarrierName(name)
                .orElseThrow(() -> new RuntimeException("Carrier not found"));
    }
}

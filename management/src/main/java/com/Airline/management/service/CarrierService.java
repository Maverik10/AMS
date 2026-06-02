package com.Airline.management.service;
import com.Airline.management.model.Carrier;

import java.util.List;

public interface CarrierService {

    Carrier addCarrier(Carrier carrier);

    List<Carrier> getAllCarriers();

    Carrier updateCarrier(Long id, Carrier carrier);

    Carrier getByName(String name);
}

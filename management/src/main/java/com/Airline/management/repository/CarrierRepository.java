package com.Airline.management.repository;
import com.Airline.management.model.Carrier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarrierRepository extends JpaRepository<Carrier, Long> {

    Optional<Carrier> findByCarrierName(String carrierName);
}

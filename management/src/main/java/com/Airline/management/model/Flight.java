package com.Airline.management.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "flight")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    private String carrierName;

    private String origin;
    private String destination;

    private Double airFare;

    private Integer seatCapacityBusiness;
    private Integer seatCapacityEconomy;
    private Integer seatCapacityExecutive;
}

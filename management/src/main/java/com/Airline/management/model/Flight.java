package com.Airline.management.model;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

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

    private Double economyFare;
    private Double businessFare;
    private Double executiveFare;

    @JsonFormat(pattern = "dd-MM-yyyy")
    @Column(name="departure_date")
    private LocalDate departureDate;

    private Integer seatCapacityBusiness;
    private Integer seatCapacityEconomy;
    private Integer seatCapacityExecutive;

    private Integer leftSeatCapacityBusiness;
    private Integer leftSeatCapacityEconomy;
    private Integer leftSeatCapacityExecutive;

    
    @PrePersist
    public void setInitialLeftSeatCapacity() {
        if (this.leftSeatCapacityBusiness == null) {
            this.leftSeatCapacityBusiness = this.seatCapacityBusiness;
        }

        if (this.leftSeatCapacityEconomy == null) {
            this.leftSeatCapacityEconomy = this.seatCapacityEconomy;
        }

        if (this.leftSeatCapacityExecutive == null) {
            this.leftSeatCapacityExecutive = this.seatCapacityExecutive;
        }
    }


}

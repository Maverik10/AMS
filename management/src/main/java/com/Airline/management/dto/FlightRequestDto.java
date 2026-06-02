package com.Airline.management.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class FlightRequestDto {

    private String carrierName;

    private String origin;

    private String destination;

    private Double economyFare;
    private Double businessFare;
    private Double executiveFare;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate departureDate;

    private Integer seatCapacityBusiness;

    private Integer seatCapacityEconomy;

    private Integer seatCapacityExecutive;
}
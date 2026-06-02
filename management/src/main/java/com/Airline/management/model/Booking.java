package com.Airline.management.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private Long passengerId;

    private Long flightId;

    private String travelClass;

    @JsonFormat(pattern = "MM/dd/yyyy")
    private LocalDate journeyDate;

    private String status;

    private Double fare;


    @Column(nullable = false, columnDefinition = "int default 1")
    private int noOfSeatsBooked = 1;
}
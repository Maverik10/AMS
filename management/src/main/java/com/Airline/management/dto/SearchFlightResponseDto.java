package com.Airline.management.dto;

import java.time.LocalDate;

public class SearchFlightResponseDto {

    private Long flightId;
    private String carrierName;
    private String origin;
    private String destination;
    private LocalDate departureDate;

    private String travelClass;
    private Double fare;
    private Integer availableSeats;

    public SearchFlightResponseDto() {
    }

    public SearchFlightResponseDto(Long flightId, String carrierName,
                                   String origin, String destination,
                                   LocalDate departureDate,
                                   String travelClass,
                                   Double fare,
                                   Integer availableSeats) {
        this.flightId = flightId;
        this.carrierName = carrierName;
        this.origin = origin;
        this.destination = destination;
        this.departureDate = departureDate;
        this.travelClass = travelClass;
        this.fare = fare;
        this.availableSeats = availableSeats;
    }

    public Long getFlightId() { return flightId; }
    public void setFlightId(Long flightId) { this.flightId = flightId; }

    public String getCarrierName() { return carrierName; }
    public void setCarrierName(String carrierName) { this.carrierName = carrierName; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getDepartureDate() { return departureDate; }
    public void setDepartureDate(LocalDate departureDate) { this.departureDate = departureDate; }

    public String getTravelClass() { return travelClass; }
    public void setTravelClass(String travelClass) { this.travelClass = travelClass; }

    public Double getFare() { return fare; }
    public void setFare(Double fare) { this.fare = fare; }

    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }
}
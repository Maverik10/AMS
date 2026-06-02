package com.Airline.management.dto;

public class FlightCountDto {

    private long activeFlights;

    public FlightCountDto(long activeFlights) {
        this.activeFlights = activeFlights;
    }

    public long getActiveFlights() {
        return activeFlights;
    }

    public void setActiveFlights(long activeFlights) {
        this.activeFlights = activeFlights;
    }
}
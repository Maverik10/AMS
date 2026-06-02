package com.Airline.management.service;

import com.Airline.management.model.Booking;

import java.util.List;

public interface BookingService {

    Booking saveBooking(Booking booking);

    List<Booking> getBookingsByPassenger(Long passengerId);
    Booking getBookingById(Long bookingId);
    Booking cancelBooking(Long bookingId);
    Booking completeBooking(Long bookingId);
}
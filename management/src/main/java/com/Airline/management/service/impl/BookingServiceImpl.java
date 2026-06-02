package com.Airline.management.service.impl;

import com.Airline.management.dto.BookingCountDto;
import com.Airline.management.model.Booking;
import com.Airline.management.model.Flight;
import com.Airline.management.repository.BookingRepository;
import com.Airline.management.repository.FlightRepository;
import com.Airline.management.service.BookingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              FlightRepository flightRepository) {
        this.bookingRepository = bookingRepository;
        this.flightRepository = flightRepository;
    }

    @Override
    public Booking saveBooking(Booking booking) {
        booking.setStatus("UPCOMING");
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsByPassenger(Long passengerId) {
        return bookingRepository.findByPassengerId(passengerId);
    }
    @Override
    public Booking getBookingById(Long bookingId) {

        return bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));
    }
    @Override
    @Transactional
    public Booking cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        if (!"UPCOMING".equalsIgnoreCase(booking.getStatus())) {
            throw new RuntimeException("Only upcoming bookings can be cancelled");
        }

        releaseSeats(booking);

        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }
    @Override
    public Booking completeBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        booking.setStatus("COMPLETED");

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getUpcomingBookings(Long passengerId) {
        return bookingRepository.findByPassengerIdAndStatus(passengerId, "UPCOMING");
    }

    @Override
    public List<Booking> getCancelledBookings(Long passengerId) {
        return bookingRepository.findByPassengerIdAndStatus(passengerId, "CANCELLED");
    }

    @Override
    public List<Booking> getCompletedBookings(Long passengerId) {
        return bookingRepository.findByPassengerIdAndStatus(passengerId, "COMPLETED");
    }

    @Override
    public BookingCountDto getBookingCounts(Long passengerId) {
        long upcoming = bookingRepository.countByPassengerIdAndStatus(passengerId, "UPCOMING");
        long cancelled = bookingRepository.countByPassengerIdAndStatus(passengerId, "CANCELLED");
        long completed = bookingRepository.countByPassengerIdAndStatus(passengerId, "COMPLETED");

        return new BookingCountDto(upcoming, cancelled, completed);
    }

    private void releaseSeats(Booking booking) {

        Flight flight = flightRepository.findById(booking.getFlightId())
                .orElseThrow(() ->
                        new RuntimeException("Flight not found"));

        int seats = booking.getNoOfSeatsBooked();
        String travelClass = booking.getTravelClass();

        if (travelClass == null) {
            throw new RuntimeException("Travel class missing on booking");
        }

        if (travelClass.equalsIgnoreCase("Business")) {
            flight.setLeftSeatCapacityBusiness(
                    flight.getLeftSeatCapacityBusiness() + seats);
        } else if (travelClass.equalsIgnoreCase("Economy")) {
            flight.setLeftSeatCapacityEconomy(
                    flight.getLeftSeatCapacityEconomy() + seats);
        } else if (travelClass.equalsIgnoreCase("Executive")) {
            flight.setLeftSeatCapacityExecutive(
                    flight.getLeftSeatCapacityExecutive() + seats);
        } else {
            throw new RuntimeException("Unknown travel class: " + travelClass);
        }

        flightRepository.save(flight);
    }
}
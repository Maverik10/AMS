package com.Airline.management.controller;

import com.Airline.management.model.Booking;
import com.Airline.management.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.saveBooking(booking);
    }

    @GetMapping("/passenger/{passengerId}")
    public List<Booking> getBookingsByPassenger(
            @PathVariable Long passengerId) {

        return bookingService.getBookingsByPassenger(passengerId);
    }

    @GetMapping("/{bookingId}")
    public Booking getBookingById(
            @PathVariable Long bookingId) {

        return bookingService.getBookingById(bookingId);
    }
    @PutMapping("/{bookingId}/cancel")
    public Booking cancelBooking(
            @PathVariable Long bookingId) {

        return bookingService.cancelBooking(bookingId);
    }
    @PutMapping("/{bookingId}/complete")
    public Booking completeBooking(
            @PathVariable Long bookingId) {

        return bookingService.completeBooking(bookingId);
    }
}
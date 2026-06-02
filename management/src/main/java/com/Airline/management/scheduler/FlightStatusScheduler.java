package com.Airline.management.scheduler;

import com.Airline.management.service.FlightService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Periodically flips UPCOMING flights whose departure date has passed to COMPLETED.
 * Runs shortly after startup (to backfill existing flights) and then once a day.
 */
@Component
public class FlightStatusScheduler {

    private final FlightService flightService;

    public FlightStatusScheduler(FlightService flightService) {
        this.flightService = flightService;
    }

    @Scheduled(initialDelay = 5_000, fixedRate = 86_400_000)
    public void markPastFlightsCompleted() {
        flightService.completePastFlights();
    }
}

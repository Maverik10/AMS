package com.Airline.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingCountDto {

    private long upcoming;
    private long cancelled;
    private long completed;
}

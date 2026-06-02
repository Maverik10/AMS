package com.Airline.management.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "carrier")
public class Carrier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carrierId;

    private String carrierName;

    // Discount %
    private Double discount30Days;
    private Double discount60Days;
    private Double discount90Days;

    private Double bulkBookingDiscount;

    private Double silverUserDiscount;
    private Double goldUserDiscount;
    private Double platinumUserDiscount;

    // Refund %
    private Double refund2Days;
    private Double refund10Days;
    private Double refund20Days;
}


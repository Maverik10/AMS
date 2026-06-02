package com.Airline.management.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Airline.management.model.user;
import com.Airline.management.repository.userRepository;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/user")
public class userController {

    private final userRepository userRepository1;

    public userController(userRepository userRepository1) {
        this.userRepository1 = userRepository1;
    }

    // ✅ 1. REGISTER USER (US004)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody user user1) {

        String firstName = user1.getFirstName();

        String password = firstName.substring(0, Math.min(4, firstName.length())).toLowerCase() + "@123";

        user1.setPassword(password);

        user savedUser = userRepository1.save(user1);

        return ResponseEntity.ok(
            Map.of(
                "message", "Passenger Registration is successful",
                "passengerId", savedUser.getId(),
                "password", savedUser.getPassword()
            )
        );
    }

    // ✅ 2. LOGIN USER (US001)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {

        String userId = loginData.get("userId");
        String password = loginData.get("password");

        Optional<user> userOpt = userRepository1.findById(Long.parseLong(userId));

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("ID not valid");
        }

        user userObj = userOpt.get();

        if (!userObj.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Password not valid");
        }

        return ResponseEntity.ok(userObj);
    }

    // ✅ 3. GET ALL USERS (ADMIN/DEBUG)
    @GetMapping("/")
    public ResponseEntity<List<user>> getAll() {
        return ResponseEntity.ok(userRepository1.findAll());
    }

    // ✅ 4. GET USER BY ID (MY PROFILE)
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<user> userOpt = userRepository1.findById(id);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }
    }

    // ✅ 5. UPDATE USER (EDIT PROFILE - US007)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody user updatedUser) {

        Optional<user> userOpt = userRepository1.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        user existing = userOpt.get();

        existing.setFirstName(updatedUser.getFirstName());
        existing.setLastName(updatedUser.getLastName());
        existing.setDob(updatedUser.getDob());
        existing.setEmail(updatedUser.getEmail());
        existing.setAddress(updatedUser.getAddress());
        existing.setContactNumber(updatedUser.getContactNumber());

        userRepository1.save(existing);

        return ResponseEntity.ok(existing);
    }

    // ✅ 6. DELETE USER (OPTIONAL)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository1.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        userRepository1.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
package com.jwt.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jwt.example.entities.User;
import com.jwt.example.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	
	public List<User> getUsers(){
		return userRepository.findAll();
	}
	
    
	
	public String getCode(int userId) {
        // Retrieve the user by ID from the repository
        User user = userRepository.findById(userId).orElse(null);

        // Check if the user exists
        if (user != null) {
            // Return the unique code for the user
            return user.getUniqueCode();
        } else {
            // Handle the case where the user is not found
            return "User not found";
        }
    }
	
	public User createUser(User user) {
		//user.setUserId(UUID.randomUUID().toString());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setUniqueCode(UUID.randomUUID().toString());
		return userRepository.save(user);
	}



	public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}

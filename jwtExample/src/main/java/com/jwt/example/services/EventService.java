package com.jwt.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jwt.example.entities.Event;
import com.jwt.example.entities.User;
import com.jwt.example.repositories.EventRepository;
import com.jwt.example.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public void createEventForUser(int userId, Event event) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            event.setUser(user);
            // Set other event properties
            eventRepository.save(event);
        } else {
            // Handle the case where the user is not found
            throw new UsernameNotFoundException("User with ID " + userId + " not found");
        }
    }

    /*@Transactional
    public Event createEventForUser(int userId, Event event) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            event.setUser(user);
            // Set other event properties
            Event createdEvent = eventRepository.save(event);
            return createdEvent; // Return the created event
        } else {
            // Handle the case where the user is not found
            throw new UsernameNotFoundException("User with ID " + userId + " not found");
        }
    }*/
}

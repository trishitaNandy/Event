package com.jwt.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwt.example.entities.Event;
import com.jwt.example.services.EventService;

@RestController
@RequestMapping("/event")
public class EventController {

	 @Autowired
	 private EventService eventService;

	 @PostMapping("/create/{userId}")
	 public ResponseEntity<String> createEvent(@PathVariable int userId, @RequestBody Event event) {
	        eventService.createEventForUser(userId, event);
	        return ResponseEntity.ok("Event created successfully");
	    } 
}

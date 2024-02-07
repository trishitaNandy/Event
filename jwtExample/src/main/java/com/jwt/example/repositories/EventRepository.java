package com.jwt.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.example.entities.Event;

public interface EventRepository extends JpaRepository<Event, Integer>{

}

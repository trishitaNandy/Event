package com.jwt.example.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="event_table")
public class Event {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private int eventId;

	    private String name;

	    //private Date date;
		private LocalDate date;

    	private LocalTime timing;

	    //private String timing;

	    private String venue;

	    @ManyToOne(cascade = CascadeType.PERSIST)
	    @JoinColumn(name = "userId")
	    User user;

}

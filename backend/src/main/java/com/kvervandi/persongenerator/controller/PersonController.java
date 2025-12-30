package com.kvervandi.persongenerator.controller;

import com.kvervandi.persongenerator.model.Person;
import com.kvervandi.persongenerator.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "*")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/person")
    public ResponseEntity<Person> generatePerson() {
        Person person = personService.generatePerson();
        return ResponseEntity.ok(person);
    }
}
package com.kvervandi.persongenerator.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Person {
    private String fullName;
    private String cpf;
    private String phoneNumber;
    private Address address;
}
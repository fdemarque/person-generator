package com.kvervandi.persongenerator.service;

import com.kvervandi.persongenerator.model.Address;
import com.kvervandi.persongenerator.model.Person;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PersonService {
    private static final String[] FIRST_NAMES = {
            "Ana", "Bruno", "Carla", "Daniel", "Eduarda",
            "Filipe", "Gabriela", "Henrique", "Isabela", "João", "Karina", "Lucas", "Mariana", "Nicolas", "Olivia",
            "Pedro", "Quésia", "Rafael", "Sofia", "Tiago", "Vitória", "Wesley", "Yasmin", "Renan"
    };

    private static final String[] LAST_NAMES = {
            "Silva", "Santos", "Oliveira", "Souza", "Rodrigues",
            "Ferreira", "Almeida", "Costa", "Gomes", "Martins",
            "Araújo", "Barbosa", "Cardoso", "Dias", "Fernandes",
            "Lima", "Mendes", "Nunes", "Pereira", "Ribeiro"
    };

    private static final String[] STREETS = {
            "Rua das Flores", "Avenida Brasil", "Travessa da Paz", "Alameda dos Anjos",
            "Rua do Sol", "Avenida Central", "Travessa das Acácias", "Alameda Vitória", "Rua Primavera", "Avenida das Nações"
    };

    private static final String[] NEIGHBORHOODS = {
            "Centro", "Jardim América", "Vila Nova", "Bela Vista",
            "São João", "Liberdade", "Boa Vista", "Recanto Feliz", "Morada do Sol", "Parque das Nações"
    };

    private static final String[] CITIES = {
            "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba",
            "Porto Alegre", "Salvador", "Fortaleza", "Brasília", "Manaus", "Recife", "Florianópolis"
    };

    private static final String[] STATES = {
            "SP", "RJ", "MG", "PR", "RS", "BA", "CE", "DF", "AM", "PE", "SC", "GO", "ES", "MT", "MS", "TO", "PA", "RO", "RR", "AP"
    };

    private final Random random = new Random();

    public Person generatePerson() {
        return Person.builder()
                .fullName(generateFullName())
                .cpf(generateValidCPF())
                .phoneNumber(generatePhoneNumber())
                .address(generateAddress())
                .build();
    }

    private String generateFullName() {
        String firstName = FIRST_NAMES[random.nextInt(FIRST_NAMES.length)];
        String lastName1 = LAST_NAMES[random.nextInt(LAST_NAMES.length)];
        String lastName2 = LAST_NAMES[random.nextInt(LAST_NAMES.length)];
        return firstName + " " + lastName1 + " " + lastName2;
    }

    private String generateValidCPF() {
        // Generate first 9 digits
        int[] cpf = new int[11];
        for (int i = 0; i < 9; i++) {
            cpf[i] = random.nextInt(10);
        }

        // Calculate first check digit
        cpf[9] = calculateCPFCheckDigit(cpf, 9);

        // Calculate second check digit
        cpf[10] = calculateCPFCheckDigit(cpf, 10);

        // Format CPF as XXX.XXX.XXX-XX
        return String.format("%d%d%d.%d%d%d.%d%d%d-%d%d",
                cpf[0], cpf[1], cpf[2],
                cpf[3], cpf[4], cpf[5],
                cpf[6], cpf[7], cpf[8],
                cpf[9], cpf[10]);
    }

    private int calculateCPFCheckDigit(int[] cpf, int weight) {
        int sum = 0;
        int limit = weight - 1;
        for (int i = 0; i < limit; i++) {
            sum += cpf[i] * (weight - i);
        }
        int remainder = sum % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    private String generatePhoneNumber() {
        int areaCode = 10 + random.nextInt(90); // Area code between 10 and 99
        int firstPart = 9000 + random.nextInt(10000); // First part between 9000 and 9999
        int secondPart = 1000 + random.nextInt(9000); // Second part between 1000 and 9999
        return String.format("(%d) %d-%d", areaCode, firstPart, secondPart);
    }

    private Address generateAddress() {
        String street = STREETS[random.nextInt(STREETS.length)];
        String number = String.valueOf(1 + random.nextInt(9999));
        String neighborhood = NEIGHBORHOODS[random.nextInt(NEIGHBORHOODS.length)];
        String city = CITIES[random.nextInt(CITIES.length)];
        String state = STATES[random.nextInt(STATES.length)];
        String cep = String.format("%05d-%03d", random.nextInt(100000), random.nextInt(1000));

        return Address.builder()
                .street(street)
                .number(number)
                .neighborhood(neighborhood)
                .city(city)
                .state(state)
                .cep(cep)
                .build();
    }
}
package com.alikaya.Ask_App.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    Long id;

    String username;
    String name;

    
}

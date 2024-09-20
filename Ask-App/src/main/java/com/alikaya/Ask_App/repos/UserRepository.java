package com.alikaya.Ask_App.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alikaya.Ask_App.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}

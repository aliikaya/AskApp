package com.alikaya.Ask_App.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alikaya.Ask_App.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}

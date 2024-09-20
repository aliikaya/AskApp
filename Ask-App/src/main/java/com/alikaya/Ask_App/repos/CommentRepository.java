package com.alikaya.Ask_App.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alikaya.Ask_App.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}

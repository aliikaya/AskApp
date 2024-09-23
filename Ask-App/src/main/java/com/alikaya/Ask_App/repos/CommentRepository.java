package com.alikaya.Ask_App.repos;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alikaya.Ask_App.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

    List<Comment> findByUserIdAndPostId(Long userId, Long postId);

    List<Comment> findByUserId(Long userId);

    List<Comment> findByPostId(Long postId);

    

}

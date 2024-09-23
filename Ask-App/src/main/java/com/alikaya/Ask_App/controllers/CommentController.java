package com.alikaya.Ask_App.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;


import com.alikaya.Ask_App.entities.Comment;
import com.alikaya.Ask_App.request.CommentCreateRequest;
import com.alikaya.Ask_App.request.CommentUpdateRequest;
import com.alikaya.Ask_App.services.CommentService;

@RestController
@RequestMapping("/comments")
public class CommentController {
    
    private CommentService commentService;

    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping()
    public List<Comment> getAllComment(@RequestParam Optional<Long> userId, @RequestParam Optional<Long> postId){
        return commentService.getAllCommentsWithParam(postId, userId);
    }

    @GetMapping("/{commentId}")
    public Comment getOneComment(@PathVariable Long commentId){
        return commentService.getOneComment(commentId);
    }

    @PostMapping
    public Comment createOneComment(@RequestBody CommentCreateRequest newCommentRequest){
        return commentService.createOneComment(newCommentRequest);
    }

    @PutMapping("/{commentId}")
    public Comment updateComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest updateComment){
        return commentService.UpdateOneCommentById(commentId, updateComment);
    }

    @DeleteMapping("/{commentId}")
    public void deleteOneComment(@PathVariable Long commentId){
        commentService.deleteOneCommentById(commentId);
    }

}

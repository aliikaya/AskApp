package com.alikaya.Ask_App.controllers;

import java.util.List;

import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alikaya.Ask_App.entities.Post;
import com.alikaya.Ask_App.services.PostService;

@RestController
@RequestMapping("/posts")
public class PostController {

    private PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts(@RequestParam Optional<Long> userId){
        return postService.getAllPosts(userId);
    }

    @PostMapping
    public Post createOnePost(@RequestBody Post newPost){
        return postService.saveOnePost(newPost);
    }

    @GetMapping("{/userId}")
    public Post getOnePost(@RequestBody Long userId){
        return postService.getOnePost(userId);
    }

}

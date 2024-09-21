package com.alikaya.Ask_App.services;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.alikaya.Ask_App.entities.Post;
import com.alikaya.Ask_App.repos.PostRepository;

@Service
public class PostService {
    private PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts(@RequestBody Optional<Long> userId) {
        if(userId.isPresent()){
            return postRepository.findByUserId(userId.get());
        }else
            return postRepository.findAll();
    }

    public Post saveOnePost(Post newPost) {
       return postRepository.save(newPost);
    }

    public Post getOnePost(Long userId) {
        return postRepository.findById(userId).orElse(null);
    }


}

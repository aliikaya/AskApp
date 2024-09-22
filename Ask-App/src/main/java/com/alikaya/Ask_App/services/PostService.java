package com.alikaya.Ask_App.services;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.alikaya.Ask_App.entities.Post;
import com.alikaya.Ask_App.entities.User;
import com.alikaya.Ask_App.repos.PostRepository;
import com.alikaya.Ask_App.request.PostCreateRequest;
import com.alikaya.Ask_App.request.PostUpdateRequest;

@Service
public class PostService {
    private PostRepository postRepository;
    private UserService userService;

    public PostService(PostRepository postRepository,  UserService userService){
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<Post> getAllPosts(@RequestBody Optional<Long> userId) {
        if(userId.isPresent()){
            return postRepository.findByUserId(userId.get());
        }else
            return postRepository.findAll();
    }

    public Post createOnePost(PostCreateRequest newPostRequest) {
        User user = userService.getOneUser(newPostRequest.getUserId());
        if(user == null){
            return null;
        }else{
            Post toSave = new Post();
            toSave.setId(newPostRequest.getId());
            toSave.setText(newPostRequest.getText());
            toSave.setTitle(newPostRequest.getTitle());
            toSave.setUser(user);
           return postRepository.save(toSave);
        }
    }

    public Post getOnePostById(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public Post updatePost(Long postId, PostUpdateRequest updatePost) {
        Optional<Post> post = postRepository.findById(postId);
        if(post.isPresent()){
            Post toUpdate = post.get();
            toUpdate.setText(updatePost.getText());
            toUpdate.setTitle(updatePost.getTitle());
            postRepository.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    public void deleteOnePost(Long postId) {
         postRepository.deleteById(postId);
    }


}

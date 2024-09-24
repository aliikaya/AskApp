package com.alikaya.Ask_App.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.alikaya.Ask_App.entities.Post;
import com.alikaya.Ask_App.entities.User;
import com.alikaya.Ask_App.repos.PostRepository;
import com.alikaya.Ask_App.request.PostCreateRequest;
import com.alikaya.Ask_App.request.PostUpdateRequest;
import com.alikaya.Ask_App.responses.PostResponse;

@Service
public class PostService {
    private PostRepository postRepository;
    private UserService userService;

    public PostService(PostRepository postRepository,  UserService userService){
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<PostResponse> getAllPosts(Optional<Long> userId) {
        List<Post> list;
        if(userId.isPresent()){
            list = postRepository.findByUserId(userId.get());
        }else{
            list = postRepository.findAll();
        }
        return list.stream().map(p -> new PostResponse(p)).collect(Collectors.toList());
    }
    

    public Post createOnePost(PostCreateRequest newPostRequest) {
        User user = userService.getOneUserById(newPostRequest.getUserId());
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
            return postRepository.save(toUpdate);
            
        }
        return null;
    }

    public void deleteOnePost(Long postId) {
         postRepository.deleteById(postId);
    }


}

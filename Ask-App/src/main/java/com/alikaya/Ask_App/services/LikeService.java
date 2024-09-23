package com.alikaya.Ask_App.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.alikaya.Ask_App.entities.Like;
import com.alikaya.Ask_App.entities.Post;
import com.alikaya.Ask_App.entities.User;
import com.alikaya.Ask_App.repos.LikeRepository;
import com.alikaya.Ask_App.request.LikeCreateRequest;

@Service
public class LikeService {

    private LikeRepository likeRepository;
    private UserService userService;
    private PostService postService;

    public LikeService(LikeRepository likeRepository, UserService userService, PostService postService){
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<Like> getAllLikesWithParam(Optional<Long> userId, Optional<Long> postId) {
        if(postId.isPresent() && userId.isPresent()){
            return likeRepository.findByUserIdAndPostId(userId.get(),postId.get());
        }else if(userId.isPresent()){
            return likeRepository.findByUserId(userId.get());
        }else if(postId.isPresent()){
            return likeRepository.findByPostId(postId.get());
        }else{
            return likeRepository.findAll();
        }
    }

    public Like getOneLikeById(Long LikeId) {
		return likeRepository.findById(LikeId).orElse(null);
	}

    public Like createOneLike(LikeCreateRequest newLike) {
        User user = userService.getOneUserById(newLike.getUserId());
        Post post = postService.getOnePostById(newLike.getPostId());
        if(user != null && post != null){
            Like toLike = new Like();
            toLike.setPost(post);
            toLike.setUser(user);
            return likeRepository.save(toLike);
        }else 
            return null;
        
    }

    public void deleteOneLike(Long likeId) {
       likeRepository.deleteById(likeId);
    }

}

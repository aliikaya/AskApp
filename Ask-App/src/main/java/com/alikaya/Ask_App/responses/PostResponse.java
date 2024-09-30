package com.alikaya.Ask_App.responses;

import java.util.List;

import com.alikaya.Ask_App.entities.Post;

import lombok.Data;

@Data
public class PostResponse {
    Long id;
    Long userId;
    String userName;
    String title;
    String text;
    List<LikeResponse> postLike;

    public PostResponse(Post entity, List<LikeResponse> likes){

        this.id = entity.getId();
        this.userId = entity.getUser().getId();
        this.userName = entity.getUser().getUsername();
        this.title = entity.getTitle();
        this.text = entity.getText();
        this.postLike = likes;
        

    }


}

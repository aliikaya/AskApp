package com.alikaya.Ask_App.responses;

import com.alikaya.Ask_App.entities.Like;

import lombok.Data;

@Data
public class LikeResponse {

    Long id;
    Long userId;
    Long postId;

    public LikeResponse(Like enttity){
        this.id = enttity.getId();
        this.userId = enttity.getUser().getId();
        this.postId = enttity.getPost().getId();
    }

}

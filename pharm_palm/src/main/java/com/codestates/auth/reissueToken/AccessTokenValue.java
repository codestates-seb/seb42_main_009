package com.codestates.auth.reissueToken;

import lombok.Setter;

import java.util.Date;

@Setter
public class AccessTokenValue {
    private String accessToken;
    private Date expiration;

    public AccessTokenValue(String accessToken, Date expiration) {
        this.accessToken = accessToken;
        this.expiration = expiration;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public Date getExpiration() {
        return expiration;
    }
}

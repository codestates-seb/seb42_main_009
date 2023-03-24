package com.codestates.auth.reissueToken.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
    @Id
    @Column(nullable = false)
    private String refreshToken;
}

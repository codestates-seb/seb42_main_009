package com.codestates.auth.refreshToken.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class RefreshToken {
    @Id
    @Column(nullable = false)
    private String refreshToken;
}

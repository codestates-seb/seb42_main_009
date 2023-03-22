package com.codestates.auth.refreshToken.repository;

import com.codestates.auth.refreshToken.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    boolean existsByRefreshToken(String token);
}

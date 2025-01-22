package com.login.example.login.repository;


import com.login.example.login.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, String> {}


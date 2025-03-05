package com.login.example.login.request;



public class loginRequest {

    private String userid;
    private String password;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public loginRequest(){}

    public loginRequest(String userid, String password) {
        this.userid = userid;
        this.password = password;
    }
}

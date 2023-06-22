<?php
class User implements JsonSerializable  {
    private $id;
    private $nickname;
    private $email;
    private $password_hash;
    private $avatar;

    function __construct($id,$nickname,$email,$password_hash="clasified data",$avatar=""){
        $this->id=$id;
        $this->nickname=$nickname;
        $this->email=$email;
        $this->password_hash=$password_hash;
        $this->avatar=$avatar;
    }
      function set_nickname($nickname){
        $this->nickname=$nickname;
      }
      function get_nickname(){
        return $this->nickname;
      }
      function set_id($id){
        $this->id=$id;
      }
      function get_id(){
        return $this->id;
      }
      function set_email($email){
        $this->email=$email;
      }
      function get_email(){
        return $this->email;
      }
      function set_password_hash($password_hash){
        $this->password_hash=$password_hash;
      }
      function get_password_hash(){
        return $this->password_hash;
      }
      function set_avatar($avatar){
        $this->avatar=$avatar;
      }
      function get_avatar(){
        return $this->avatar;
      }
      public function jsonSerialize() {
        return [
             "id" => $this->id,
            'nickname' => $this->nickname,
            'email' => $this->email,
            'password_hash' => $this->password_hash,
            'avatar'=>$this->avatar
        ];
    }
}

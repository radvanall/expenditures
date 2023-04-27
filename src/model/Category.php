<?php
class Category implements JsonSerializable{
    private $id;
    private $category_name;
    private $user_id;

    function __construct($id,$category_name,$user_id){
        $this->id=$id;
        $this->category_name=$category_name;
        $this->user_id=$user_id;
    }
    function set_id($id){
        $this->id=$id;
    }
    function get_id(){
        return $this->id;
    }
    function set_category_name($category_name){
        $this->category_name=$category_name;
    }
    function get_category_name(){
        return $this->category_name;
    } 
    function set_user_id($user_id){
        $this->user_id=$user_id;
    }
    function get_user_id(){
        return $this->user_id;
    }
    public function jsonSerialize(){
        return [
            "id"=>$this->id,
            "category_name"=>$this->category_name,
            "user_id"=>$this->user_id
        ];
    }
}  
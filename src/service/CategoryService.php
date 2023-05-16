<?php
include "../src/model/Category.php";
include_once  "Service.php";
class CategoryService extends Service{
    function findAll($user_id){
        $categories=array();
        $data=parent::findAll($user_id);
        if(is_array($data)){
        foreach($data as $category){
            array_push( $categories,new Category($category->id,$category->category_name,$category->user_id));
        }
        return $categories;}
        return $data;
    }
    function findById($id){
        $data=parent::findById($id);
        if(property_exists($data,'error')){return $data;}
        $category=new Category($data->id,$data->category_name,$data->user_id);
        return $category;
    }
    function delete($id){
        return parent::delete($id);
    }    
   function insert($new){
    if(empty($new->category_name)){ return $this->errorMessage->error='Invalid category name!';}
    if(empty($new->user_id)){ return $this->errorMessage->error='The category should have an user id!';}
    $category=new Category(0,$new->category_name,$new->user_id);
    try{
     //   $this->repository->getConnection();
       $message=$this->repository->insert($category);
    //   $this->repository->disconnect();
       if($message){return  array('success'=>"The category has been created");}
       else{ return $this->errorMessage->error='Something went wrong';}
    }catch(PDOException $e){
        return $this->errorMessage->error="Connection failed: " . $e->getMessage();
    }
   }
   function update($modified_category){
    if(empty($modified_category->category_name)){ return $this->errorMessage->error='Invalid category name!';}
    $category=new Category($modified_category->id,$modified_category->category_name,0);
    try{
        $message=$this->repository->update($category);
        if($message){return $this->successMessage->success="The category has been updated.";}
         else{
             return $this->errorMessage->error='Something went wrong';}
    }   catch(PDOException $e){ 
   return $this->errorMessage->error='Connection failed: '. $e->getMessage();
   }}
}
<?php
include "../src/model/Category.php";
include_once  "Service.php";
require_once "../src/DTO/CategoryTableDTO.php";
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
        $user_id=$_SESSION["user_id"];        
        try{
          $response= $this->repository->changeCategoryToDelete($user_id,$id); 
        if(!isset($response)) return $this->returnError('noDefaultCategory');
           return parent::delete($id);
         }catch(PDOException $e){
            return $this->returnError( $this->errorMessage->error='Connection failed: '. $e->getMessage());
        }   
    }    
   function insert($new){
    if(empty($new->category_name)){ return $this->returnError('Invalid category name!');}
    if($new->category_name=="default_category"){ return $this->returnError("reservedName");}
    if(empty($new->user_id)){return $this->returnError('The category should have an user id!');}
    $category=new Category(0,$new->category_name,$new->user_id);
    try{
       $message=$this->repository->insert($category);
       if($message){
        return $this->returnSuccess("createCategory");
    }
       else{ return $this->returnError("somethingWentWrong");}
    }catch(PDOException $e){
        return $this->returnError("Connection failed: " . $e->getMessage());
    }
   }
   function update($modified_category){
    if(empty($modified_category->category_name)){ return $this->returnError('Invalid category name!');}
    if($modified_category->category_name=="default_category"){ return $this->returnError("reservedName");}
    $category=new Category($modified_category->id,$modified_category->category_name,0);
    try{
        $message=$this->repository->update($category);
        // echo "message" . $message;
        if(!isset($message)){ return $this->returnError("somethingWentWrong");}
        if($message===0){ return $this->returnError("nothingChanged");}
        if($message=="defaultCategory") { 
            return $this->returnError("defaultCategory");}
        return $this->returnSuccess("updateCategory");
    }   catch(PDOException $e){ 
        return $this->returnError("Connection failed: " . $e->getMessage());
   }}
   function findCategoriesAndItems($user_id){
    try{
        $data=$this->repository->findCategoriesAndItems($user_id); 
    }catch(PDOException $e){
        return $this->returnError("Connection failed: " . $e->getMessage());}
    if(!$data){
       return [];
    }
    $grouped=array_reduce($data,function($result,$field){
        $category_id=$field->category_id;
        $category_name=$field->category_name;
        $item_id=$field->item_id;
        $item_name=$field->item_name;
        $unit=$field->unit;
        if(!isset($result[$category_id])){
            $result[$category_id]=[
                'category_id'=>$category_id,
                'category_name'=>$category_name,
                'items'=>[],
            ];
        }
        $result[$category_id]['items'][]=[
            'item_id'=>$item_id,
            'item_name'=>$item_name,
            'unit'=>$unit,
        ];
        return $result;

    },[]);
    $grouped=array_values($grouped);
    return $grouped; 
    }

    public function getCategoryTable($user_id){
        try{
            $result=$this->repository->getCategoryTable($user_id);
            $categories=array();
            foreach($result as $category){
                array_push($categories,new CategoryTableDTO($category->category_id,$category->category_name,$category->nr_of_items,$category->total_price));
            }
            $response=new stdClass();
            $response->categories=$categories;
            return $response;
            
        }catch(PDOException $e){
            return $this->returnError( $this->errorMessage->error='Connection failed: '. $e->getMessage());
        }
    }

}


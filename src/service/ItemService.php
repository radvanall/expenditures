<?php
include "../src/model/Item.php";
include_once  "Service.php";
require_once "../src/DTO/ItemTableDTO.php";
class ItemService extends Service{
    function findAll($user_id){  
        $items=array();
        $data=parent::findAll($user_id);
        if(is_array($data)){
           foreach($data as $item){
               array_push($items,new Item($item->id,$item->item_name,$item->unit,$item->category_id,$item->user_id));
           }
           return $items;}
           return $data;
       }
       function findById($id){
           $data=parent::findById($id);
           if(property_exists($data,'error')){return $data;}
           $item =new Item($data->id,$data->item_name,$data->unit,$data->category_id,$data->user_id);
           return $item;
       }
       function delete($id){
           return parent::delete($id);
       }
       function insert($new){
        if(empty($new->item_name)){ return $this->errorMessage->error='Invalid item name!';}
        $item=new Item(0,$new->item_name,$new->unit,$new->category_id,$new->user_id);
        try{
         //   $this->repository->getConnection();
           $message=$this->repository->insert($item);
        //   $this->repository->disconnect();
           if($message){ $this->successMessage->success="The category has been created";return $this->successMessage;}
           else{ return $this->errorMessage->error='Something went wrong';}
        }catch(PDOException $e){
            $this->errorMessage->error="Connection failed: " . $e->getMessage();
            return $this->errorMessage;
        }
       }
       function update($modified){
        if(empty($modified->item_name)){ return $this->errorMessage->error='Invalid category name!';}
        $user_id=$_SESSION["user_id"];
        $item=new Item($modified->id,$modified->item_name,$modified->unit,$modified->category_id,$user_id);
        try{
            $message=$this->repository->update($item);
            if($message){ $this->successMessage->success="The item has been updated.";
                return $this->successMessage;
            }
             else{
                 return $this->returnError( 'Something went wrong'); }
        }   catch(PDOException $e){ 
       return $this->returnError( 'Connection failed: '. $e->getMessage());
       }}

       public function getItemTable($user_id){
        try{
            $result=$this->repository->getItemTable($user_id);
            $items=array();
            foreach($result as $item){
                array_push($items,new ItemTableDTO($item->id,$item->item_name,$item->category_id,$item->category_name,$item->unit,$item->total_price));
            }
            $response=new stdClass();
            $response->items=$items;
            return $response;
            
        }catch(PDOException $e){
            return $this->returnError( 'Connection failed: '. $e->getMessage());
        }
    }
    
    public function getItemChart($user_id){
        try{
            $result=$this->repository->getItemChart($user_id);
            $items=array();
            foreach($result as $item){
                array_push($items,new ItemTableDTO($item->id,$item->item_name,$item->category_id,$item->category_name,$item->unit,$item->total_price));
            }
            $response=new stdClass();
            $response->items=$items;
            return $response;
            
        }catch(PDOException $e){
            return $this->returnError( 'Connection failed: '. $e->getMessage());
        }
    }
    public function getItemChartWeek($user_id){
        try{
            $result=$this->repository->getItemChartWeek($user_id);
            $items=array();
            foreach($result as $item){
                array_push($items,new ItemTableDTO($item->id,$item->item_name,$item->category_id,$item->category_name,$item->unit,$item->total_price));
            }
            $response=new stdClass();
            $response->items=$items;
            return $response;
            
        }catch(PDOException $e){
            return $this->returnError( 'Connection failed: '. $e->getMessage());
        }
    }
}
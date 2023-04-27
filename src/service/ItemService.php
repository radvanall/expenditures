<?php
include "../src/model/Item.php";
include_once  "Service.php";
class ItemService extends Service{
    function findAll(){  
        $items=array();
        $data=parent::findAll();
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
           if($message){return  array('success'=>"The category has been created");}
           else{ return $this->errorMessage->error='Something went wrong';}
        }catch(PDOException $e){
            return $this->errorMessage->error="Connection failed: " . $e->getMessage();
        }
       }
       function update($modified){
        if(empty($modified->item_name)){ return $this->errorMessage->error='Invalid category name!';}
        $item=new Item($modified->id,$modified->item_name,$modified->unit,$modified->category_id,$modified->user_id);
        try{
            $message=$this->repository->update($item);
            if($message){return $this->successMessage->success="The item has been updated.";}
             else{
                 return $this->errorMessage->error='Something went wrong';}
        }   catch(PDOException $e){ 
       return $this->errorMessage->error='Connection failed: '. $e->getMessage();
       }}
}
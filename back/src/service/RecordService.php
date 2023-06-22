<?php
include "../src/model/Record.php";
include_once  "Service.php";
class RecordService extends Service{
    function findAll($user_id){
        $records=array();
        $data=parent::findAll($user_id);
        if(is_array($data)){
        foreach($data as $record){
            array_push($records,new Record($record->id,$record->quantity,$record->price,$record->invoice_id,$record->item_id));
        }
        return $records;}
        return $data;
    }
    function findById($id){
        $record=parent::findById($id);
        if(property_exists($record,'error')){return $record;}
        $result=new Record($record->id,$record->quantity,$record->price,$record->invoice_id,$record->item_id);
        return $result;
    }
    function delete($id){
        return parent::delete($id);
    }  

    public function insert($new){
        if(empty($new->quantity)){ return $this->returnError('Invalid quantity!');}
        if(empty($new->invoice_id)){ return $this->returnError( 'Invalid invoice_id!');}
        if(empty($new->item_id)){ return $this->returnError('Invalid item!');}
        $record=new Record(0,$new->quantity,$new->price,$new->invoice_id,$new->item_id);
        try{
           $message=$this->repository->insert($record);
           if($message){
            return $this->returnSuccess("addRecord");
           }
           else{ 
            return $this->returnError("somethingWentWrong");
        }
        }catch(PDOException $e){
            return $this->returnError("Connection failed: " . $e->getMessage());
        }
    }
    public function update($new){
        if(empty($new->id)){ return $this->returnError('The record should have an id!');}
        if(empty($new->quantity)){ 
            return $this->returnError('Invalid quantity!');}
        if(empty($new->item_id)){ 
            return $this->returnError('Invalid item!');
            }
         if(empty($new->price)){ 
                return $this->returnError('Invalid price!');
             }
              
        $record=new Record($new->id,$new->quantity,$new->price,0,$new->item_id);
        try{
            $message=$this->repository->update($record);
            if($message) return $this->returnSuccess("updateRecord");
             else{
                return $this->returnError("dataNotChanged");

            }
        }   catch(PDOException $e){ 
       return $this->returnError('Connection failed: '. $e->getMessage()); 
       }


    }
}
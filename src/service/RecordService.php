<?php
include "../src/model/Record.php";
include_once  "Service.php";
class RecordService extends Service{
    function findAll(){
        $records=array();
        $data=parent::findAll();
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
        if(empty($new->quantity)){ return $this->errorMessage->error='Invalid quantity!';}
        if(empty($new->invoice_id)){ return $this->errorMessage->error='Invalid invoice_id!';}
        if(empty($new->item_id)){ return $this->errorMessage->error='Invalid item!';}

       
        $record=new Record(0,$new->quantity,$new->price,$new->invoice_id,$new->item_id);
        try{
          // $this->repository->getConnection();
           $message=$this->repository->insert($record);
         //  $this->repository->disconnect();
           if($message){return  array('success'=>"The record has been created");}
           else{ return $this->errorMessage->error='Something went wrong';}
        }catch(PDOException $e){
            return $this->errorMessage->error="Connection failed: " . $e->getMessage();
        }
    }
    public function update($new){
        if(empty($new->id)){ return $this->errorMessage->error='The record should have an id!';}
        if(empty($new->quantity)){ return $this->errorMessage->error='Invalid quantity!';}
        if(empty($new->invoice_id)){ return $this->errorMessage->error='Invalid invoice_id!';}
        if(empty($new->item_id)){ return $this->errorMessage->error='Invalid item!';}

        $record=new Record($new->id,$new->quantity,$new->price,$new->invoice_id,$new->item_id);
        try{
            $message=$this->repository->update($record);
            if($message){return $this->successMessage->success="The record has been updated.";}
             else{
                 return $this->errorMessage->error='Data has not changed!';}
        }   catch(PDOException $e){ 
       return $this->errorMessage->error='Connection failed: '. $e->getMessage();
       }


    }
}
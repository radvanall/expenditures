<?php
include "../src/model/Invoice.php";
include "../src/model/Category.php";
include "../src/model/Record.php";
include "../src/model/Item.php";
include_once  "Service.php";
class InvoiceService extends Service{  
      function prepareInsert($date,$user_id){
        if(empty($date)){ return $this->errorMessage->error='Invalid date!';}
        if(empty($user_id)){ return $this->errorMessage->error='The invoice should have an user id!';}
        $date=date("Y-m-d",strtotime($date));
        $invoice=new Invoice(0,$user_id,$date);
        try{
         //  $this->repository->getConnection();
           $message=$this->repository->insert($invoice);
          // $this->repository->disconnect();
           if($message){return  $this->successMessage->success='The invoice has been added';}
           else{ return $this->errorMessage->error='Something went wrong';}
        }catch(PDOException $e){
            return $this->errorMessage->error="Connection failed: " . $e->getMessage();
        }
      }
      function findAll($user_id){
        $invoices=array();
        $data=parent::findAll($user_id);
        if(is_array($data)){
            foreach($data as $invoice){
                array_push($invoices,new Invoice($invoice->id,$invoice->user_id,$invoice->date));
            }
            return $invoices;}
            return $data;
    }
    function findById($id){
        $data=parent::findById($id);
        if(property_exists($data,'error')){return $data;}
        $invoice=new Invoice($data->id,$data->user_id,$data->date);
        return $invoice;
    }
    function delete($id){
        return parent::delete($id);
    }
    function insert($new){
        // $this->repository->getConnection();
        $result=$this->prepareInsert($new);
        $this->repository->disconnect();
        return $result;
    }

    function update($data){
        if(empty($data->date)){ return $this->errorMessage->error='Invalid date!';}
        if(empty($data->user_id)){ return $this->errorMessage->error='The invoice should have an user id!';}
        $date=date("Y-m-d",strtotime($data->date));
        $invoice=new Invoice($data->id,$data->user_id,$date);
        try{
            $message=$this->repository->update($invoice);
            if($message){return $this->successMessage->success="The invoice has been updated.";}
             else{
                 return $this->errorMessage->error='Something went wrong';}
        }   catch(PDOException $e){ 
       return $this->errorMessage->error='Connection failed: '. $e->getMessage();
       }}
    
    function error($errorMessage="error"){
        $this->repository->rollBack();
        $this->repository->disconnect();
         $this->errorMessage->error=$errorMessage;
         return  $this->errorMessage;
    }

    function insertRecords($records,$date,$user_id,$recordRepository,$categoryRepository,$itemRepository){
        try {
                $this->repository->getConnection();
                $this->repository->beginTransaction();
                $result=$this->prepareInsert($date,$user_id);
                if(property_exists($result,'error')){
                    $this->repository->rollBack();
                    $this->repository->disconnect();
                    return $result;
                }
                $invoiceId=$this->repository->getLastInsertId();
                foreach($records as $record)
                {
                    $itemId=$record['item_id'];
                    if(empty($record['quantity'])) return $this->error('Invalid quantity!');
                    $new_record=new Record(0,$record['quantity'],$record['price'],$invoiceId,$itemId);
                    $message=$recordRepository->insert($new_record);
                    if(!$message) return $this->error('Something went wrong with record');
                } 
                $this->repository->commit();
                $this->repository->disconnect();
                return  $this->successMessage->success='The invoice has been added';
            } 
        catch (PDOException $e){ return $this->error('Connection failed: '. $e->getMessage());}
    }  
}

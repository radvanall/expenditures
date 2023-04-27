<?php
include "../src/model/Invoice.php";
include "../src/model/Category.php";
include "../src/model/Record.php";
include "../src/model/Item.php";
include_once  "Service.php";
class InvoiceService extends Service{  
      function prepareInsert($new){
        if(empty($new->date)){ return $this->errorMessage->error='Invalid date!';}
        if(empty($new->user_id)){ return $this->errorMessage->error='The invoice should have an user id!';}
        $date=date("Y-m-d",strtotime($new->date));
        $invoice=new Invoice(0,$new->user_id,$date);
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
      function findAll(){
        $invoices=array();
        $data=parent::findAll();
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

    function insertRecords($records,$invoice,$recordRepository,$categoryRepository,$itemRepository){
        try {
                $this->repository->getConnection();
                $this->repository->beginTransaction();
                $result=$this->prepareInsert($invoice);
                if(property_exists($result,'error')){
                    $this->repository->rollBack();
                    $this->repository->disconnect();
                    return $result;
                }
                $invoiceId=$this->repository->getLastInsertId();
                foreach($records as $record)
                {
                    if(empty($record["item"]))
                    {
                        $this->repository->rollBack();
                        $this->repository->disconnect();
                        return $this->errorMessage->error='Invalid item!';
                    }
                    if(empty($record["item"]["category_id"]))
                    { 
                        $this->repository->rollBack();
                        $this->repository->disconnect();
                        return $this->errorMessage->error='Invalid category id!';
                    }
                    $categoryId=$record["item"]['category_id'];
                
                    if(substr($record["item"]["category_id"],-3)=="new")
                    {
                        if(empty($record['item']['category_name']))
                        {
                            $this->repository->rollBack();
                            $this->repository->disconnect();
                            return $this->errorMessage->error='Invalid category name!';
                        }
                        $category=new Category(0,$record['item']['category_name'],$invoice->user_id);
                        $message=$categoryRepository->insert($category);
                        if(!$message)
                        {
                            $this->repository->rollBack();
                            $this->repository->disconnect();
                            return $this->errorMessage->error='Something went wrong1';
                        }
                        $categoryId=$categoryRepository->getLastInsertId();
                    }
                   
                    if(empty($record['item']['item_name']))
                    { 
                        $this->repository->rollBack();
                        $this->repository->disconnect();
                        return $this->errorMessage->error='Invalid item name!';
                    }
                    if(empty($record['item']['unit']))
                    { 
                        $this->repository->rollBack();
                        $this->repository->disconnect();
                        return $this->errorMessage->error='Invalid unit!';
                    } 
                    $itemId=$record['record']['item_id'];
                    if(substr($record['record']['item_id'],-3)=="new")
                    {
                        $new_item=new Item(0,$record['item']['item_name'],$record['item']['unit'],$categoryId,$invoice->user_id);
                        $message=$itemRepository->insert($new_item);
                        if(!$message) 
                        {
                            $this->repository->rollBack();
                            $this->repository->disconnect();
                            return $this->errorMessage->error='Something went wrong with item';
                        } 
                        $itemId=$itemRepository->getLastInsertId();
                    }
                    if(empty($record['record']['quantity']))
                    {
                        $this->repository->rollBack();
                        $this->repository->disconnect();
                        return $this->errorMessage->error='Invalid quantity!';
                    }  
                    $new_record=new Record(0,$record['record']['quantity'],$record['record']['price'],$invoiceId,$itemId);
                    $message=$recordRepository->insert($new_record);
                    if(!$message) 
                    {
                        $this->repository->rollBack();
                        $this->repository->disconnect();
                        return $this->errorMessage->error='Something went wrong with record';
                    }
                } 
                $this->repository->commit();
                $this->repository->disconnect();
                return  $this->successMessage->success='The invoice has been added';
            } 
        catch (PDOException $e) 
        {
        $this->repository->rollBack();
        $this->repository->disconnect();
        return $this->errorMessage->error='Connection failed: '. $e->getMessage();
      }
}  
}

<?php
include "../src/model/Invoice.php";
include "../src/model/Category.php";
include "../src/model/Record.php";
include "../src/model/Item.php";
include_once  "Service.php";
include_once "../src/DTO/TableInvoice.php";
require_once "../src/DTO/FullRecordDTO.php";
require_once "../src/DTO/InvoiceDTO.php";
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
  function getFullInvoice($user_id,$invoice_id){
    if(empty($invoice_id)){$this->errorMessage->error='There is no such invoice!';
        return $this->errorMessage;}
        try{
            $response=$this->repository->getFullInvoice($user_id,$invoice_id);
            if(empty($response)) return $this->error='No data for this invoice';
            $records=array();
            $total_sum=0;
            foreach($response as $record){
              array_push($records,new FullRecordDTO( 
              $record->record_id,
              $record->item_id,
              $record->item_name,
              $record->unit,
              $record->category_id,
              $record->category_name,
              $record->quantity,
              $record->price,
              $record->total_price
            ));
            $total_sum+=(float)  $record->total_price;
            }

            // $firstObject = $response[0];
             $invoice=new InvoiceDTO($response[0]->invoice_id,$response[0]->date,$response[0]->user_id,$total_sum,$records);
            return $invoice;
           }catch(PDOException $e){
            return $this->error('Connection failed: '. $e->getMessage());
           }
   }
 

    function insertRecords($records,$date,$user_id,$recordRepository,$categoryRepository,$itemRepository){
        if (empty($records)) {$this->errorMessage->error='There is no records!';
            return $this->errorMessage;}
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
                $this->successMessage->success='The invoice has been added';
                return  $this->successMessage;
            } 
        catch (PDOException $e){ return $this->error('Connection failed: '. $e->getMessage());}
    }  
    function findAllInvoiceTable($user_id,$firstRow,$offset,$date,$firstDate,$lastDate,$maxPrice,$minPrice){
        $response = new stdClass(); 
        try{
        $nr_of_rows=$this->repository->countRows($user_id,$date,$firstDate,$lastDate,$maxPrice,$minPrice);
        $max_price=$this->repository->max_price($user_id);
        $invoices=array();
        $data=$this->repository->findAllInvoiceTable($user_id,$firstRow,$offset,$date,$firstDate,$lastDate,$maxPrice,$minPrice);
        // if($data){
            foreach($data as $row){
                array_push($invoices,new TableInvoice($row->id,$row->date,$row->quantity,$row->nr_of_records,$row->total_price));  
        }        
        $response->invoices=$invoices;
        $response->row_count=$nr_of_rows->row_count;
        $response->max_price=$max_price->max_price;
        return $response;
        // }

        // return $data;
        } 
         catch (PDOException $e){
             $this->errorMessage->error='Connection failed: '. $e->getMessage();
            
            return $this->errorMessage;}
    }

    function getMoneyPerDay($user_id, $firstDate){
        if (empty($firstDate)){return $this->returnError("No first date");}
        try{
            $response = new stdClass();
            $fields=array();
            $data=$this->repository->getMoneyPerDay($user_id, $firstDate);
            foreach($data as $row){
                array_push($fields,$row);
            }
            $response->fields=$fields;
            return $response;

        }catch(PDOException $e){
            return $this->returnError( $this->errorMessage->error='Connection failed: '. $e->getMessage());
        }
    }
}

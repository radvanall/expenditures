<?php
abstract class Service {
    protected $repository;
    protected  $errorMessage;
    protected  $successMessage;


    function __construct(Repository $repository){
        $this->repository=$repository;
        $this->errorMessage=new stdClass();
        $this->successMessage=new stdClass();
    }
    abstract public function insert($data);
    abstract public function update($data);

    function findAll($user_id){
        try{
             $data=$this->repository->findAll($user_id); 
        }catch(PDOException $e){
            return $this->errorMessage->error="Connection failed: " . $e->getMessage();
        }
        if(!$data){
            $this->errorMessage->error='no data';
            return $this->errorMessage;
        }
        return $data;
    }

    function findById($id){
        try {
             $data=$this->repository->findById($id);
            if(!$data){
               $this->errorMessage->error='no such field';
               return $this->errorMessage;
           }
            return $data;
          } catch(PDOException $e){
            $this->errorMessage->error='Connection failed: '. $e->getMessage();
               return $this->errorMessage; 
           }
    }
    function delete($id){
    if($id==0){ return $this->errorMessage->error='no id';}
    try{
    $message=$this->repository->delete($id);
    if($message){return  $this->successMessage->success="The field has been deleted";}
    else{ return $this->errorMessage->error='Something went wrong';}} 
    catch(PDOException $e){ 
        return $this->errorMessage->error='Connection failed: '. $e->getMessage();
    }
}
}
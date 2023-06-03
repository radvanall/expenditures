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
    function returnError($message){
        $this->errorMessage->error=$message;
        return $this->errorMessage;
     }

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
    if($id==0){ return $this->returnError('no id');}
    try{
    $message=$this->repository->delete($id);
    if($message){ $this->successMessage->success="The field has been deleted";
    return $this->successMessage; }
    else{ return $this->returnError('Something went wrong');}} 
    catch(PDOException $e){ 
        return $this->returnError('Connection failed: '. $e->getMessage()); 
    }
}
}
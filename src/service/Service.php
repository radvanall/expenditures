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
     function returnSuccess($message){
        $this->successMessage->success=$message;
        return $this->successMessage;
     }

    function findAll($user_id){
        try{
             $data=$this->repository->findAll($user_id); 
        }catch(PDOException $e){
            return $this->returnError("Connection failed: " . $e->getMessage());
        }
        if(!$data){
            return $this->returnError('no data');
        }
        return $data;
    }

    function findById($id){
        try {
             $data=$this->repository->findById($id);
            if(!$data){
              return $this->returnError('no such field');     
           }
            return $data;
          } catch(PDOException $e){
            return $this->returnError('Connection failed: '. $e->getMessage());
           }
    }
    function delete($id){
    if($id==0){ return $this->returnError('no id');}
    try{
    $message=$this->repository->delete($id);
    if($message){ return $this->returnSuccess("The field has been deleted"); }
    else{ return $this->returnError('Something went wrong');}} 
    catch(PDOException $e){ 
        return $this->returnError('Connection failed: '. $e->getMessage()); 
    }
}
}
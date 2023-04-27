<?php
// include "../repository/Repository.php";
// include "../DatabaseConnection.php";
include "../src/model/User.php";
include_once  "Service.php";
class UserService extends Service{
    function findAll(){  
         $users=array();
         $data=parent::findAll();
         if(is_array($data)){
            foreach($data as $user){
                array_push($users,new User($user->id,$user->nickname,$user->email,""));
            }
            return $users;}
            return $data;
        }
        function findById($id){
            $data=parent::findById($id);
            if(property_exists($data,'error')){return $data;}
            $user=new User($data->id,$data->nickname,$data->email,$data->password_hash);
            return $user;
        }
        function delete($id){
            return parent::delete($id);
        }

    function insert($new_user){
            if(empty($new_user->nickname)){ return array('invalid'=>'Nickname should not be empty!');}
            if(!filter_var($new_user->email,FILTER_VALIDATE_EMAIL)){return $this->errorMessage->error='Invalid email!';}
            if((!preg_match("/^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*\s).+$/",$new_user->password))||strlen($new_user->password)<8){
               // return array('invaild'=>'Invalid password');
               return $this->errorMessage->error='Invalid password';
            }
            if($new_user->password!==$new_user->password_confirm){return $this->errorMessage->error='Password should match';}
            $password_hash=password_hash($new_user->password,PASSWORD_DEFAULT);
            $user=new User(0,$new_user->nickname,$new_user->email,$password_hash);
            try{
            $message=$this->repository->Insert($user); 
            if($message){return  array('success'=>"You have been successfully registerd");}
              else{ return $this->errorMessage->error='Something went wrong';}}
            catch(PDOException $e){ 
                 if ($e->getCode()==23000){return $this->errorMessage->error= 'This email is already in use';}
            return $this->errorMessage->error='Connection failed: '. $e->getMessage();
            }
        }
        function update($modified_user){
            if(empty($modified_user->id)){ return array('invalid'=>'Id should not be empty.');}
            if(empty($modified_user->nickname)){ return array('invalid'=>'Nickname should not be empty!');}
            if(!filter_var($modified_user->email,FILTER_VALIDATE_EMAIL)){return $this->errorMessage->error='Invalid email!';}
            if((!preg_match("/^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*\s).+$/",$modified_user->password))||strlen($modified_user->password)<8){
               // return array('invaild'=>'Invalid password');
               return $this->errorMessage->error='Invalid password';
            }
            if($modified_user->password!==$modified_user->password_confirm){return $this->errorMessage->error='Password should match';}
            $password_hash=password_hash($modified_user->password,PASSWORD_DEFAULT);
            $user=new User($modified_user->id,$modified_user->nickname,$modified_user->email,$password_hash);
            try{
            $message=$this->repository->update($user); 
            if($message){return  array('success'=>"You have been successfully updated");}
              else{ return $this->errorMessage->error='Something went wrong';}}
            catch(PDOException $e){ 
                 if ($e->getCode()==23000){return $this->errorMessage->error= 'This email is already in use';}
            return $this->errorMessage->error='Connection failed: '. $e->getMessage();
            }
        }

        function login($input){
            try{
                $data=$this->repository->findByEmail($input->email);
            } catch(PDOException $e){
                $this->errorMessage->error='Connection failed: '. $e->getMessage();
                   return $this->errorMessage; 
               }
               if(!$data){
                $this->errorMessage->error='no such user';
                return $this->errorMessage;
            }
            $user=new User($data->id,$data->nickname,$data->email,$data->password_hash);
            if(password_verify($input->password,$user->get_password_hash())){
                session_regenerate_id();
                $_SESSION["user_id"]=$user->get_id();
                return $user;
            }else{
                return $this->errorMessage->error='Password does not match!';
            }

            
        }
}
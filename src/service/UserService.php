<?php
// include "../repository/Repository.php";
// include "../DatabaseConnection.php";
include "../src/model/User.php";
include_once  "Service.php";
class UserService extends Service{
    function findAll($user_id){  
         $users=array();
         $data=parent::findAll($user_id);
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


 
  function returnError($message){
    $this->errorMessage->error=$message;
    return $this->errorMessage;
 }
    function insert($new_user){
            if(empty($new_user->nickname)){ return array('invalid'=>'Nickname should not be empty!');}
            if(!filter_var($new_user->email,FILTER_VALIDATE_EMAIL)){return $this->errorMessage->error='Invalid email!';}
            if((!preg_match("/^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*\s).+$/",$new_user->password))||strlen($new_user->password)<8){
               // return array('invaild'=>'Invalid password');
               //return $this->errorMessage->error='Invalid password';
             return $this->returnError('Invalid password');
            }
            if($new_user->password!==$new_user->password_confirm){return $this->errorMessage->error='Password should match';}
            $password_hash=password_hash($new_user->password,PASSWORD_DEFAULT);
            $user=new User(0,$new_user->nickname,$new_user->email,$password_hash);
            try{
            $message=$this->repository->Insert($user); 
            if($message){ $this->successMessage->success="You have been successfully registered.Now you can log in.";return $this->successMessage;}
              else{  $this->errorMessage->error='Something went wrong';
                return $this->errorMessage;}}
            catch(PDOException $e){ 
                 if ($e->getCode()==23000){ $this->errorMessage->error= 'This email is already in use';return $this->errorMessage;}
          $this->errorMessage->error='Connection failed: '. $e->getMessage();
            return $this->errorMessage;
            }
        }
        function update($modified_user){
            $user=$this->findById($_SESSION["user_id"]);
            if(!$user){
                $this->errorMessage->error='no such field';
                return $this->errorMessage;
            }
            if(password_verify($modified_user->password,$user->get_password_hash())){
                if(empty($modified_user->nickname)&&empty($modified_user->email)&&empty($modified_user->new_password)){ 
                    return $this->returnError('The fields should not be empty!');
                }else {
                   $nickname= empty(trim($modified_user->nickname)) ? $user->get_nickname() :  $modified_user->nickname;
                   $email=empty(trim($modified_user->email)) ? $user->get_email():trim($modified_user->email);
                   $password_hash=$user->get_password_hash();
                   if(!empty(trim($modified_user->new_password))){
                    if((!preg_match("/^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*\s).+$/",$modified_user->new_password))||strlen($modified_user->new_password)<8){
                           return $this->returnError('Invalid password');
                   }
                   if($modified_user->new_password!==$modified_user->password_confirm){
                    return $this->returnError('Password should match!');}
                   $password_hash=password_hash($modified_user->new_password,PASSWORD_DEFAULT); 
                }
                if(!filter_var($email,FILTER_VALIDATE_EMAIL)){return $this->errorMessage->error='Invalid email!';}
                $prepared_user=new User($user->get_id(),$nickname,$email,$password_hash);
                try{
                     $message=$this->repository->update($prepared_user); 
                     if($message){  $this->successMessage->success="You have been successfully updated"; 
                        return $this->successMessage; }
                         else{ return $this->returnError('Nothing changed.');}}
                     catch(PDOException $e){ 
                            if ($e->getCode()==23000){return  $this->returnError('This email is already in use');}
                             return  $this->returnError('Connection failed: '. $e->getMessage());
                       }
                
               }}
            else return $this->returnError('Password is incorrect!');
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
                $this->successMessage->success="You have been logged in!";
                $sendUser=new User($data->id,$data->nickname,$data->email);
                return $sendUser;
                // return $this->successMessage;
                
            }else{
               return $this->returnError('Password does not match!');
                // return $this->errorMessage->error='Password does not match!';
            }

            
        }
}
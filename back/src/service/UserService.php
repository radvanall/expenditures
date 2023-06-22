<?php
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
            $user=new User($data->id,$data->nickname,$data->email,$data->password_hash,$data->avatar);
            return $user;
        }
        function delete($id){
            return parent::delete($id);
        }
 
    function delete_user($id,$password){
        $user=$this->findById($id);
        if(!$user) 
        return $this->returnError("noUser");
        if(!password_verify($password,$user->get_password_hash()))
            return $this->returnError("password");

        try{
            $message=$this->delete($id);
            if(!$message) 
            return $this->returnError("accountNotDeleted");
            return $this->returnSuccess("accountDeleted");
        }catch(PDOException $e){ 
            if ($e->getCode()==23000)
                return  $this->returnError("emailInUse");
             return  $this->returnError('Connection failed: '. $e->getMessage());
       }
    }
    function insert($new_user){
            if(empty($new_user->nickname)) 
            return $this->returnError('Nickname should not be empty!');
            if(!filter_var($new_user->email,FILTER_VALIDATE_EMAIL))
            return $this->returnError('Invalid email!');
            if((!preg_match("/^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*\s).+$/",$new_user->password))||strlen($new_user->password)<8)
            return $this->returnError('invalidPassword');
            if($new_user->password!==$new_user->password_confirm)
            return $this->returnError('Password should match');
            $password_hash=password_hash($new_user->password,PASSWORD_DEFAULT);
            $user=new User(0,$new_user->nickname,$new_user->email,$password_hash);
            try{
            $message=$this->repository->Insert($user); 
            if($message){
                return $this->returnSuccess("successReg");
                }
              else{  
                return $this->returnError("somethingWentWrong");
            }}
            catch(PDOException $e){ 
                 if ($e->getCode()==23000)
                    return  $this->returnError("emailInUse");    
                return  $this->returnError('Connection failed: '. $e->getMessage());
            }
        }
        function update($modified_user){
        $user=$this->findById($_SESSION["user_id"]);
        if(!$user){
            return  $this->returnError('no such field');
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
                    return $this->returnError("invalidPassword");
               }
               if($modified_user->new_password!==$modified_user->password_confirm){
                return $this->returnError("password");
            }
               $password_hash=password_hash($modified_user->new_password,PASSWORD_DEFAULT); 
            }
            if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
                return $this->returnError("invalidEmail");
            }
            $prepared_user=new User($user->get_id(),$nickname,$email,$password_hash);
            try{
                 $message=$this->repository->update($prepared_user); 
                 if($message){  
                    return $this->returnSuccess("updateUser");          
                }
                     else{
                        return $this->returnError("nothingChanged");
                        }}
                 catch(PDOException $e){ 
                        if ($e->getCode()==23000){
                            return $this->returnError( "emailInUse");
                        }
                         return  $this->returnError('Connection failed: '. $e->getMessage());
                   }

           }}
        else 
        return $this->returnError("password");
    }
    function setAvatar($user_id,$uploadedImage){
        $targetDirectory = "D:/programe/xp/htdocs/expenditures/front/public/";
        $originalName=$uploadedImage["name"];
        $temporaryPath=$uploadedImage["tmp_name"];
        $uniqid=uniqid();
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);
        $dbname="img/" .  $uniqid . "." . $extension;
        $targetPath = $targetDirectory . $dbname;
        if (!move_uploaded_file($temporaryPath, $targetPath)) return $this->returnError("somethingWentWrong");
        try{
            $user=$this->repository->findById($user_id);
            $deletePath=$targetDirectory . $user->avatar;
            unlink($deletePath);
            $response=$this->repository->setAvatar($user_id,$dbname);
            if($response) {
              return $this->returnSuccess("updateUser");  
            } 
        }catch(PDOException $e){
            return $this->returnError('Connection failed: '. $e->getMessage());
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
                return $this->returnError("noUser");
            }
            $user=new User($data->id,$data->nickname,$data->email,$data->password_hash ,$data->avatar);
            if(password_verify($input->password,$user->get_password_hash())){
                session_regenerate_id();
                $_SESSION["user_id"]=$user->get_id();
                $this->successMessage->success="You have been logged in!";
                $sendUser=new User($data->id,$data->nickname,$data->email,"clasified data",$data->avatar);
                return $sendUser;
                
            }else{
               return $this->returnError("password");
            }
        }
}
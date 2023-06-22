<?php
function CRUD_controller($service,$method, $getVars, $postVars){
if($method=="GET" && isset($getVars["id"])&& $getVars["id"]=="all"){
    $user_id=$_SESSION["user_id"];
    $result=$service->findAll($user_id);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
else if($method=="GET" && isset($getVars["id"]) && $getVars["id"]!=="all" && isset($getVars["request"])&& $getVars["request"]=="find"){
  $result=$service->findById($getVars["id"]);
  sendResponse($result);
 } else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="insert"){
   $form_data=$_POST["formData"];
   $input_data=json_decode(stripslashes($form_data));
     if($input_data===null){
          echo 'Error decoding JSON: ' . json_last_error_msg();
       }
     else 
     {
      $input_data->user_id=$_SESSION["user_id"];
      $result=$service->insert($input_data); 
       sendResponse($result);
      }
}  else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="update"){
  $form_data=$postVars["formData"];
  $input_data=json_decode(stripslashes($form_data));
  if($input_data===null){
     echo 'Error decoding JSON: ' . json_last_error_msg();
  }
  else 
  { $result=$service->update($input_data); 
    sendResponse($result);
  }

}  else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="delete" ){
  $form_data=$postVars["formData"];
  $data = json_decode($form_data, true);
  $id = $data['id'];

  $result=$service->delete($id);
  sendResponse($result);
}
else if($method=="GET" && isset($getVars["request"]) && $getVars["request"]=="categoriesAndItems"){

  $result=$service->findCategoriesAndItems($_SESSION['user_id']);

  if(!is_array($result)){
  if(property_exists($message,'error')){
      http_response_code(400);
      echo json_encode($message);
  } }else{
  http_response_code(200);
  echo json_encode($message);}
}

}
<?php
include_once  "Repository.php";
class CategoryRepository extends Repository{

    public function findAll($user_id,$table=null){
        return parent::findAll($user_id,'category');
    }
    public function findById($id,$table=null){
        return parent::findById($id,"category");
      } 
        
    public function delete($id,$table=null){
        return parent::delete($id,'category');
    }
    public function insert($data){
       $this->connection=$this->db::connect();
        $sql="INSERT INTO category(category_name,`user_id`) VALUES(:category_name,:user_id)";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":category_name",htmlspecialchars(strip_tags($data->get_category_name())),PDO::PARAM_STR);
        $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($data->get_user_id())),PDO::PARAM_INT);
        $response= $stmt->execute();
        //$this->db::disconnect();
        return $response;
    }
    public function update($data){
        $this->connection=$this->db::connect();
        $sql="UPDATE category SET category_name=:category_name  WHERE id=:id";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":category_name",htmlspecialchars(strip_tags($data->get_category_name())),PDO::PARAM_STR);
        $stmt->bindValue(":id",htmlspecialchars(strip_tags($data->get_id())),PDO::PARAM_INT);
        $stmt->execute();
        $count = $stmt->rowCount();
        $this->db::disconnect();
        return $count;
    }
 
}
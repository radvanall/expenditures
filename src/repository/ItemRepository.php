<?php
include_once "Repository.php";
class ItemRepository extends Repository{
    public function delete($id,$table=null){
        return parent::delete($id,'item');
    }
    public function findById($id,$table=null){
      return parent::findById($id,"item");
    }   
     public function findAll($table=null){
        return parent::findAll('item');
    }

    public function insert($data){
        $this->connection=$this->db::connect();
        $sql="INSERT INTO item(item_name,unit,category_id,user_id) VALUES(:item_name,:unit,:category_id,:user_id)";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":item_name",htmlspecialchars(strip_tags($data->getItemName())),PDO::PARAM_STR);
        $stmt->bindValue(":unit",htmlspecialchars(strip_tags($data->getUnit())),PDO::PARAM_STR);
        $stmt->bindValue(":category_id",htmlspecialchars(strip_tags($data->getCategoryId())),PDO::PARAM_INT);
        $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($data->getUserId())),PDO::PARAM_INT);
        $response= $stmt->execute();
       // $this->db::disconnect();
        return $response;
  }
  public function update($data){
    $this->connection=$this->db::connect();
    $sql="UPDATE item SET item_name=:item_name,unit=:unit,category_id=:category_id,user_id=:user_id WHERE id=:id";
    $stmt=$this->connection->prepare($sql);
    $stmt->bindValue(":id",htmlspecialchars(strip_tags($data->getId())),PDO::PARAM_INT);
    $stmt->bindValue(":item_name",htmlspecialchars(strip_tags($data->getItemName())),PDO::PARAM_STR);
    $stmt->bindValue(":unit",htmlspecialchars(strip_tags($data->getUnit())),PDO::PARAM_STR);
    $stmt->bindValue(":category_id",htmlspecialchars(strip_tags($data->getCategoryId())),PDO::PARAM_INT);
    $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($data->getUserId())),PDO::PARAM_INT);
    $stmt->execute();
    $count = $stmt->rowCount();
    $this->db::disconnect();
    return $count;
  }


}
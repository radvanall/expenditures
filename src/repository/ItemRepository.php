<?php
include_once "Repository.php";
class ItemRepository extends Repository{
    public function delete($id,$table=null){
        return parent::delete($id,'item');
    }
    public function findById($id,$table=null){
      return parent::findById($id,"item");
    }   
     public function findAll($user_id,$table=null){
        return parent::findAll($user_id,'item');
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
  public function getItemTable($user_id){
    $sql = "SELECT s1.id, s1.item_name,s1.category_id,s1.category_name,s1.unit,COALESCE(sum(s1.total_price),0) as total_price from (SELECT i.id as id, i.item_name ,i.category_id,c.category_name,i.unit, r.quantity*r.price as total_price FROM `item` i left join category c on c.id=i.category_id left join record r on r.item_id=i.id WHERE i.user_id=:id) as s1 GROUP by s1.id  ORDER BY `total_price`  DESC;";
    $this->connection=$this->db::connect();
    $stmt=$this->connection->prepare($sql);
    $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
    $stmt->execute();
    $result=array();
    while($row=$stmt->fetch()){
        array_push($result,$row);
    }
    $this->db::disconnect();
    return $result;
}

public function getItemChart($user_id){
  $sql = "SELECT i.id,i.unit,i.category_id,c.category_name, i.item_name,SUM(r.quantity*r.price) as total_price FROM `item` i inner join record r on r.item_id=i.id inner join invoice inv on r.invoice_id=inv.id inner join category c on i.category_id=c.id WHERE i.user_id=:id and inv.date >= CURDATE() GROUP by i.item_name ORDER BY `total_price`  DESC;";
  $this->connection=$this->db::connect();
  $stmt=$this->connection->prepare($sql);
  $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
  $stmt->execute();
  $result=array();
  while($row=$stmt->fetch()){
      array_push($result,$row);
  }
  $this->db::disconnect();
  return $result;
}

public function getItemChartWeek($user_id){
  $sql = "SELECT i.id,i.unit,i.category_id,c.category_name, i.item_name,SUM(r.quantity*r.price) as total_price FROM `item` i inner join record r on r.item_id=i.id inner join invoice inv on r.invoice_id=inv.id inner join category c on i.category_id=c.id WHERE i.user_id=:id and inv.date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP by i.item_name  ORDER BY `total_price`  DESC;";
  $this->connection=$this->db::connect();
  $stmt=$this->connection->prepare($sql);
  $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
  $stmt->execute();
  $result=array();
  while($row=$stmt->fetch()){
      array_push($result,$row);
  }
  $this->db::disconnect();
  return $result;
}


}
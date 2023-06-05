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
    public function findCategoriesAndItems($user_id){
        $this->connection=$this->db::connect();
        $sql = $sql = "SELECT c.id as category_id, c.category_name,i.id as item_id, i.item_name,i.unit FROM `category` c inner join `item` i on i.category_id= c.id WHERE c.user_id=:user_id;";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
        $stmt->execute();
        $data=array();
        while($row=$stmt->fetch()){
          array_push($data,$row);
      }
      $this->db::disconnect();
        $this->db::disconnect();
        return $data;
    }
    public function getCategoryTable($user_id){
        $sql = "SELECT s1.category_id,s1.category_name ,count(s1.item_id) as nr_of_items,
        COALESCE(SUM(total_price),0) as total_price FROM (SELECT c.id as category_id, c.category_name,r.quantity*r.price as total_price, i.id as item_id  FROM `category` c  left join item i on i.category_id=c.id left JOIN record r on r.item_id=i.id WHERE c.user_id=:id) as s1 GROUP by s1.category_id  ORDER BY `total_price`  DESC;";
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
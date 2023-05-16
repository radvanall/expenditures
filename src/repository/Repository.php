<?php
 abstract class Repository {
    protected $db;
    protected $connection;
    
    public function __construct($db) {
        $this->db = $db; 
      //  echo var_dump($db);
    }
    abstract public function insert($data);
    abstract public function update($data);

    // abstract public function findById($id);
    // abstract public function findAll();
    // abstract public function delete($id);
    // public function findById($id,$table);
    public function getConnection(){
      $this->connection=$this->db::connect();
    }
    public function disconnect(){
      $this->db::disconnect();
    }
    public function beginTransaction(){
      $this->connection->beginTransaction();
    }
    public function getLastInsertId(){
      return $this->connection->lastInsertId();
    }
    public function rollBack(){
      return $this->connection->rollBack();
    }
    public function commit(){
      return $this->connection->commit();
    }

     public function findAll($user_id,$table){
      $this->connection=$this->db::connect();
      $sql="SELECT * FROM " . $table . " WHERE user_id=:id";
      // $sql="SELECT * FROM " . $table;
      $stmt=$this->connection->prepare($sql);
      $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
      $stmt->execute();
      $data=array();
      while($row=$stmt->fetch()){
          array_push($data,$row);
      }
      $this->db::disconnect();
      return $data;
     }
    // public function delete($id,$table);
    public function delete($id,$table){
      $this->connection=$this->db::connect();
      $sql="DELETE FROM " . $table . " WHERE id=:id";
      $stmt=$this->connection->prepare($sql);
      $stmt->bindValue(":id",htmlspecialchars(strip_tags($id)),PDO::PARAM_INT);
      $stmt->execute();
      $count = $stmt->rowCount();
      $this->db::disconnect();
      return $count;
  }
    public function findById($id,$table) {
      $this->connection=$this->db::connect();
      $sql = "SELECT * FROM " . $table . " WHERE id=?";
      $stmt = $this->connection->prepare($sql);
      $stmt->execute([$id]);
      $data = $stmt->fetch();
      $this->db::disconnect();
      return $data;
  }
}

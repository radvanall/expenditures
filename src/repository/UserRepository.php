<?php 
include_once  "Repository.php";
class UserRepository extends Repository{
 
    public function delete($id,$table=null){
        return parent::delete($id,'users');
    }
    public function findById($id,$table=null){
      return parent::findById($id,"users");
    }   
     public function findAll($table=null){
        return parent::findAll('users');
    }
    public function findByEmail($email){
      $this->connection=$this->db::connect();
      $sql = "SELECT * FROM users WHERE email=?";
      $stmt = $this->connection->prepare($sql);
      $stmt->execute([$email]);
      $data = $stmt->fetch();
      $this->db::disconnect();
      return $data;

    }
    public function insert($data){
          $this->connection=$this->db::connect();
          $sql="INSERT INTO users(nickname,email,password_hash) VALUES(:nickname,:email,:password_hash)";
          $stmt=$this->connection->prepare($sql);
          $stmt->bindValue(":nickname",htmlspecialchars(strip_tags($data->get_nickname())),PDO::PARAM_STR);
          $stmt->bindValue(":email",htmlspecialchars(strip_tags($data->get_email())),PDO::PARAM_STR);
          $stmt->bindValue(":password_hash",htmlspecialchars(strip_tags($data->get_password_hash())),PDO::PARAM_STR);
          $response= $stmt->execute();
          $this->db::disconnect();
          return $response;
    }
    public function update($data){
      $this->connection=$this->db::connect();
      $sql="UPDATE users SET nickname=:nickname,email=:email,password_hash=:password_hash WHERE id=:id";
      $stmt=$this->connection->prepare($sql);
      $stmt->bindValue(":nickname",htmlspecialchars(strip_tags($data->get_nickname())),PDO::PARAM_STR);
      $stmt->bindValue(":email",htmlspecialchars(strip_tags($data->get_email())),PDO::PARAM_STR);
      $stmt->bindValue(":password_hash",htmlspecialchars(strip_tags($data->get_password_hash())),PDO::PARAM_STR);
      $stmt->bindValue(":id",htmlspecialchars(strip_tags($data->get_id())),PDO::PARAM_INT);
      $stmt->execute();
      $count = $stmt->rowCount();
      $this->db::disconnect();
      return $count;
    }
 
    
}
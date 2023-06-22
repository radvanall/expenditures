<?php
class DatabaseConnection{
    private static $db_connection=null;
 
    private static $db_host="localhost";
    private static $db_name="expenditures_db";
    private static $db_user="root";
    private static $db_password="";
 

    public static function connect(){
        if(self::$db_connection==null){
            try {
                self::$db_connection= new PDO('mysql:host=' . self::$db_host . ';dbname=' . self::$db_name,self::$db_user,self::$db_password);
                self::$db_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$db_connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            }catch(PDOException $e){
                var_dump(array('error'=>'Connection failed: '. $e->getMessage()));
            }
        }
        return self::$db_connection;
    }

    public static function disconnect(){
        self::$db_connection=null;
    }
   

}
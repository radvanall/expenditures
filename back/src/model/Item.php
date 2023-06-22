<?php
class Item implements JsonSerializable{
    private $id;
    private $item_name;
    private $unit;
    private $category_id;
    private $user_id;

    
    function __construct($id,$item_name,$unit,$category_id="",$user_id=""){
        $this->id=$id;
        $this->item_name=$item_name;
        $this->unit=$unit;
        $this->category_id=$category_id;
        $this->user_id=$user_id;
        }
        function setId($id){
            $this->id=$id;
        }
        function getId(){
            return $this->id;
        }
        function setItemName($item_name){
            $this->item_name=$item_name;
        }
        function getItemName(){
            return $this->item_name;
        }
        function setUnit($unit){
            $this->unit=$unit;
        }
        function getUnit(){
            return $this->unit;
        }
          
       function getCategoryId() {
       return $this->category_id;
       }

        function setCategoryId($category_id) {
         $this->category_id = $category_id;
        }

        function getUserId() {
        return $this->user_id;
        } 

        function setUserId($user_id) {
        $this->user_id = $user_id;
     }

        public function jsonSerialize(){
            return[
                'id'=>$this->id,
                'item_name'=>$this->item_name,
                'unit'=>$this->unit,
                'category_id'=>$this->category_id,
                'user_id'=>$this->user_id
            ];
        }

    
}
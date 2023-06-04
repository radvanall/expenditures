<?php
class CategoryTableDTO implements JsonSerializable{
    private $id;
    private $category_name;
    private $nr_of_items;
    private $total_price;

    public function __construct($id=0,$category_name="",$nr_of_items=0,$total_price=0){
        $this->id=$id;
        $this->category_name=$category_name;
        $this->nr_of_items=$nr_of_items;
        $this->total_price=$total_price;
    }
    public function setId($id){
        $this->id=$id;
    }
    public function getId(){
        return $this->id;
    }
    public function setCategoryName($category_name){
        $this->category_name=$category_name;
    }
    public function getCategoryName(){
        return $this->category_name;
    }
    public function setNrOfItems($nr_of_items){
        $this->nr_of_items=$nr_of_items;
    }
    public function getNrOfItems(){
        return $this->nr_of_items;
    }
    public function setTotalPrice($total_price){
        $this->total_price=$total_price;
    }
    public function getTotalPrice(){
        return $this->total_price;
    }
    public function jsonSerialize(){
        return [
            "id"=>$this->id,
            "Category name"=>$this->category_name,
            "Number of items"=>$this->nr_of_items,
            "Total price"=>$this->total_price,
        ];
    }
}
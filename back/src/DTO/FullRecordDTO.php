<?php
class FullRecordDTO implements JsonSerializable{
  private $id;
  private $item_id;
  private $item_name;
  private $unit;
  private $category_id;
  private $category_name;
  private $quantity;
  private $price;
  private $total_price;

  function __construct($id=0,$item_id=0,$item_name='',$unit=0,$category_id=0,$category_name='',$quantity=0,$price=0,$total_price=0){
    $this->id=$id;
    $this->item_id=$item_id;
    $this->item_name=$item_name;
    $this->unit=$unit;
    $this->category_id=$category_id;
    $this->category_name=$category_name;
    $this->quantity=$quantity;
    $this->price=$price;
    $this->total_price=$total_price;
  }
  public function setId($id){
    $this->id=$id;
   }
  public function getId(){
    return $this->id;
  }
  public function getItemId() {
    return $this->item_id;
}

public function setItemId($item_id) {
    $this->item_id = $item_id;
}

public function getItemName() {
    return $this->item_name;
}

public function setItemName($item_name) {
    $this->item_name = $item_name;
}

public function getUnit() {
    return $this->unit;
}

public function setUnit($unit) {
    $this->unit = $unit;
}

public function getCategoryId() {
    return $this->category_id;
}

public function setCategoryId($category_id) {
    $this->category_id = $category_id;
}

public function getCategoryName() {
    return $this->category_name;
}

public function setCategoryName($category_name) {
    $this->category_name = $category_name;
}

public function getQuantity() {
    return $this->quantity;
}

public function setQuantity($quantity) {
    $this->quantity = $quantity;
}

public function getPrice() {
    return $this->price;
}

public function setPrice($price) {
    $this->price = $price;
}

public function getTotalPrice() {
    return $this->total_price;
}

public function setTotalPrice($total_price) {
    $this->total_price = $total_price;
}
public function jsonSerialize(){
    return [
        "id"=>$this->id,
        "item_id"=>$this->item_id,
        'item_name' => $this->item_name,
        'unit' => $this->unit,
        'category_id' => $this->category_id,
        'category_name' => $this->category_name,
        'quantity' => $this->quantity,
        'price' => $this->price,
        'total_price' => $this->total_price,
    ];
}

}
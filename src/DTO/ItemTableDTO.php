<?php 
class ItemTableDTO implements JsonSerializable{
private $id;
private $item_name;
private $category_id;
private $category_name;
private $unit;
private $total_price;
public function __construct($id=0, $item_name="", $category_id=0, $category_name="", $unit="", $total_price=0) {
    $this->id = $id;
    $this->item_name = $item_name;
    $this->category_id = $category_id;
    $this->category_name = $category_name;
    $this->unit = $unit;
    $this->total_price = $total_price;
}


public function getId() {
    return $this->id;
}

public function getItemName() {
    return $this->item_name;
}

public function getCategoryId() {
    return $this->category_id;
}

public function getCategoryName() {
    return $this->category_name;
}

public function getUnit() {
    return $this->unit;
}

public function getTotalPrice() {
    return $this->total_price;
}

public function setId($id) {
    $this->id = $id;
}

public function setItemName($item_name) {
    $this->item_name = $item_name;
}

public function setCategoryId($category_id) {
    $this->category_id = $category_id;
}

public function setCategoryName($category_name) {
    $this->category_name = $category_name;
}

public function setUnit($unit) {
    $this->unit = $unit;
}

public function setTotalPrice($total_price) {
    $this->total_price = $total_price;
}

public function jsonSerialize() {
    return [
        'id' => $this->id,
        'Item' => $this->item_name,
        'category_id' => $this->category_id,
        'Category name' => $this->category_name,
        'Unit' => $this->unit,
        'Total price' => $this->total_price
    ];
}
}
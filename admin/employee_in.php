<?php
include("../db.php");
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$role = $_POST['role'];
$query = "INSERT INTO users (name,email,password,role)
VALUES ('$name','$email','$password','$role')";
$result = mysqli_query($conn, $query);
if ($result) {
    header("Location: ./employee_master.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
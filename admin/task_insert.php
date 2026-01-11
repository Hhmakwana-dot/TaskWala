<?php
include("../db.php");

$title = $_POST['title'];
$desc = $_POST['description'];
$priority = $_POST['priority'];
$status = $_POST['status'];

$query = "INSERT INTO tasks (title,description,priority,status)
VALUES ('$title','$desc','$priority','$status')";
echo ($query);
$result = mysqli_query($conn, $query);
if ($result) {
    header("Location: ./create_task.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
//$result = mysqli_query($conn, $query);
//header("Location: dashboard.php");

?>
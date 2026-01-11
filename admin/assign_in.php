<?php
include("../db.php");
$taskId = $_POST['taskId'];
$status = $_POST['status'];
$assignedTo = $_POST['assigned_to'];
$dueDate = $_POST['due_date'];

$query = "UPDATE tasks SET assigned_to='$assignedTo', due_date='$dueDate', status='$status' WHERE id=$taskId";
// echo ($status);
// echo ($query);
$result = mysqli_query($conn, $query);
if ($result) {
    header("Location: ./view_ass_task.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
<?php
include '../db.php';

$empId = $_SESSION['id'];
$task_id = $_POST['id'];
$status = $_POST['status'];
$comment = $_POST['comment'];
$update = "UPDATE tasks SET status='$status' WHERE id=$task_id";
// echo $update;
$updateTask = mysqli_query($conn, $update);

$file_name = NULL;

if (!empty($_FILES['task_file']['name'])) {

    $upload_dir = "uploads/tasks/";
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $file_name = time() . "_" . $_FILES['task_file']['name'];
    $file_tmp = $_FILES['task_file']['tmp_name'];

    move_uploaded_file($file_tmp, $upload_dir . $file_name);
}
$in = "INSERT INTO task_comments (task_id, user_id, comment, task_file) VALUES ($task_id, $empId, '$comment', '$file_name')";
$insertComment = mysqli_query($conn, $in);
// echo $in;
if ($updateTask && $insertComment) {
    header("Location: ./dashboard.php?id=$task_id");
} else {
    echo "Error: " . mysqli_error($conn);
}
echo "Error: " . mysqli_error($conn);

?>
<?php
include("../db.php");

$email = $_POST['email'];
$password = $_POST['password'];

$q = "SELECT * FROM users WHERE email='$email'";
$res = mysqli_query($conn, $q);
$user = mysqli_num_rows($res);

if ($user == 1) {
    $row = mysqli_fetch_assoc($res);
    $_SESSION['id'] = $row['id'];
    $_SESSION['role'] = $row['role'];
    if ($row['role'] == 'admin') {
        // echo ("<script>alert('login successfully as admin'); window.location='../admin/dashboard.php';</script>");
        header("Location: ../admin/index.php");
    } else {
        header("Location: ../employee/dashboard.php");
    }

} else {
    header(("Location:../auth/login.php?loginErr=Invalid"));
}
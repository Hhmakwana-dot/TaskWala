<?php
$conn = mysqli_connect("localhost", "root", "", "taskwala");
if (!$conn) {
    die("DB Connection Failed");
}
session_start();
?>
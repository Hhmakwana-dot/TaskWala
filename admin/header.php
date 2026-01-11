<?php
include("../db.php")
    ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>TaskWala</title>
    <link rel="stylesheet" href="../css/style.css">
    <script defer="" src="../js/main.js"></script>
</head>

<body data-new-gr-c-s-check-loaded="14.1267.0" data-gr-ext-installed="">
    <!-- App -->
    <div id="app" class="app">
        <header class="topbar">
            <div class="brand"><img src="../assets/logo.svg" alt="T" class="logo-small">
                <div><strong><a class="navbar-brand" href="./dashboard.php">TaskWala</a></strong>
                    <div class="muted small">Welcome to Employee</div>
                </div>
            </div>
            <div class="top-actions">
                <a id="logoutBtn" href="../auth/logout.php" class="btn text-decoration-none ghost">Logout</a>
            </div>
        </header>

        <div class="container">
            <aside class="sidebar" id="sidebar">
                <nav>
                    <a href="./index.php" class="menu-btn ext-decoration-none" data-page="dashboard">Dashboard</a>
                    <a class="menu-btn text-decoration-none" href="./employee_master.php" data-page="task">Employee
                        Master</a>
                    <a class="menu-btn text-decoration-none" href="./create_task.php" data-page="taskDev">Task
                        Development</a>
                    <a class="menu-btn text-decoration-none" href="./view_ass_task.php" data-page="taskAllot">Task
                        Allotment</a>
                    <a class="menu-btn text-decoration-none" href="./courier_inward.php" data-page="courierIn">Courier
                        Inward</a>

                </nav>
                <div class="sidebar-footer">
                    <div class="logo-mini">T</div>
                </div>
            </aside>

</body>

</html>
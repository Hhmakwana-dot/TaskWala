<?php
include("../db.php");
if ($_SESSION['role'] != 'employee') {
    header("Location: ../auth/login.php");
}
?>

<head>
    <title>Employee Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <script defer="" src="../js/main.js"></script>

</head>

<body data-new-gr-c-s-check-loaded="14.1267.0">
    <!-- App -->
    <div id="app" class="app">
        <header class="topbar">
            <div class="brand"><img src="../assets/logo.svg" alt="T" class="logo-small">
                <div><strong><a class="navbar-brand" href="./dashboard.php">TaskWala</a></strong>
                    <div class="muted small">Welcome to Employee</div>
                </div>
            </div>
            <div class="top-actions">
                <div id="signedInfo" class="small muted">admin (Admin)</div>
                <a id="logoutBtn" href="../auth/logout.php" class="btn text-decoration-none ghost">Logout</a>
            </div>
        </header>
    </div>
</body>
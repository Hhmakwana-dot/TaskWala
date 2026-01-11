<?php
include("./header.php");
if ($_SESSION['role'] != 'admin') {
    header("Location: ../auth/login.php");
}
?>

<main class="main-content">

    <div class="card">
        <h2>Task Report</h2>
        <p class="muted small">Overall task performance</p>
    </div>
    <?php
    $summaryQuery = "
    SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
        SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completed
    FROM tasks
";
    $summaryResult = mysqli_query($conn, $summaryQuery);
    $summary = mysqli_fetch_assoc($summaryResult);
    ?>

    <div class="stat-grid">
        <div class="stat card">
            <div class="label">Total Tasks</div>
            <div class="num">
                <?= $summary['total'] ?>
            </div>
        </div>
        <div class="stat card">
            <div class="label">Pending</div>
            <div class="num">
                <?= $summary['pending'] ?>
            </div>
        </div>
        <div class="stat card">
            <div class="label">In Progress</div>
            <div class="num">
                <?= $summary['in_progress'] ?>
            </div>
        </div>
        <div class="stat card">
            <div class="label">Completed</div>
            <div class="num">
                <?= $summary['completed'] ?>
            </div>
        </div>
    </div>
    <?php
    $statusFilter = $_GET['status'];
    $where = $statusFilter ? "WHERE status='$statusFilter'" : "";

    $taskQuery = "
    SELECT title, status, created_at
    FROM tasks
    $where
    ORDER BY created_at DESC
";
    $taskResult = mysqli_query($conn, $taskQuery);
    ?>
    <div class="card">
        <form method="GET" style="margin-bottom:10px">
            <select name="status" onchange="this.form.submit()">
                <option value="">All Tasks</option>
                <option value="pending" <?= $statusFilter == 'pending' ? 'selected' : '' ?>>Pending</option>
                <option value="in_progress" <?= $statusFilter == 'in_progress' ? 'selected' : '' ?>>In Progress</option>
                <option value="completed" <?= $statusFilter == 'completed' ? 'selected' : '' ?>>Completed</option>
            </select>
        </form>
        <table width="100%" cellpadding="10">
            <thead>
                <tr style="border-bottom:1px solid #eee;text-align:left">
                    <th>Task</th>
                    <th>Status</th>
                    <th>Created On</th>
                </tr>
            </thead>
            <tbody>

                <?php if (mysqli_num_rows($taskResult) > 0): ?>
                    <?php while ($row = mysqli_fetch_assoc($taskResult)): ?>
                        <tr style="border-bottom:1px solid #f1f5f9">
                            <td>
                                <?= htmlspecialchars($row['title']) ?>
                            </td>
                            <td>
                                <span style="
                        font-weight:600;
                        color:
                        <?= $row['status'] == 'pending' ? '#ff9f43' :
                            ($row['status'] == 'in_progress' ? '#54a0ff' : '#1dd1a1') ?>">
                                    <?= ucfirst(str_replace('_', ' ', $row['status'])) ?>
                                </span>
                            </td>
                            <td>
                                <?= date('d M Y, h:i A', strtotime($row['created_at'])) ?>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="3" class="muted">No records found</td>
                    </tr>
                <?php endif; ?>

            </tbody>
        </table>
    </div>

</main>
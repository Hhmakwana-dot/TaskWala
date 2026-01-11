<?php
include("./header.php");

if ($_SESSION['role'] != 'employee') {
    header("Location: ../auth/login.php");
    exit;
}

$empId = $_SESSION['id'];
$summaryQuery = "
    SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status='in_progress' THEN 1 ELSE 0 END) AS in_progress,
        SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completed
    FROM tasks
    WHERE assigned_to = '$empId'
";
$summaryResult = mysqli_query($conn, $summaryQuery);
$summary = mysqli_fetch_assoc($summaryResult);
?>
<link rel="stylesheet" href="./style.css">
<main class="main-content">

    <div class="card">
        <h2>Employee Dashboard</h2>
        <p class="muted small">My Assigned Tasks</p>
    </div>

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
    $taskQuery = "
    SELECT id, title, description, priority, status, due_date, created_at
    FROM tasks
    WHERE assigned_to = '$empId'
    ORDER BY created_at DESC
";
    $taskResult = mysqli_query($conn, $taskQuery);
    ?>
    <div class="card">
        <h4>My Tasks</h4>

        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    <?php if (mysqli_num_rows($taskResult) > 0): ?>
                        <?php while ($task = mysqli_fetch_assoc($taskResult)): ?>
                            <tr>
                                <td>
                                    <strong>
                                        <?= htmlspecialchars($task['title']) ?>
                                    </strong>
                                    <div class="muted small">
                                        <?= htmlspecialchars($task['description']) ?>
                                    </div>
                                </td>

                                <td>
                                    <?= $task['priority'] ?>
                                </td>

                                <td>
                                    <span style="
                                font-weight:600;
                                color:
                                <?= $task['status'] == 'pending' ? '#ff9f43' :
                                    ($task['status'] == 'in_progress' ? '#54a0ff' : '#1dd1a1') ?>">
                                        <?= ucfirst(str_replace('_', ' ', $task['status'])) ?>
                                    </span>
                                </td>

                                <td>
                                    <?= $task['due_date'] ?>
                                </td>
                                <td>
                                    <?php if ($task['status'] != 'completed'): ?>
                                        <a href="update_task.php?id=<?= $task['id'] ?>" class="btn-update">
                                            Update
                                        </a>

                                    <?php else: ?>
                                        <span class="muted small">Done</span>
                                    <?php endif; ?>
                                </td>

                            </tr>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="4" class="muted">No tasks assigned</td>
                        </tr>
                    <?php endif; ?>

                </tbody>
            </table>
        </div>
    </div>

</main>
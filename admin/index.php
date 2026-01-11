<?php
include("./header.php");
if ($_SESSION['role'] != 'admin') {
    header("Location: ../auth/login.php");
}
?>

<main class="main-content" id="mainContent">
    <div class="card">
        <h2>Dashboard</h2>
        <p class="muted small">Overview</p>
    </div>
    <?php
    $query = "SELECT
SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
SUM(CASE WHEN status = 'In-Progress' THEN 1 ELSE 0 END) AS in_progress,
SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed,
COUNT(*) AS total
FROM tasks";

    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_assoc($result);
    ?>
    <div class="stat-grid" id="statsGrid">

        <div class="stat card">
            <div>
                <div class="label">Pending Tasks</div>
                <div class="num"><?= $data['pending'] ?></div>
            </div>
            <div style="font-size:20px;color:var(--sky)">T</div>
        </div>
        <div class="stat card">
            <div>
                <div class="label">In Progress</div>
                <div class="num"><?= $data['in_progress'] ?></div>
            </div>
            <div style="font-size:20px;color:var(--sky)">T</div>
        </div>
        <div class="stat card">
            <div>
                <div class="label">Completed</div>
                <div class="num">
                    <?= $data['completed'] ?>
                </div>
            </div>
            <div style="font-size:20px;color:var(--sky)">T</div>
        </div>
        <div class="stat card">
            <div>
                <div class="label">Total Tasks</div>
                <div class="num">
                    <?= $data['total'] ?>
                </div>
            </div>
            <div style="font-size:20px;color:var(--sky)">T</div>
        </div>

    </div>
    <div class="card">
        <h4>Task Status</h4><canvas id="taskChart" width="700" height="200"></canvas>
    </div>

    <?php
    $recentQuery = "
    SELECT title, status, created_at
    FROM tasks
    ORDER BY created_at DESC
    LIMIT 5";

    $recentResult = mysqli_query($conn, $recentQuery);
    ?>

    <div class="card">
        <h4>Recent Activity</h4>
        <div id="recentList">

            <?php if (mysqli_num_rows($recentResult) > 0): ?>
                <?php while ($row = mysqli_fetch_assoc($recentResult)): ?>

                    <div style="padding:8px;border-bottom:1px solid rgb(241,245,249);">
                        <div style="font-weight:600">
                            <?= htmlspecialchars($row['title']) ?>
                        </div>

                        <div style="font-size:12px;color:var(--muted)">
                            Status:
                            <span style="
                            font-weight:600;
                            color:
                            <?php
                            if ($row['status'] == 'Pending')
                                echo '#ff9f43';
                            elseif ($row['status'] == 'In-Progress')
                                echo '#54a0ff';
                            else
                                echo '#1dd1a1';
                            ?>">
                                <?= ucfirst(str_replace('_', ' ', $row['status'])) ?>
                            </span>
                            •
                            <?= date('d M Y, h:i A', strtotime($row['created_at'])) ?>
                        </div>
                    </div>

                <?php endwhile; ?>
            <?php else: ?>
                <div style="padding:10px;color:var(--muted)">No recent activity</div>
            <?php endif; ?>

        </div>
    </div>
    <?php
    $statusFilter = isset($_GET['status']) ? $_GET['status'] : '';
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
        <h4>Status Filter</h4>
        <form method="GET" style="margin-bottom:10px">
            <select name="status" onchange="this.form.submit()">
                <option value="">All Tasks</option>
                <option value="Pending" <?= $statusFilter == 'Pending' ? 'selected' : '' ?>>Pending</option>
                <option value="In-Progress" <?= $statusFilter == 'In-Progress' ? 'selected' : '' ?>>In Progress</option>
                <option value="Completed" <?= $statusFilter == 'Completed' ? 'selected' : '' ?>>Completed</option>
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
                        <?= $row['status'] == 'Pending' ? '#ff9f43' :
                            ($row['status'] == 'In-Progress' ? '#54a0ff' : '#1dd1a1') ?>">
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
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctx = document.getElementById('taskChart').getContext('2d');

    const taskChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pending', 'In Progress', 'Completed'],
            datasets: [{
                label: 'Tasks',
                data: [
                    <?= (int) $data['pending'] ?>,
                    <?= (int) $data['in_progress'] ?>,
                    <?= (int) $data['completed'] ?>
                ],
                backgroundColor: [
                    '#ff9f43',  // Pending (orange)
                    '#54a0ff',  // In progress (blue)
                    '#1dd1a1'   // Completed (green)
                ],
                borderRadius: 8,
                barThickness: 60
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
</script>
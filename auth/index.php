<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>TaskWala - Task Management App (v2.2)</title>
    <link rel="stylesheet" href="../css/style.css">
    <script defer="" src="../js/main.js"></script>
</head>

<body data-new-gr-c-s-check-loaded="14.1268.0" data-gr-ext-installed="">
    <!-- Splash -->
    <div id="splash" class="splash" style="opacity: 0; transition: opacity 0.5s; display: none;">
        <div class="logo-circle"><span>T</span></div>
        <div id="splashTitle" class="splash-title" style="opacity: 1; transform: scale(1);">TaskWala</div>
        <div class="splash-sub">Task Management App</div>
    </div>

    <!-- Login Page -->
    <div id="loginPage" class="page hidden">
        <div class="center-card card">
            <div class="logo-circle" style="width:72px;height:72px;">T</div>
            <h2>TaskWala</h2>
            <div class="muted small">Sign in to continue</div>
            <div class="form-row"><label>Username</label><input id="loginUser" value="admin"></div>
            <div class="form-row"><label>Password</label><input id="loginPass" type="password"></div>
            <div class="form-actions"><button id="btnLogin" class="btn">Login</button><button id="btnLoginCancel"
                    class="btn-secondary">Cancel</button></div>
            <div class="small muted" style="margin-top:8px">Use <strong>admin</strong> / <strong>123</strong></div>
        </div>
    </div>

    <!-- App -->
    <div id="app" class="app">
        <header class="topbar">
            <div class="brand"><img src="assets/logo.svg" alt="T" class="logo-small">
                <div><strong>TaskWala</strong>
                    <div class="muted small">Task Management App</div>
                </div>
            </div>
            <div class="top-actions">
                <div id="signedInfo" class="small muted">admin (Admin)</div>
                <button id="logoutBtn" class="btn ghost">Logout</button>
            </div>
        </header>

        <div class="container">
            <aside class="sidebar" id="sidebar">
                <nav>
                    <button class="menu-btn active" data-page="dashboard">Dashboard</button>
                    <button class="menu-btn" data-page="task">Task Entry</button>
                    <button class="menu-btn" data-page="taskAllot">Task Allotment</button>
                    <button class="menu-btn" data-page="taskDev">Task Development</button>
                    <button class="menu-btn" data-page="courierIn">Courier Inward</button>
                    <button class="menu-btn" data-page="courierOut">Courier Outward</button>
                    <button class="menu-btn" data-page="notes">Notes</button>
                    <button class="menu-btn" data-page="clientDocs">Client Documents</button>
                    <button class="menu-btn" data-page="cheques">Cheque Payments</button>
                    <button class="menu-btn" data-page="visitors">Visitor Entry</button>
                    <button class="menu-btn" data-page="leaves">Employee Leaves</button>
                    <button class="menu-btn" data-page="employees">Employee Master</button>
                    <button class="menu-btn" data-page="settings">Settings</button>
                    <button class="menu-btn" data-page="about">About</button>
                </nav>
                <div class="sidebar-footer">
                    <div class="logo-mini">T</div>
                    <div class="small">TaskWala v2.2</div>
                    <div class="muted small">© 2025 All Rights Reserved</div>
                </div>
            </aside>

            <main class="main-content" id="mainContent">
                <div class="card">
                    <h2>Dashboard</h2>
                    <p class="muted small">Overview</p>
                </div>
                <div class="stat-grid" id="statsGrid">
                    <div class="stat card">
                        <div>
                            <div class="label">Pending Tasks</div>
                            <div class="num">1</div>
                        </div>
                        <div style="font-size:20px;color:var(--sky)">T</div>
                    </div>
                    <div class="stat card">
                        <div>
                            <div class="label">In Progress</div>
                            <div class="num">0</div>
                        </div>
                        <div style="font-size:20px;color:var(--sky)">T</div>
                    </div>
                    <div class="stat card">
                        <div>
                            <div class="label">Completed</div>
                            <div class="num">0</div>
                        </div>
                        <div style="font-size:20px;color:var(--sky)">T</div>
                    </div>
                    <div class="stat card">
                        <div>
                            <div class="label">Client Docs</div>
                            <div class="num">0</div>
                        </div>
                        <div style="font-size:20px;color:var(--sky)">T</div>
                    </div>
                    <div class="stat card">
                        <div>
                            <div class="label">Cheques Pending</div>
                            <div class="num">0</div>
                        </div>
                        <div style="font-size:20px;color:var(--sky)">T</div>
                    </div>
                    <div class="stat card">
                        <div>
                            <div class="label">Visitors Today</div>
                            <div class="num">0</div>
                        </div>
                        <div style="font-size:20px;color:var(--sky)">T</div>
                    </div>
                </div>
                <div class="card">
                    <h4>Task Status</h4><canvas id="taskChart" width="700" height="200"></canvas>
                </div>
                <div class="card">
                    <h4>Recent Activity</h4>
                    <div id="recentList">
                        <div style="padding: 8px; border-bottom: 1px solid rgb(241, 245, 249);">
                            <div style="font-weight:600">create login page <span
                                    style="font-size:12px;color:var(--muted)">• jignasa</span></div>
                            <div style="font-size:12px;color:var(--muted)">Status: Pending</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- libs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>


</body>

</html>
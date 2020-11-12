Vue.component('nav-bar', {
    template: `
    <nav class="navbar bg-info flex-row">
        <h2>TA Queue Manager</h2>
        <div>
            <ul class="navbar-nav flex-row">
                <li class="nav-item">
                    <a href="../html/fileUploads.html">File Upload</a>
                </li>
                <li class="nav-item">
                    <a href="../html/questionsPage.html">Questions</a>
                </li>
                <li class="nav-item">
                    <a href="../html/demoSignUp.html">Demo Sign Up</a>
                </li>
            </ul>
        </div>
    </nav>
    `
})

var app = new Vue({
    el: "#app"
})
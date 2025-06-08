// Components loader for Admin Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Load sidebar
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        fetch('../components/sidebar.html')
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
                
                // Set active menu item based on current page
                const currentPage = window.location.pathname.split('/').pop();
                const menuItems = document.querySelectorAll('.sidebar-menu ul li');
                
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('a');
                    if (link && link.getAttribute('href') === currentPage) {
                        item.classList.add('active');
                    }
                });
                
                // If we're on the index page or no match was found
                if (currentPage === '' || currentPage === 'index.html' || !document.querySelector('.sidebar-menu ul li.active')) {
                    menuItems[0].classList.add('active');
                }
                
                // Initialize sidebar toggle
                const toggle = document.querySelector('.toggle');
                const sidebar = document.querySelector('.sidebar');
                const mainContent = document.querySelector('.main-content');
                
                if (toggle && sidebar && mainContent) {
                    toggle.addEventListener('click', function() {
                        sidebar.classList.toggle('active');
                        mainContent.classList.toggle('active');
                    });
                }
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
    
    // Load header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('../components/header.html')
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
                
                // Initialize dropdown menu
                const dropdownToggle = document.querySelector('.dropdown-toggle');
                const dropdownMenu = document.querySelector('.dropdown-menu');
                
                if (dropdownToggle && dropdownMenu) {
                    dropdownToggle.addEventListener('click', function(e) {
                        e.stopPropagation();
                        dropdownMenu.classList.toggle('active');
                    });
                    
                    // Close dropdown when clicking outside
                    document.addEventListener('click', function(e) {
                        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                            dropdownMenu.classList.remove('active');
                        }
                    });
                }
                
                // Initialize logout button
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        alert('Vous avez été déconnecté avec succès.');
                        // In a real app, redirect to login page: window.location.href = 'login.html';
                    });
                }
            })
            .catch(error => console.error('Error loading header:', error));
    }
    
    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('../components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

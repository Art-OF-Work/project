/**
 * Main JavaScript for Secretary Dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // La barre latérale est maintenant fixe, pas besoin de toggle

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Initialize datepickers if they exist
    if (document.querySelector('.datepicker')) {
        flatpickr('.datepicker', {
            dateFormat: 'd/m/Y',
            locale: 'fr',
            allowInput: true
        });
    }

    // Initialize timepickers if they exist
    if (document.querySelector('.timepicker')) {
        flatpickr('.timepicker', {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            locale: 'fr',
            allowInput: true
        });
    }

    // Handle active links in sidebar based on current page
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('#sidebar ul li a');
    const menuLength = menuItems.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].parentElement.classList.add('active');
        } else {
            menuItems[i].parentElement.classList.remove('active');
        }
    }

    // Notifications dropdown
    const notificationDropdown = document.querySelector('.dropdown-menu');
    if (notificationDropdown) {
        notificationDropdown.addEventListener('click', function(e) {
            if (e.target.classList.contains('dropdown-item')) {
                e.stopPropagation();
            }
        });
    }

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // Handle form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Handle theme switching in settings page
    const themeRadios = document.querySelectorAll('input[name="themeOptions"]');
    if (themeRadios.length > 0) {
        themeRadios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    const theme = this.id;
                    if (theme === 'darkTheme') {
                        document.body.classList.add('dark-theme');
                        localStorage.setItem('theme', 'dark');
                    } else if (theme === 'lightTheme') {
                        document.body.classList.remove('dark-theme');
                        localStorage.setItem('theme', 'light');
                    } else {
                        // System theme
                        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                            document.body.classList.add('dark-theme');
                        } else {
                            document.body.classList.remove('dark-theme');
                        }
                        localStorage.setItem('theme', 'system');
                    }
                }
            });
        });
    }

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            const darkThemeRadio = document.getElementById('darkTheme');
            if (darkThemeRadio) darkThemeRadio.checked = true;
        } else if (savedTheme === 'system') {
            const systemThemeRadio = document.getElementById('systemTheme');
            if (systemThemeRadio) systemThemeRadio.checked = true;
            
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-theme');
            }
        }
    }

    // Handle color options in settings page
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length > 0) {
        colorOptions.forEach(function(option) {
            option.addEventListener('click', function() {
                // Remove active class from all options
                colorOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Save color preference
                const color = this.getAttribute('data-color');
                localStorage.setItem('accentColor', color);
                
                // Apply color to UI elements
                document.documentElement.style.setProperty('--primary-color', `var(--${color}-color)`);
            });
        });
    }

    // Apply saved accent color on page load
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', `var(--${savedColor}-color)`);
        
        const activeColorOption = document.querySelector(`.color-option[data-color="${savedColor}"]`);
        if (activeColorOption) {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            activeColorOption.classList.add('active');
        }
    }
});

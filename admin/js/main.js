// Main JavaScript for Admin Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const toggle = document.querySelector('.toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggle) {
        toggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('active');
        });
    }
    
    // Dropdown menu
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle) {
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
    
    // Modal functionality
    const modalBtns = document.querySelectorAll('.modal-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');
    
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically make an API call to log the user out
            // For demo purposes, we'll just redirect to a login page
            alert('Vous avez été déconnecté avec succès.');
            // window.location.href = 'login.html';
        });
    }
    
    // Initialize charts if they exist on the page
    initializeCharts();
});

// Function to initialize charts
function initializeCharts() {
    // Weekly activity chart (if it exists on the page)
    const weeklyActivityChart = document.getElementById('weeklyActivityChart');
    
    if (weeklyActivityChart) {
        const ctx = weeklyActivityChart.getContext('2d');
        
        // Sample data
        const data = {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            datasets: [
                {
                    label: 'Nouveaux patients',
                    data: [12, 19, 10, 15, 20, 8, 5],
                    backgroundColor: 'rgba(42, 127, 255, 0.2)',
                    borderColor: 'rgba(42, 127, 255, 1)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Rendez-vous',
                    data: [20, 25, 18, 30, 22, 15, 10],
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 2,
                    tension: 0.4
                }
            ]
        };
        
        // Chart configuration
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Activité Hebdomadaire'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        
        // Create the chart
        new Chart(ctx, config);
    }
}

// Function to filter table data
function filterTable(tableId, filterValue, columnIndex) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const rows = table.getElementsByTagName('tr');
    
    // Start from index 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
        const cell = rows[i].getElementsByTagName('td')[columnIndex];
        
        if (cell) {
            const cellValue = cell.textContent || cell.innerText;
            
            if (filterValue === 'all' || cellValue.toLowerCase() === filterValue.toLowerCase()) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Function to search table
function searchTable(tableId, searchInput) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const searchText = searchInput.value.toLowerCase();
    const rows = table.getElementsByTagName('tr');
    
    // Start from index 1 to skip the header row
    for (let i = 1; i < rows.length; i++) {
        const rowText = rows[i].textContent.toLowerCase();
        
        if (rowText.includes(searchText)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Function to export table data to CSV
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    const csv = [];
    
    for (const row of rows) {
        const rowData = [];
        const cols = row.querySelectorAll('td, th');
        
        for (const col of cols) {
            // Replace any commas in the cell text to avoid CSV formatting issues
            rowData.push('"' + col.innerText.replace(/"/g, '""') + '"');
        }
        
        csv.push(rowData.join(','));
    }
    
    const csvString = csv.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to export table data to PDF
function exportTableToPDF(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const doc = new jsPDF();
    
    // Add title to the PDF
    doc.text(filename, 14, 16);
    
    // Convert table to PDF
    doc.autoTable({ html: '#' + tableId });
    
    // Save the PDF
    doc.save(filename + '.pdf');
}

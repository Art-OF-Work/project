// JavaScript for Users Management Page

document.addEventListener('DOMContentLoaded', function() {
    // Sample user data for demonstration
    const users = [
        { id: 1, name: 'Dr. Ahmed Benali', email: 'ahmed.benali@clinique.com', role: 'Médecin', status: 'Actif' },
        { id: 2, name: 'Samira Hadj', email: 'samira.hadj@clinique.com', role: 'Secrétaire', status: 'Actif' },
        { id: 3, name: 'Karim Ziani', email: 'karim.ziani@gmail.com', role: 'Patient', status: 'Actif' },
        { id: 4, name: 'Dr. Fatima Mansouri', email: 'fatima.mansouri@clinique.com', role: 'Médecin', status: 'Actif' },
        { id: 5, name: 'Yasmine Khelif', email: 'yasmine.khelif@gmail.com', role: 'Patient', status: 'Suspendu' },
        { id: 6, name: 'Omar Benmoussa', email: 'omar.benmoussa@clinique.com', role: 'Secrétaire', status: 'Actif' },
        { id: 7, name: 'Dr. Nabil Hamdi', email: 'nabil.hamdi@clinique.com', role: 'Médecin', status: 'Suspendu' },
        { id: 8, name: 'Leila Bouaziz', email: 'leila.bouaziz@gmail.com', role: 'Patient', status: 'Actif' }
    ];
    
    // Populate users table
    const usersTableBody = document.getElementById('usersTableBody');
    
    if (usersTableBody) {
        populateUsersTable(users, usersTableBody);
        
        // Set up role filter
        const roleFilter = document.getElementById('roleFilter');
        if (roleFilter) {
            roleFilter.addEventListener('change', function() {
                filterUsersByRole(this.value);
            });
        }
        
        // Set up status filter
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', function() {
                filterUsersByStatus(this.value);
            });
        }
        
        // Set up search functionality
        const searchInput = document.getElementById('searchUsers');
        if (searchInput) {
            searchInput.addEventListener('keyup', function() {
                searchUsers(this.value);
            });
        }
        
        // Add user form submission
        const addUserForm = document.getElementById('addUserForm');
        if (addUserForm) {
            addUserForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addNewUser();
            });
        }
    }
    
    // Set up edit user buttons
    setupEditButtons();
    
    // Set up delete user buttons
    setupDeleteButtons();
    
    // Set up toggle status buttons
    setupToggleStatusButtons();
});

// Function to populate users table
function populateUsersTable(users, tableBody) {
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', user.id);
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status ${user.status.toLowerCase()}">${user.status}</span></td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-primary edit-user" data-id="${user.id}">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm ${user.status === 'Actif' ? 'btn-warning' : 'btn-success'} toggle-status" data-id="${user.id}" data-status="${user.status}">
                    <i class="fas fa-${user.status === 'Actif' ? 'toggle-off' : 'toggle-on'}"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Function to filter users by role
function filterUsersByRole(role) {
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        const roleCell = row.querySelector('td:nth-child(3)');
        
        if (role === 'all' || roleCell.textContent === role) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to filter users by status
function filterUsersByStatus(status) {
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        const statusCell = row.querySelector('td:nth-child(4) .status');
        
        if (status === 'all' || statusCell.textContent === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to search users
function searchUsers(query) {
    const rows = document.querySelectorAll('#usersTableBody tr');
    const searchText = query.toLowerCase();
    
    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const email = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        
        if (name.includes(searchText) || email.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Function to add a new user
function addNewUser() {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const roleInput = document.getElementById('userRole');
    
    if (!nameInput || !emailInput || !roleInput) return;
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value;
    
    if (name === '' || email === '' || role === '') {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // In a real application, you would send this data to your backend
    // For demo purposes, we'll just add it to the table
    
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;
    
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Date.now();
    
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', newId);
    
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td><span class="status actif">Actif</span></td>
        <td class="action-buttons">
            <button class="btn btn-sm btn-primary edit-user" data-id="${newId}">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-user" data-id="${newId}">
                <i class="fas fa-trash"></i>
            </button>
            <button class="btn btn-sm btn-warning toggle-status" data-id="${newId}" data-status="Actif">
                <i class="fas fa-toggle-off"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Reset form
    document.getElementById('addUserForm').reset();
    
    // Close modal
    document.getElementById('addUserModal').style.display = 'none';
    
    // Setup new buttons
    setupEditButtons();
    setupDeleteButtons();
    setupToggleStatusButtons();
    
    // Show success message
    alert('Utilisateur ajouté avec succès !');
}

// Function to set up edit user buttons
function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-user');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            const row = document.querySelector(`tr[data-id="${userId}"]`);
            
            if (!row) return;
            
            const name = row.querySelector('td:nth-child(1)').textContent;
            const email = row.querySelector('td:nth-child(2)').textContent;
            const role = row.querySelector('td:nth-child(3)').textContent;
            
            // Populate edit form
            document.getElementById('editUserId').value = userId;
            document.getElementById('editUserName').value = name;
            document.getElementById('editUserEmail').value = email;
            document.getElementById('editUserRole').value = role;
            
            // Show edit modal
            document.getElementById('editUserModal').style.display = 'block';
        });
    });
    
    // Handle edit form submission
    const editUserForm = document.getElementById('editUserForm');
    if (editUserForm) {
        editUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userId = document.getElementById('editUserId').value;
            const name = document.getElementById('editUserName').value.trim();
            const email = document.getElementById('editUserEmail').value.trim();
            const role = document.getElementById('editUserRole').value;
            
            if (name === '' || email === '' || role === '') {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Update the row in the table
            const row = document.querySelector(`tr[data-id="${userId}"]`);
            if (!row) return;
            
            row.querySelector('td:nth-child(1)').textContent = name;
            row.querySelector('td:nth-child(2)').textContent = email;
            row.querySelector('td:nth-child(3)').textContent = role;
            
            // Close modal
            document.getElementById('editUserModal').style.display = 'none';
            
            // Show success message
            alert('Utilisateur modifié avec succès !');
        });
    }
}

// Function to set up delete user buttons
function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-user');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            const row = document.querySelector(`tr[data-id="${userId}"]`);
            
            if (!row) return;
            
            const userName = row.querySelector('td:nth-child(1)').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userName}" ?`)) {
                // In a real application, you would send a delete request to your backend
                // For demo purposes, we'll just remove the row from the table
                row.remove();
                
                // Show success message
                alert('Utilisateur supprimé avec succès !');
            }
        });
    });
}

// Function to set up toggle status buttons
function setupToggleStatusButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-status');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            const currentStatus = this.getAttribute('data-status');
            const row = document.querySelector(`tr[data-id="${userId}"]`);
            
            if (!row) return;
            
            const statusCell = row.querySelector('td:nth-child(4) .status');
            const newStatus = currentStatus === 'Actif' ? 'Suspendu' : 'Actif';
            
            // Update status in the table
            statusCell.textContent = newStatus;
            statusCell.className = `status ${newStatus.toLowerCase()}`;
            
            // Update button
            this.setAttribute('data-status', newStatus);
            this.className = `btn btn-sm ${newStatus === 'Actif' ? 'btn-warning' : 'btn-success'} toggle-status`;
            this.innerHTML = `<i class="fas fa-${newStatus === 'Actif' ? 'toggle-off' : 'toggle-on'}"></i>`;
            
            // Show success message
            alert(`Statut de l'utilisateur modifié avec succès ! Nouveau statut : ${newStatus}`);
        });
    });
}

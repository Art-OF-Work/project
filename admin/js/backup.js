// JavaScript for Backup System Page

document.addEventListener('DOMContentLoaded', function() {
    // Sample backup data for demonstration
    const backups = [
        { id: 1, date: '05/05/2025', time: '09:30', size: '1.2 GB', status: 'Complété' },
        { id: 2, date: '28/04/2025', time: '10:15', size: '1.1 GB', status: 'Complété' },
        { id: 3, date: '21/04/2025', time: '08:45', size: '1.3 GB', status: 'Complété' },
        { id: 4, date: '14/04/2025', time: '11:00', size: '1.0 GB', status: 'Complété' },
        { id: 5, date: '07/04/2025', time: '09:00', size: '1.2 GB', status: 'Complété' }
    ];
    
    // Populate backups table
    const backupsTableBody = document.getElementById('backupsTableBody');
    
    if (backupsTableBody) {
        populateBackupsTable(backups, backupsTableBody);
    }
    
    // Create backup button
    const createBackupBtn = document.getElementById('createBackupBtn');
    if (createBackupBtn) {
        createBackupBtn.addEventListener('click', function() {
            createNewBackup();
        });
    }
    
    // Auto backup toggle
    const autoBackupToggle = document.getElementById('autoBackupToggle');
    if (autoBackupToggle) {
        autoBackupToggle.addEventListener('change', function() {
            toggleAutoBackup(this.checked);
        });
    }
    
    // Backup frequency input
    const backupFrequency = document.getElementById('backupFrequency');
    if (backupFrequency) {
        backupFrequency.addEventListener('change', function() {
            updateBackupFrequency(this.value);
        });
    }
    
    // Set up download backup buttons
    setupDownloadButtons();
    
    // Set up restore backup buttons
    setupRestoreButtons();
    
    // Set up delete backup buttons
    setupDeleteButtons();
    
    // Update last backup notification
    updateLastBackupNotification();
});

// Function to populate backups table
function populateBackupsTable(backups, tableBody) {
    tableBody.innerHTML = '';
    
    backups.forEach(backup => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', backup.id);
        
        row.innerHTML = `
            <td>${backup.date} à ${backup.time}</td>
            <td>${backup.size}</td>
            <td><span class="status active">${backup.status}</span></td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-primary download-backup" data-id="${backup.id}">
                    <i class="fas fa-cloud-download-alt"></i>
                </button>
                <button class="btn btn-sm btn-warning restore-backup" data-id="${backup.id}">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-backup" data-id="${backup.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Function to create a new backup
function createNewBackup() {
    // Show loading state
    const createBackupBtn = document.getElementById('createBackupBtn');
    if (createBackupBtn) {
        createBackupBtn.disabled = true;
        createBackupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sauvegarde en cours...';
    }
    
    // In a real application, you would send a request to your backend to create a backup
    // For demo purposes, we'll just simulate a delay and add a new backup to the table
    setTimeout(() => {
        const tableBody = document.getElementById('backupsTableBody');
        if (!tableBody) return;
        
        // Generate a new ID (in a real app, this would come from the backend)
        const newId = Date.now();
        
        // Get current date and time
        const now = new Date();
        const date = now.toLocaleDateString('fr-FR');
        const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-id', newId);
        
        newRow.innerHTML = `
            <td>${date} à ${time}</td>
            <td>1.2 GB</td>
            <td><span class="status active">Complété</span></td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-primary download-backup" data-id="${newId}">
                    <i class="fas fa-cloud-download-alt"></i>
                </button>
                <button class="btn btn-sm btn-warning restore-backup" data-id="${newId}">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-backup" data-id="${newId}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Add to the top of the table
        tableBody.insertBefore(newRow, tableBody.firstChild);
        
        // Reset button
        if (createBackupBtn) {
            createBackupBtn.disabled = false;
            createBackupBtn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Créer une sauvegarde maintenant';
        }
        
        // Setup new buttons
        setupDownloadButtons();
        setupRestoreButtons();
        setupDeleteButtons();
        
        // Update last backup notification
        updateLastBackupNotification();
        
        // Show success message
        alert('Sauvegarde créée avec succès !');
    }, 3000); // Simulate a 3-second backup process
}

// Function to toggle automatic backup
function toggleAutoBackup(enabled) {
    // In a real application, you would send this setting to your backend
    // For demo purposes, we'll just show an alert
    
    const backupFrequencyContainer = document.getElementById('backupFrequencyContainer');
    if (backupFrequencyContainer) {
        backupFrequencyContainer.style.display = enabled ? 'block' : 'none';
    }
    
    alert(`Sauvegarde automatique ${enabled ? 'activée' : 'désactivée'} !`);
}

// Function to update backup frequency
function updateBackupFrequency(days) {
    // In a real application, you would send this setting to your backend
    // For demo purposes, we'll just show an alert
    alert(`Fréquence de sauvegarde automatique mise à jour : tous les ${days} jours.`);
}

// Function to set up download backup buttons
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-backup');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const backupId = this.getAttribute('data-id');
            const row = document.querySelector(`tr[data-id="${backupId}"]`);
            
            if (!row) return;
            
            const backupDate = row.querySelector('td:nth-child(1)').textContent;
            
            // In a real application, you would initiate a download of the backup file
            // For demo purposes, we'll just show an alert
            alert(`Téléchargement de la sauvegarde du ${backupDate} en cours...`);
        });
    });
}

// Function to set up restore backup buttons
function setupRestoreButtons() {
    const restoreButtons = document.querySelectorAll('.restore-backup');
    
    restoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const backupId = this.getAttribute('data-id');
            const row = document.querySelector(`tr[data-id="${backupId}"]`);
            
            if (!row) return;
            
            const backupDate = row.querySelector('td:nth-child(1)').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir restaurer la sauvegarde du ${backupDate} ? Cette action est irréversible et remplacera toutes les données actuelles.`)) {
                // In a real application, you would send a restore request to your backend
                // For demo purposes, we'll just show an alert
                
                // Show loading state
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    // Reset button
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-undo"></i>';
                    
                    // Show success message
                    alert(`Sauvegarde du ${backupDate} restaurée avec succès !`);
                }, 3000); // Simulate a 3-second restore process
            }
        });
    });
}

// Function to set up delete backup buttons
function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-backup');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const backupId = this.getAttribute('data-id');
            const row = document.querySelector(`tr[data-id="${backupId}"]`);
            
            if (!row) return;
            
            const backupDate = row.querySelector('td:nth-child(1)').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer la sauvegarde du ${backupDate} ? Cette action est irréversible.`)) {
                // In a real application, you would send a delete request to your backend
                // For demo purposes, we'll just remove the row from the table
                row.remove();
                
                // Update last backup notification
                updateLastBackupNotification();
                
                // Show success message
                alert(`Sauvegarde du ${backupDate} supprimée avec succès !`);
            }
        });
    });
}

// Function to update last backup notification
function updateLastBackupNotification() {
    const backupNotification = document.getElementById('backupNotification');
    if (!backupNotification) return;
    
    const backupsTable = document.getElementById('backupsTableBody');
    if (!backupsTable || !backupsTable.firstChild) {
        backupNotification.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Aucune sauvegarde n\'a été effectuée.';
        backupNotification.className = 'notification-box warning';
        return;
    }
    
    const lastBackupDate = backupsTable.firstChild.querySelector('td:nth-child(1)').textContent;
    
    // Calculate days since last backup
    const today = new Date();
    const dateParts = lastBackupDate.split(' à ')[0].split('/');
    const lastBackup = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    
    const diffTime = Math.abs(today - lastBackup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
        backupNotification.innerHTML = '<i class="fas fa-check-circle"></i> La dernière sauvegarde a été effectuée aujourd\'hui.';
        backupNotification.className = 'notification-box success';
    } else if (diffDays <= 3) {
        backupNotification.innerHTML = `<i class="fas fa-info-circle"></i> La dernière sauvegarde a été effectuée il y a ${diffDays} jours.`;
        backupNotification.className = 'notification-box info';
    } else {
        backupNotification.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Aucune sauvegarde effectuée depuis ${diffDays} jours.`;
        backupNotification.className = 'notification-box warning';
    }
}

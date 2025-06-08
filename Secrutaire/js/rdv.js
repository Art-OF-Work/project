/**
 * Appointments Management JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize datepickers with French locale
    if (document.querySelector('.datepicker')) {
        flatpickr('.datepicker', {
            dateFormat: 'd/m/Y',
            locale: 'fr',
            allowInput: true
        });
    }

    // Initialize timepickers with 24h format
    if (document.querySelector('.timepicker')) {
        flatpickr('.timepicker', {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            locale: 'fr',
            allowInput: true,
            minuteIncrement: 15
        });
    }

    // Filter appointments by date
    const dateFilter = document.querySelector('.datepicker');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            filterAppointments();
        });
    }

    // Filter appointments by patient
    const patientFilter = document.querySelector('input[placeholder="Filtrer par patient"]');
    if (patientFilter) {
        patientFilter.addEventListener('input', function() {
            filterAppointments();
        });
    }

    // Filter appointments by doctor
    const doctorFilter = document.querySelector('select[class="form-select"]');
    if (doctorFilter) {
        doctorFilter.addEventListener('change', function() {
            filterAppointments();
        });
    }

    // Filter appointments by status
    const statusFilter = document.querySelector('select[class="form-select"]:nth-of-type(2)');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterAppointments();
        });
    }

    // Function to filter appointments based on selected criteria
    function filterAppointments() {
        const date = dateFilter ? dateFilter.value : '';
        const patient = patientFilter ? patientFilter.value.toLowerCase() : '';
        const doctor = doctorFilter ? doctorFilter.value : '';
        const status = statusFilter ? statusFilter.value : '';

        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            let showRow = true;
            
            // Check date filter
            if (date && row.cells[1].textContent !== date) {
                showRow = false;
            }
            
            // Check patient filter
            if (patient && !row.cells[0].textContent.toLowerCase().includes(patient)) {
                showRow = false;
            }
            
            // Check doctor filter
            if (doctor && row.cells[3].textContent !== `Dr. ${doctor}`) {
                showRow = false;
            }
            
            // Check status filter
            const rowStatus = row.cells[4].textContent.toLowerCase();
            if (status === 'confirmed' && !rowStatus.includes('confirmé')) {
                showRow = false;
            } else if (status === 'pending' && !rowStatus.includes('attente')) {
                showRow = false;
            } else if (status === 'cancelled' && !rowStatus.includes('annulé')) {
                showRow = false;
            }
            
            // Show or hide row
            row.style.display = showRow ? '' : 'none';
        });
    }

    // Handle Add Appointment Form Submission
    const addAppointmentForm = document.querySelector('#addAppointmentModal form');
    if (addAppointmentForm) {
        addAppointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const patient = document.getElementById('patientSelect').value;
            const doctor = document.getElementById('doctorSelect').value;
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            const reason = document.getElementById('appointmentReason').value;
            const status = document.getElementById('appointmentStatus').value;
            
            // Validate form
            if (!patient || !doctor || !date || !time) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Here you would normally send data to server
            // For demo purposes, we'll just show a success message
            alert('Rendez-vous ajouté avec succès!');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addAppointmentModal'));
            modal.hide();
            
            // Reset form
            addAppointmentForm.reset();
            
            // In a real application, you would refresh the appointments list or add the new appointment to the table
        });
    }

    // Handle Edit Appointment Form Submission
    const editAppointmentForm = document.querySelector('#editAppointmentModal form');
    if (editAppointmentForm) {
        editAppointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const patient = document.getElementById('editPatientSelect').value;
            const doctor = document.getElementById('editDoctorSelect').value;
            const date = document.getElementById('editAppointmentDate').value;
            const time = document.getElementById('editAppointmentTime').value;
            const reason = document.getElementById('editAppointmentReason').value;
            const status = document.getElementById('editAppointmentStatus').value;
            
            // Validate form
            if (!patient || !doctor || !date || !time) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Here you would normally send data to server
            // For demo purposes, we'll just show a success message
            alert('Rendez-vous modifié avec succès!');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal'));
            modal.hide();
            
            // In a real application, you would refresh the appointments list or update the appointment in the table
        });
    }

    // Handle Cancel Appointment Form Submission
    const cancelAppointmentForm = document.querySelector('#cancelAppointmentModal form');
    if (cancelAppointmentForm) {
        document.querySelector('#cancelAppointmentModal .btn-danger').addEventListener('click', function() {
            const reason = document.getElementById('cancellationReason').value;
            
            // Here you would normally send data to server
            // For demo purposes, we'll just show a success message
            alert('Rendez-vous annulé avec succès!');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('cancelAppointmentModal'));
            modal.hide();
            
            // Reset form
            cancelAppointmentForm.reset();
            
            // In a real application, you would refresh the appointments list or update the appointment status in the table
        });
    }

    // Populate Edit Appointment Modal with appointment data when opened
    const editButtons = document.querySelectorAll('button[data-bs-toggle="modal"][data-bs-target="#editAppointmentModal"]');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const patient = row.cells[0].textContent;
            const date = row.cells[1].textContent;
            const time = row.cells[2].textContent;
            const doctor = row.cells[3].textContent;
            const status = row.cells[4].querySelector('.badge').textContent;
            
            // Set values in edit form
            document.getElementById('editPatientSelect').value = getPatientIdByName(patient);
            document.getElementById('editDoctorSelect').value = getDoctorIdByName(doctor);
            document.getElementById('editAppointmentDate').value = date;
            document.getElementById('editAppointmentTime').value = time;
            
            // Set status
            const statusSelect = document.getElementById('editAppointmentStatus');
            if (status.includes('Confirmé')) {
                statusSelect.value = 'confirmed';
            } else if (status.includes('En attente')) {
                statusSelect.value = 'pending';
            } else if (status.includes('Annulé')) {
                statusSelect.value = 'cancelled';
            }
        });
    });

    // Populate Cancel Appointment Modal with appointment data when opened
    const cancelButtons = document.querySelectorAll('button[data-bs-toggle="modal"][data-bs-target="#cancelAppointmentModal"]');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const patient = row.cells[0].textContent;
            const date = row.cells[1].textContent;
            const time = row.cells[2].textContent;
            const doctor = row.cells[3].textContent;
            
            // Update modal text
            const modalBody = document.querySelector('#cancelAppointmentModal .modal-body p');
            modalBody.innerHTML = `Êtes-vous sûr de vouloir annuler le rendez-vous de <strong>${patient}</strong> le <strong>${date}</strong> à <strong>${time}</strong> avec <strong>${doctor}</strong>?`;
        });
    });

    // Helper function to get patient ID by name (in a real app, this would be handled by the backend)
    function getPatientIdByName(name) {
        const patients = {
            'Martin, Jean': '1',
            'Dupont, Marie': '2',
            'Bernard, Sophie': '3',
            'Petit, Thomas': '4',
            'Leroy, Émilie': '5'
        };
        return patients[name] || '1';
    }

    // Helper function to get doctor ID by name (in a real app, this would be handled by the backend)
    function getDoctorIdByName(name) {
        const doctors = {
            'Dr. Lefèvre': '1',
            'Dr. Moreau': '2',
            'Dr. Petit': '3'
        };
        return doctors[name] || '1';
    }
});

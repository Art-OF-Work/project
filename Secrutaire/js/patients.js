/**
 * Patients Management JavaScript
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

    // Handle Add Patient Form Submission
    const addPatientForm = document.getElementById('addPatientForm');
    if (addPatientForm) {
        addPatientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const lastName = document.getElementById('lastName').value;
            const firstName = document.getElementById('firstName').value;
            const birthDate = document.getElementById('birthDate').value;
            const gender = document.getElementById('gender').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const postalCode = document.getElementById('postalCode').value;
            const city = document.getElementById('city').value;
            
            // Validate form
            if (!lastName || !firstName || !birthDate || !gender || !phoneNumber || !address || !postalCode || !city) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Here you would normally send data to server
            // For demo purposes, we'll just show a success message
            alert('Patient ajouté avec succès!');
            
            // Redirect to patient list
            window.location.href = 'liste-patients.html';
        });
    }

    // Handle Modify Patient Form Submission
    const modifyPatientForm = document.getElementById('modifyPatientForm');
    if (modifyPatientForm) {
        modifyPatientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const lastName = document.getElementById('lastName').value;
            const firstName = document.getElementById('firstName').value;
            const birthDate = document.getElementById('birthDate').value;
            const gender = document.getElementById('gender').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const postalCode = document.getElementById('postalCode').value;
            const city = document.getElementById('city').value;
            
            // Validate form
            if (!lastName || !firstName || !birthDate || !gender || !phoneNumber || !address || !postalCode || !city) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Here you would normally send data to server
            // For demo purposes, we'll just show a success message
            alert('Informations du patient mises à jour avec succès!');
            
            // Redirect to patient list
            window.location.href = 'liste-patients.html';
        });
    }

    // Handle Patient Selection in Modify Patient Page
    const patientSelect = document.getElementById('patientSelect');
    if (patientSelect) {
        patientSelect.addEventListener('change', function() {
            const patientId = this.value;
            if (patientId) {
                // In a real application, you would fetch patient data from server
                // For demo purposes, we'll just show a message
                alert('Chargement des informations du patient...');
                
                // Simulate loading patient data
                // In a real application, this would be replaced with actual data from server
                setTimeout(function() {
                    // Populate form with patient data
                    // This is just for demonstration purposes
                    const patientData = getPatientDataById(patientId);
                    
                    document.getElementById('lastName').value = patientData.lastName;
                    document.getElementById('firstName').value = patientData.firstName;
                    document.getElementById('birthDate').value = patientData.birthDate;
                    document.getElementById('gender').value = patientData.gender;
                    document.getElementById('phoneNumber').value = patientData.phoneNumber;
                    document.getElementById('email').value = patientData.email;
                    document.getElementById('address').value = patientData.address;
                    document.getElementById('postalCode').value = patientData.postalCode;
                    document.getElementById('city').value = patientData.city;
                    document.getElementById('country').value = patientData.country;
                    document.getElementById('socialSecurityNumber').value = patientData.socialSecurityNumber;
                    document.getElementById('referringDoctor').value = patientData.referringDoctor;
                    document.getElementById('medicalHistory').value = patientData.medicalHistory;
                    document.getElementById('allergies').value = patientData.allergies;
                    document.getElementById('currentMedications').value = patientData.currentMedications;
                    document.getElementById('emergencyContactName').value = patientData.emergencyContactName;
                    document.getElementById('emergencyContactPhone').value = patientData.emergencyContactPhone;
                }, 500);
            }
        });
    }

    // Handle Patient Search in Modify Patient Page
    const patientSearch = document.getElementById('patientSearch');
    if (patientSearch) {
        patientSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // In a real application, you would search patients from server
            // For demo purposes, we'll just show a message
            if (searchTerm.length >= 3) {
                alert('Recherche de patients correspondant à: ' + searchTerm);
                
                // Simulate searching patients
                // In a real application, this would be replaced with actual search results from server
            }
        });
    }

    // Initialize DataTable for Patients List
    if (document.getElementById('patientsTable')) {
        try {
            const patientsTable = $('#patientsTable').DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/French.json'
                },
                responsive: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel', 'pdf', 'print'
                ]
            });
            
            // Global search functionality
            $('#globalSearch').on('keyup', function() {
                patientsTable.search(this.value).draw();
            });
            
            // Doctor filter
            $('#doctorFilter').on('change', function() {
                const doctorName = $(this).find('option:selected').text();
                patientsTable.column(5).search(doctorName === 'Tous les médecins' ? '' : doctorName).draw();
            });
            
            // Reset filters
            $('#resetFilters').on('click', function() {
                $('#globalSearch').val('');
                $('#doctorFilter').val('');
                $('#lastVisitFilter').val('');
                patientsTable.search('').columns().search('').draw();
            });
        } catch (e) {
            console.error('DataTables initialization error:', e);
            
            // Fallback for basic search if DataTables fails to initialize
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const rows = document.querySelectorAll('#patientsTable tbody tr');
                    
                    rows.forEach(row => {
                        let found = false;
                        const cells = row.querySelectorAll('td');
                        cells.forEach(cell => {
                            if (cell.textContent.toLowerCase().includes(searchTerm)) {
                                found = true;
                            }
                        });
                        
                        row.style.display = found ? '' : 'none';
                    });
                });
            }
        }
    }

    // Handle Export to Excel button
    const exportExcelBtn = document.getElementById('exportExcel');
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', function() {
            alert('Export Excel en cours...');
            // In a real application, this would trigger an Excel export
        });
    }

    // Handle Export to PDF button
    const exportPDFBtn = document.getElementById('exportPDF');
    if (exportPDFBtn) {
        exportPDFBtn.addEventListener('click', function() {
            alert('Export PDF en cours...');
            // In a real application, this would trigger a PDF export
        });
    }

    // Handle Delete Patient button
    const deletePatientBtn = document.querySelector('.btn-danger[type="button"]');
    if (deletePatientBtn && deletePatientBtn.textContent.includes('Supprimer')) {
        deletePatientBtn.addEventListener('click', function() {
            // Show confirmation modal
            const deleteModal = new bootstrap.Modal(document.getElementById('deletePatientModal'));
            deleteModal.show();
            
            // Handle confirmation
            document.querySelector('#deletePatientModal .btn-danger').addEventListener('click', function() {
                // In a real application, this would delete the patient from the database
                alert('Patient supprimé avec succès!');
                
                // Close modal
                deleteModal.hide();
                
                // Redirect to patient list
                window.location.href = 'liste-patients.html';
            });
        });
    }

    // Helper function to get patient data by ID (in a real app, this would be handled by the backend)
    function getPatientDataById(id) {
        const patients = {
            '1': {
                lastName: 'Martin',
                firstName: 'Jean',
                birthDate: '22/07/1976',
                gender: 'M',
                phoneNumber: '06 98 76 54 32',
                email: 'jean.martin@email.com',
                address: '10 Rue des Roses',
                postalCode: '75002',
                city: 'Paris',
                country: 'France',
                socialSecurityNumber: '1 76 07 22 123 456 78',
                referringDoctor: '1',
                medicalHistory: 'Appendicectomie en 2010. Fracture du bras gauche en 2015.',
                allergies: 'Aucune connue',
                currentMedications: 'Aucun',
                emergencyContactName: 'Martin, Claire',
                emergencyContactPhone: '06 12 34 56 78'
            },
            '2': {
                lastName: 'Dupont',
                firstName: 'Marie',
                birthDate: '15/03/1985',
                gender: 'F',
                phoneNumber: '06 12 34 56 78',
                email: 'marie.dupont@email.com',
                address: '15 Rue des Lilas',
                postalCode: '75001',
                city: 'Paris',
                country: 'France',
                socialSecurityNumber: '2 85 03 15 123 456 78',
                referringDoctor: '2',
                medicalHistory: 'Hypertension artérielle diagnostiquée en 2020.\nFracture du poignet droit en 2018.',
                allergies: 'Pénicilline',
                currentMedications: 'Amlodipine 5mg, 1 comprimé par jour',
                emergencyContactName: 'Dupont, Pierre',
                emergencyContactPhone: '06 98 76 54 32'
            },
            '3': {
                lastName: 'Bernard',
                firstName: 'Sophie',
                birthDate: '10/11/1990',
                gender: 'F',
                phoneNumber: '06 45 67 89 12',
                email: 'sophie.bernard@email.com',
                address: '25 Avenue Victor Hugo',
                postalCode: '75016',
                city: 'Paris',
                country: 'France',
                socialSecurityNumber: '2 90 11 10 123 456 78',
                referringDoctor: '1',
                medicalHistory: 'Asthme depuis l\'enfance',
                allergies: 'Acariens, pollen',
                currentMedications: 'Ventoline (si besoin)',
                emergencyContactName: 'Bernard, Thomas',
                emergencyContactPhone: '06 78 90 12 34'
            },
            '4': {
                lastName: 'Petit',
                firstName: 'Thomas',
                birthDate: '05/09/1982',
                gender: 'M',
                phoneNumber: '06 23 45 67 89',
                email: 'thomas.petit@email.com',
                address: '8 Rue de la Paix',
                postalCode: '75008',
                city: 'Paris',
                country: 'France',
                socialSecurityNumber: '1 82 09 05 123 456 78',
                referringDoctor: '2',
                medicalHistory: 'Diabète de type 2 diagnostiqué en 2019',
                allergies: 'Aucune connue',
                currentMedications: 'Metformine 500mg, 2 comprimés par jour',
                emergencyContactName: 'Petit, Julie',
                emergencyContactPhone: '06 34 56 78 90'
            }
        };
        
        return patients[id] || patients['1'];
    }
});

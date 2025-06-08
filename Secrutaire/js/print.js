/**
 * Print Functionality JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle patient selection in the patient list
    const patientListItems = document.querySelectorAll('.patient-list .list-group-item');
    if (patientListItems.length > 0) {
        patientListItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all items
                patientListItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get patient ID
                const patientId = this.getAttribute('data-patient-id');
                
                // Load patient record
                loadPatientRecord(patientId);
            });
        });
        
        // Load first patient by default
        loadPatientRecord(patientListItems[0].getAttribute('data-patient-id'));
    }
    
    // Handle patient search
    const patientSearch = document.getElementById('patientSearch');
    if (patientSearch) {
        patientSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            patientListItems.forEach(item => {
                const patientName = item.querySelector('h6').textContent.toLowerCase();
                const patientId = item.querySelector('small').textContent.toLowerCase();
                
                if (patientName.includes(searchTerm) || patientId.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Handle print button
    const printButton = document.getElementById('printRecord');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Handle download PDF button
    const downloadPDFButton = document.getElementById('downloadPDF');
    if (downloadPDFButton) {
        downloadPDFButton.addEventListener('click', function() {
            const element = document.getElementById('patientRecordPreview');
            const opt = {
                margin: 10,
                filename: 'fiche-patient.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // Generate PDF
            html2pdf().set(opt).from(element).save();
        });
    }
    
    // Function to load patient record
    function loadPatientRecord(patientId) {
        // In a real application, you would fetch patient data from server
        // For demo purposes, we'll just update the preview with mock data
        
        // Get patient data
        const patientData = getPatientDataById(patientId);
        
        // Update patient record preview
        updatePatientRecordPreview(patientData);
    }
    
    // Function to update patient record preview
    function updatePatientRecordPreview(patientData) {
        const preview = document.getElementById('patientRecordPreview');
        if (!preview) return;
        
        // Format current date
        const now = new Date();
        const formattedDate = now.toLocaleDateString('fr-FR');
        const formattedTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        
        // Create HTML for patient record
        const html = `
            <div class="patient-record">
                <div class="record-header">
                    <div class="clinic-info">
                        <h2>Clinique Médicale</h2>
                        <p>15 Avenue de la Santé, 75001 Paris</p>
                        <p>Tél: 01 23 45 67 89 | Email: contact@clinique-medicale.fr</p>
                    </div>
                    <div class="record-title">
                        <h3>FICHE PATIENT</h3>
                    </div>
                </div>
                
                <div class="patient-info-section">
                    <h4>Informations personnelles</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Numéro de dossier:</strong> ${patientData.patientId}</p>
                            <p><strong>Nom:</strong> ${patientData.lastName}</p>
                            <p><strong>Prénom:</strong> ${patientData.firstName}</p>
                            <p><strong>Date de naissance:</strong> ${patientData.birthDate}</p>
                            <p><strong>Sexe:</strong> ${patientData.gender === 'M' ? 'Masculin' : patientData.gender === 'F' ? 'Féminin' : 'Autre'}</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Téléphone:</strong> ${patientData.phoneNumber}</p>
                            <p><strong>Email:</strong> ${patientData.email}</p>
                            <p><strong>Adresse:</strong> ${patientData.address}, ${patientData.postalCode} ${patientData.city}</p>
                            <p><strong>Numéro de sécurité sociale:</strong> ${patientData.socialSecurityNumber}</p>
                        </div>
                    </div>
                </div>
                
                <div class="medical-info-section">
                    <h4>Informations médicales</h4>
                    <p><strong>Médecin référent:</strong> ${patientData.referringDoctor}</p>
                    <p><strong>Allergies:</strong> ${patientData.allergies || 'Aucune connue'}</p>
                    <p><strong>Médicaments actuels:</strong> ${patientData.currentMedications || 'Aucun'}</p>
                    <p><strong>Historique médical:</strong> ${patientData.medicalHistory || 'Aucun antécédent médical signalé'}</p>
                </div>
                
                <div class="emergency-contact-section">
                    <h4>Contact d'urgence</h4>
                    <p><strong>Nom:</strong> ${patientData.emergencyContactName || 'Non spécifié'}</p>
                    <p><strong>Téléphone:</strong> ${patientData.emergencyContactPhone || 'Non spécifié'}</p>
                    <p><strong>Relation:</strong> ${patientData.emergencyContactRelation || 'Non spécifiée'}</p>
                </div>
                
                <div class="recent-visits-section">
                    <h4>Visites récentes</h4>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Médecin</th>
                                <th>Motif</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${patientData.recentVisits.map(visit => `
                                <tr>
                                    <td>${visit.date}</td>
                                    <td>${visit.doctor}</td>
                                    <td>${visit.reason}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="upcoming-appointments-section">
                    <h4>Rendez-vous à venir</h4>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Médecin</th>
                                <th>Motif</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${patientData.upcomingAppointments.map(appointment => `
                                <tr>
                                    <td>${appointment.date}</td>
                                    <td>${appointment.time}</td>
                                    <td>${appointment.doctor}</td>
                                    <td>${appointment.reason}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="record-footer">
                    <p>Document généré le ${formattedDate} à ${formattedTime} par Mme. Dubois</p>
                    <p>Ce document est confidentiel et contient des informations médicales protégées.</p>
                </div>
            </div>
        `;
        
        // Update preview
        preview.innerHTML = html;
    }
    
    // Helper function to get patient data by ID (in a real app, this would be handled by the backend)
    function getPatientDataById(id) {
        const patients = {
            '1': {
                patientId: '12345',
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
                referringDoctor: 'Dr. Lefèvre',
                medicalHistory: 'Appendicectomie en 2010. Fracture du bras gauche en 2015.',
                allergies: 'Aucune connue',
                currentMedications: 'Aucun',
                emergencyContactName: 'Martin, Claire',
                emergencyContactPhone: '06 12 34 56 78',
                emergencyContactRelation: 'Épouse',
                recentVisits: [
                    { date: '05/05/2025', doctor: 'Dr. Lefèvre', reason: 'Consultation de routine' },
                    { date: '10/03/2025', doctor: 'Dr. Moreau', reason: 'Douleurs lombaires' },
                    { date: '15/01/2025', doctor: 'Dr. Lefèvre', reason: 'Syndrome grippal' }
                ],
                upcomingAppointments: [
                    { date: '12/05/2025', time: '14:30', doctor: 'Dr. Lefèvre', reason: 'Suivi douleurs lombaires' }
                ]
            },
            '2': {
                patientId: '12346',
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
                referringDoctor: 'Dr. Moreau',
                medicalHistory: 'Hypertension artérielle diagnostiquée en 2020.\nFracture du poignet droit en 2018.',
                allergies: 'Pénicilline',
                currentMedications: 'Amlodipine 5mg, 1 comprimé par jour',
                emergencyContactName: 'Dupont, Pierre',
                emergencyContactPhone: '06 98 76 54 32',
                emergencyContactRelation: 'Époux',
                recentVisits: [
                    { date: '12/05/2025', doctor: 'Dr. Moreau', reason: 'Contrôle tension artérielle' },
                    { date: '15/04/2025', doctor: 'Dr. Moreau', reason: 'Renouvellement ordonnance' },
                    { date: '20/02/2025', doctor: 'Dr. Petit', reason: 'Douleurs abdominales' }
                ],
                upcomingAppointments: [
                    { date: '15/06/2025', time: '10:00', doctor: 'Dr. Moreau', reason: 'Contrôle tension artérielle' }
                ]
            },
            '3': {
                patientId: '12347',
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
                referringDoctor: 'Dr. Lefèvre',
                medicalHistory: 'Asthme depuis l\'enfance',
                allergies: 'Acariens, pollen',
                currentMedications: 'Ventoline (si besoin)',
                emergencyContactName: 'Bernard, Thomas',
                emergencyContactPhone: '06 78 90 12 34',
                emergencyContactRelation: 'Frère',
                recentVisits: [
                    { date: '12/05/2025', doctor: 'Dr. Lefèvre', reason: 'Crise d\'asthme' },
                    { date: '05/03/2025', doctor: 'Dr. Lefèvre', reason: 'Contrôle annuel' },
                    { date: '10/12/2024', doctor: 'Dr. Lefèvre', reason: 'Bronchite' }
                ],
                upcomingAppointments: [
                    { date: '15/07/2025', time: '11:30', doctor: 'Dr. Lefèvre', reason: 'Contrôle asthme' }
                ]
            },
            '4': {
                patientId: '12348',
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
                referringDoctor: 'Dr. Moreau',
                medicalHistory: 'Diabète de type 2 diagnostiqué en 2019',
                allergies: 'Aucune connue',
                currentMedications: 'Metformine 500mg, 2 comprimés par jour',
                emergencyContactName: 'Petit, Julie',
                emergencyContactPhone: '06 34 56 78 90',
                emergencyContactRelation: 'Sœur',
                recentVisits: [
                    { date: '13/05/2025', doctor: 'Dr. Moreau', reason: 'Contrôle glycémie' },
                    { date: '15/02/2025', doctor: 'Dr. Moreau', reason: 'Renouvellement ordonnance' },
                    { date: '20/11/2024', doctor: 'Dr. Petit', reason: 'Grippe saisonnière' }
                ],
                upcomingAppointments: [
                    { date: '15/08/2025', time: '09:30', doctor: 'Dr. Moreau', reason: 'Contrôle glycémie' }
                ]
            },
            '5': {
                patientId: '12349',
                lastName: 'Leroy',
                firstName: 'Émilie',
                birthDate: '18/12/1988',
                gender: 'F',
                phoneNumber: '06 34 56 78 90',
                email: 'emilie.leroy@email.com',
                address: '42 Rue du Commerce',
                postalCode: '75015',
                city: 'Paris',
                country: 'France',
                socialSecurityNumber: '2 88 12 18 123 456 78',
                referringDoctor: 'Dr. Petit',
                medicalHistory: 'Migraines chroniques',
                allergies: 'Lactose',
                currentMedications: 'Sumatriptan (si besoin)',
                emergencyContactName: 'Leroy, Marc',
                emergencyContactPhone: '06 45 67 89 12',
                emergencyContactRelation: 'Époux',
                recentVisits: [
                    { date: '10/05/2025', doctor: 'Dr. Petit', reason: 'Migraine sévère' },
                    { date: '25/03/2025', doctor: 'Dr. Petit', reason: 'Consultation de routine' },
                    { date: '05/01/2025', doctor: 'Dr. Lefèvre', reason: 'Infection urinaire' }
                ],
                upcomingAppointments: [
                    { date: '10/06/2025', time: '14:00', doctor: 'Dr. Petit', reason: 'Suivi migraines' }
                ]
            }
        };
        
        return patients[id] || patients['1'];
    }
});

// ��rencileri listele
function GetAllStudents() {
    const studentList = document.getElementById('studentList');

    fetch('https://localhost:7291/api/Student', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to retrieve data');
            }
            return response.json();
        })
        .then(students => {
            studentList.innerHTML = "";
            students.forEach(student => {
                studentList.innerHTML += `<tr>
                    <th scope="row">${student.no}</th>
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.class}</td>
                    <td class="btn-group">
                        <button type="button" class="btn btn-warning" onclick="GetOneStudentForUpdate(${student.id})">Update</button>
                        <button type="button" class="btn btn-danger" onclick="DeleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>`;
            })
        })
        .catch(error => {
            alert(error);
        });
}

// ��renci kay�t formu
document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }

    // Formdan verileri al ve JSON format�nda obje olu�tur
    const formData = new FormData(this);
    const student = {
        no: formData.get('no'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        class: formData.get('class')
    };

    // API'ye JSON olarak veri g�nder
    fetch('https://localhost:7291/api/Student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // JSON veri g�nderiyoruz
        },
        body: JSON.stringify(student)  // ��renci verisini JSON'a �evirerek g�nderiyoruz
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add student');
            }
            return response.json();  // E�er veri ekleme ba�ar�l�ysa JSON verisini al
        })
        .then(() => {
            // Ba�ar�l� bir �ekilde ��renci eklendiyse mesaj� g�ster
            alert('Student registered successfully!');

            // Formu s�f�rla ve modal'� kapat
            document.getElementById('studentForm').classList.remove('was-validated');
            bootstrap.Modal.getInstance(document.getElementById('registerStudentModal')).hide();
            document.getElementById('studentForm').reset();

            // ��rencilerin g�ncellenmi� listesini al ve g�r�nt�le
            GetAllStudents();
        })
        .catch(error => {
            // Hata durumunda kullan�c�y� uyar
            alert('Error: ' + error.message);
        });
});



// ��renci g�ncelleme formu
function GetOneStudentForUpdate(id) {
    fetch(`https://localhost:7291/api/Student/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(student => {
            document.getElementById('updateStudentId').value = student.id;
            document.getElementById('updateStudentNumber').value = student.no;
            document.getElementById('updateFirstName').value = student.firstName;
            document.getElementById('updateLastName').value = student.lastName;
            document.getElementById('updateClass').value = student.class;

            new bootstrap.Modal(document.getElementById('updateStudentModal')).show();
        })
        .catch(error => {
            alert(error.message);
        });
}

// ��renci g�ncelleme formu submit i�lemi
document.getElementById('updateStudentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }

    const student = {
        id: document.getElementById('updateStudentId').value,
        no: document.getElementById('updateStudentNumber').value,
        firstName: document.getElementById('updateFirstName').value,
        lastName: document.getElementById('updateLastName').value,
        class: document.getElementById('updateClass').value,
    }

    fetch(`https://localhost:7291/api/Student/${student.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            alert('Student updated successfully!');
            bootstrap.Modal.getInstance(document.getElementById('updateStudentModal')).hide();
            GetAllStudents();
        })
        .catch(error => {
            alert(error.message);
        });
});

// ��renci silme
let studentToDeleteId = null;

function DeleteStudent(id) {
    studentToDeleteId = id;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    deleteModal.show();
};

document.getElementById('confirmDeleteButton').addEventListener('click', function () {
    if (studentToDeleteId === null) return;

    fetch(`https://localhost:7291/api/Student/${studentToDeleteId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            alert('Student deleted successfully!');
            bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal')).hide();
            GetAllStudents();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with your submission: ' + error.message);
        });
});

// Sayfa y�klendi�inde ��rencileri listele
window.onload = function () {
    GetAllStudents();
};

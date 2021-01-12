
//function to retrieve all chirps and place in card
function getAllChirps() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/api/chirps",
    })
        .done((chirps) => {
            chirps.forEach(chirp => {
                $(`<div class= "container">
                <div class= "row">
                <div class="card col-12 m-4 id=${chirp.id}" style="width: 18rem;">
                <div class="card-body">
                    <h5 id="cardTitle" class="card-title">${chirp.user}</h5>
                    <p id="cardBody" class="card-text">${chirp.msg}</p>
                    <button onclick="editChirp('${chirp.id}', '${chirp.user}', '${chirp.msg}')" id="edit" class="btn-sm">Edit Chirp</button>
                    <button onclick="deleteChirp(${chirp.id})" id="delete" class="btn-sm">Delete Chirp</button>
                </div>
                </div> 
                </div>
                </div>`)
                    .appendTo('#chirpsContainer')
            })
        })
}

//function to create and post a new chirp
function createChirp() {
    let user = $('#userName').val();
    let msg = $('#chirpText').val();
    $.ajax({
        method: 'POST',
        url: "http://localhost:3000/api/chirps",
        data: { user, msg }
    })
        .then(() => {
            $('#chirpsContainer').empty()
            getAllChirps();
            $('#userName').val('')
            $('#chirpText').val('')
        })
}

//function to delete a chirp based on chirp ID
function deleteChirp(id) {
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3000/api/chirps/${id}`
    })
        .then(() => {
            alert(`Chirp #${id} deleted!`)
            $('#chirpsContainer').empty()
            getAllChirps();
        })
}

//funciton to edit a chirp
function editChirp(id, user, msg) {
    Swal.fire({
        title: `Edit Chirp # ${id}`,
        text: `Editing ${user}'s chirp`,
        input: 'textarea',
        inputValue: msg,
        confirmButtonText: 'Save Edit',
        preConfirm: editedMessage => {
            $.ajax({
                method: "PUT",
                url: `http://localhost:3000/api/chirps/${id}`,
                data: { user, msg: editedMessage }
            })
                .then(() => {
                    $('#chirpsContainer').empty()
                    getAllChirps()
                })
                .catch(e => Swal.showValidationMessage(`Request failed ${e}`));
        }
    })
}

//get all chirps on page load
getAllChirps();
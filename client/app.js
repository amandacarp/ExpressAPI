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
                    <button onclick="editChirp(${chirp.id})" id="edit" class="btn-sm  a data-toggle="modal" href="#myModal">Edit Chirp</button>
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
        data: { user: user, msg: msg }
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
function editChirp(id) {
    $.ajax({
        method: "PUT",
        url: `http://localhost:3000/api/chirps/${id}`
    })
        .then((chirp) => {
            console.log(chirp)
            // $("#myModal").modal('show')
            // $('#chirpsContainer').empty()
            // getAllChirps();
        })
}

//get all chirps on page load
getAllChirps();
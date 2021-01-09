function getAllChirps() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/api/chirps",
    })
        .done((chirps) => {
            chirps.forEach(chirp => {
                $(`<div class="card  m-4 id=${chirp.id}" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${chirp.user}</h5>
              <p class="card-text">${chirp.msg}</p>
              <a onclick="editChirp(${chirp.id, chirp.user, chirp.msg})" class="card-link text-success">Edit Chirp</a>
              <a onclick="deleteChirp(${chirp.id})" class="card-link text-success">Delete Chirp</a>
            </div>
          </div>`).appendTo('#chirpsContainer')
            })
        })
}

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
    })
}

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

function editChirp(id){
    $.ajax({
        method: "PUT",
        url: `http://localhost:3000/api/chirps/${id}`
    })
    .then((chirp) => {
        console.log(chirp)
    })
}

getAllChirps();
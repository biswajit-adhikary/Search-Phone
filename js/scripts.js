// Function for get data
const getPhone = () => {
    // Get & Reset Search Value
    const searchInput = document.getElementById('form-search');
    const searchValue = searchInput.value;
    searchInput.value = '';

    const detailsDiv = document.getElementById('details-div');
    detailsDiv.innerHTML = '';

    // Error handling & get data
    const errorDiv = document.getElementById('error');
    const mainDiv = document.getElementById('main-div');
    if (searchValue == '') {
        errorDiv.innerHTML = `<p class="text-danger">Please write Phone name!</p>`;
        mainDiv.innerHTML = '';
    } else {
        // Show Spinner
        toggleSpinner('block');
        // Get Data From API
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data));
    }
}

// Function for display data
const displayPhone = phones => {
    const mainDiv = document.getElementById('main-div');
    mainDiv.textContent = '';
    // Error handling & display data
    const errorDiv = document.getElementById('error');
    if (phones.length == 0) {
        errorDiv.innerHTML = `<p class="text-danger">No phone found!</p>`;
        // Hide Spinner
        toggleSpinner('none');
    } else {
        errorDiv.innerHTML = ``;
        // Get first 20 data
        const phonList = phones.slice(0, 20);
        phonList.forEach(phone => {
            const newCol = document.createElement('div');
            newCol.classList.add('col-lg-4');
            newCol.innerHTML = `
                <div class="card mb-4 text-center">
                    <div class="card-image">
                        <img src="${phone.image}" class="card-img-top" alt="">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <p class="card-text">Brand: ${phone.brand}</p>
                        <button class="btn btn-primary" onclick="getDetails('${phone.slug}')">Details</button>
                    </div>
                </div>
            `;
            mainDiv.appendChild(newCol);
        })
        // Hide Spinner
        toggleSpinner('none');
    }

}

// Function for get details
const getDetails = id => {
    const detailsUrl = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(detailsUrl)
        .then(res => res.json())
        .then(data => showDetails(data.data));
}

// Function for display details
const showDetails = details => {
    const detailsDiv = document.getElementById('details-div');
    detailsDiv.innerHTML = `
        <div class="card mb-4">
            <div class="card-image text-center">
                <img src="${details.image}"class="card-img-top" alt="">
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">Name: ${details.name}</h5>
                <h6 class="card-text">Brand: ${details.brand}</h6>
                <p class="card-text">Release date: ${details.releaseDate ? details.releaseDate : 'No Date Found.'}</p>
            </div>
            <div class="card-details">
                <div class="details-text">
                    <h3>Main Features:</h3>
                    <p>
                        <b>Storage:</b> ${details.mainFeatures.storage ? details.mainFeatures.storage : 'No Date Found'} <br>
                        <b>Display Size:</b> ${details.mainFeatures.displaySize ? details.mainFeatures.displaySize : 'No Data Found'} <br>
                        <b>Chip Set:</b> ${details.mainFeatures.chipSet ? details.mainFeatures.chipSet : 'No Data Found'} <br>
                        <b>Memory:</b> ${details.mainFeatures.memory ? details.mainFeatures.memory : 'No Data Found'} <br>
                    </P>
                    <h3>Sensors</h3>
                    <p>
                        ${details.mainFeatures.sensors[0] ? details.mainFeatures.sensors[0] : ''} <br>
                        ${details.mainFeatures.sensors[1] ? details.mainFeatures.sensors[1] : ''} <br>
                        ${details.mainFeatures.sensors[2] ? details.mainFeatures.sensors[2] : ''} <br>
                        ${details.mainFeatures.sensors[3] ? details.mainFeatures.sensors[3] : ''} <br>
                        ${details.mainFeatures.sensors[4] ? details.mainFeatures.sensors[4] : ''} <br>
                        ${details.mainFeatures.sensors[5] ? details.mainFeatures.sensors[5] : ''} <br>
                        ${details.mainFeatures.sensors[6] ? details.mainFeatures.sensors[6] : ''} <br>
                    </P>
                </div>
            </div>
        </div>
    `;
}

// Add spinner
const toggleSpinner = style => {
    const spinDiv = document.getElementById('spinner');
    spinDiv.style.display = style;
}
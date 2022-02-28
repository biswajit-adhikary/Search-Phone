// Function for get data
const getPhone = () => {
    // Get & Reset Search Value
    const searchInput = document.getElementById('form-search');
    const searchValue = searchInput.value;
    searchInput.value = '';

    // Get Data From API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
}

// Function for display data
const displayPhone = phones => {
    const mainDiv = document.getElementById('main-div');
    // Reset value
    mainDiv.textContent = '';
    // Loop and show data
    phones.forEach(phone => {
        const newCol = document.createElement('div');
        newCol.classList.add('col-lg-4');
        newCol.innerHTML = `
            <div class="card mb-4 text-center">
                <div class="card-image">
                    <img src="${phone.image}" class="card-img-top" alt="">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button class="btn btn-primary">Details</button>
                </div>
            </div>
        `;
        mainDiv.appendChild(newCol);
    })
}
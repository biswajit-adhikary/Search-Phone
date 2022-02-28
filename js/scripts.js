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

const displayPhone = phones => {
    console.log(phones);
}
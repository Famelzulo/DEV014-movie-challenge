const filterByYear = () => {
    const filter = document.createElement('div')
    filter.classList.add('filter')
    filter.innerHTML = `
        <label for="releaseDate">Filter by year</label>
        <select name="releaseDate" id="releaseDate">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
        </select> 
    `
    return filter;
};

export default filterByYear;

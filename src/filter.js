

const selectByYear = () => {
    const select = document.createElement('select');
    select.setAttribute('id', 'selectByYear');
    select.innerHTML = `
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        `;
    return select;
};

export default selectByYear;



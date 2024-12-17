let form = document.forms[0];
let num1 = document.querySelector("input:first-of-type");
let num2 = document.querySelector("input:nth-of-type(2)");
let sumField = document.querySelector("td.sum");
let subField = document.querySelector("td.sub");
let multField = document.querySelector("td.mult");
let divField = document.querySelector("td.div");
let modField = document.querySelector("td.mod");
let sideButton = document.querySelector('.side button');
let overlay = document.querySelector('.overlay');
let itemsCon = document.querySelector('.items-con');

let values = JSON.parse(localStorage.getItem('values')) || [];
window.onload = showInSide;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    fillForm(+num1.value, +num2.value);

    values.push({
        id: values[Math.max((values.length - 1), 0)]?.id + 1 || 1,
        value: `${num1.value}_${num2.value}`
    });

    localStorage.setItem('values', JSON.stringify(values));

    showInSide()
});

function activeSide() {
    sideButton.parentElement.classList.toggle("active");
    overlay.classList.toggle('active');
}

function fillForm(n1, n2) {
    sumField.innerHTML = n1 + n2;
    subField.innerHTML = n1 - n2;
    multField.innerHTML = n1 * n2;
    divField.innerHTML = !n2 ? "! غير معرف" : Math.floor(n1 / n2);
    modField.innerHTML = !n2 ? "! غير معرف" : Math.round(n1 % n2);
}

function showInSide() {
    while (itemsCon.firstElementChild) {
        itemsCon.firstElementChild.remove();
    }
    for (const item of values) {
        let newItem = createItem(item.id, item.value);
        itemsCon.append(newItem);
    }
}

function createItem(id, value) {
    let [n1, n2] = value.split('_');
    let item = document.createElement('div');
    item.classList.add('item');
    item.id = id;
    let content = `
        <span class="num1">${n1}</span>
        <span class="num2">${n2}</span>
        <span onclick="removeItem(this)">x</span>`;
    item.innerHTML = content;
    item.addEventListener('click', () => retrieve(item));
    return item;
}

let removeCheck = false;

function removeItem(e) {
    let newValues = values.filter(item => item.id != e.parentElement.id)
    localStorage.setItem('values', JSON.stringify(newValues));
    values = newValues;
    showInSide();
    removeCheck = true;
}

function retrieve(e) {
    console.log('gg')
    if (!removeCheck) {
        let n1 = e.firstElementChild.innerHTML;
        let n2 = e.firstElementChild.nextElementSibling.innerHTML;
        num1.value = n1;
        num2.value = n2;
        fillForm(+n1, +n2);
        activeSide();
    } else {
        removeCheck = false;
    }
}
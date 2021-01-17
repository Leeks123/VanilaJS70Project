const main = document.getElementById('main')
const addUserBtn = document.getElementById('add_user')
const doubleBtn = document.getElementById('double')
const sortBtn = document.getElementById('sort')
const showMillionairesBtn = document.getElementById('show_millionaires')
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/',{
        "Access-Control-Allow-Origin." : 'http://localhost:5500/05DOMArrayMethods/'
    })
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random()*1000000)
    };

    addData(newUser)
}

function addData(obj) {
    data.push(obj);

    updateDOM();
}
function sortByRichest(){
    data = data.sort((a,b)=>b.money-a.money);
    updateDOM(data);
}
function doubleMoney(){
    data = data.map(user=>{
        return {...user,money:user.money*2}
    });
    updateDOM();
}

function filterByMillionares(){
    updateDOM(data.filter(i => i.money>1000000))
}
function calculateWealth(){
    const wealth = data.reduce((acc,user)=>(acc+=user.money),0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

function updateDOM(provideData=data){
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    provideData.forEach((user) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    })

}

function formatMoney(number) {
    return '$'+number.toLocaleString('en');
}

addUserBtn.addEventListener("click",getRandomUser);
sortBtn.addEventListener("click",sortByRichest);
doubleBtn.addEventListener("click",doubleMoney);
showMillionairesBtn.addEventListener("click",filterByMillionares);
calculateWealthBtn.addEventListener("click",calculateWealth)
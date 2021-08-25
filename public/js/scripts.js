/*!
* Start Bootstrap - Resume v7.0.2 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Stock Chart

let currentStock = '';

const form = document.getElementById('find-stock');
const buy = document.getElementById('buy');
const quantity = document.getElementById('quantity');

form.addEventListener('submit', e => {
    e.preventDefault();
    graphStock(new FormData(form).get('symbol').toUpperCase());
});

buy.addEventListener('click', async () => {
    const quantity = new FormData(form).get('quantity');
    if (quantity < 1) return alert('Must enter a valid quantity.');
    try {
        const res = await fetch(`/stocks/buy/${currentStock}/${quantity}`);
        const contentType = res.headers.get('content-type');
        if (contentType.indexOf('application/json') !== -1) {
            const j = await res.json();
            if (j.failure) return alert(j.failure);
        }
    } catch(err) {
        console.log(err);
    }
    location.reload();
});

const ctx = document.getElementById('stock-chart').getContext('2d');
const stockGraph = new Chart(ctx, {
    type: 'line'
});

async function graphStock(s) {
    const { symbol, times, prices } = await getData(s);
    currentStock = symbol;
    stockGraph.data.labels = times;
    stockGraph.data.datasets = [{
        label: s,
        data: prices,
        borderColor: '#90C0A0',
        backgroundColor: '#A0E0B0'
    }];
    stockGraph.update();
}

async function getData(symbol) {
    try {
        const res = await fetch(`/stocks?symbol=${symbol}`);
        return res.json();
    } catch (err) {
        console.log('Unable to obtain stock info.');
    }
}

// Dropdown and Price Check in Stock Modal

for (element of document.getElementsByClassName('stocks')) {
    const symbol = element.innerHTML;
    const price = document.getElementById(`${symbol}_price`);
    element.addEventListener('click', () => { getPrice(symbol, price) });
    const sellQuantity = document.getElementById(`${symbol}_sell_quantity`);
    createOptions(sellQuantity, document.getElementById(`${symbol}_quantity`).innerHTML);
    const sell = document.getElementById(`${symbol}_sell`);
    sell.addEventListener('click', () => { sellStock(symbol, sellQuantity.selectedOptions[0].value) });
}

async function getPrice(symbol, price) {
    const { prices } = await getData(symbol);
    price.innerHTML = Math.floor(prices[prices.length - 1] * 10) / 10;
}

function createOptions(select, quantity) {
    const n = parseInt(quantity, 10) + 1;
    for (let i = 1; i < n; i++) {
        const option = document.createElement('option');
        option.text = i;
        option.value = i;
        select.add(option, null);
    }
}

async function sellStock(symbol, quantity) {
    try {
        const res = await fetch(`/stocks/sell/${symbol}/${quantity}`);
        const contentType = res.headers.get('content-type');
        if (contentType.indexOf('application/json') !== -1) {
            const j = await res.json();
            if (j.failure) return alert(j.failure);
        }
    } catch (err) {
        console.log('Error while attempting to sell stocks.');
    }
    location.reload();
}

// Open PDF in new window

const openResume = event => window.open('/site/assets/resume.pdf', 'newwindow', 'width=900,height=1250');

document.getElementById('calvin-resume').addEventListener('click', openResume);

// Redirect to profile when logged in

onload = () => {
    if (document.getElementById('signedIn').innerHTML == 'true'
        && !/#stocks$/.test(window.location.href))
            window.location.replace(window.location.href + '#stocks');
};
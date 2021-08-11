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

const ctx = document.getElementById('stock-chart').getContext('2d');
async function graphStock() {
    const { symbol, times, prices } = await getData('F');
    const stockGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                data: prices,
                borderColor: '#90C0A0',
                backgroundColor: '#A0E0B0'
            }]
        }
    });
}

async function getData(symbol) {
    try {
        const res = await fetch(`${window.location.href}stocks?symbol=${symbol}`);
        console.log(res);
        return res.json();
    } catch (err) {
        console.log('Unable to obtain stock info.');
    }
}

// Open PDF in new window

const openResume = event => window.open('/site/assets/resume.pdf', 'newwindow', 'width=900,height=1250');

document.getElementById('calvin-resume').addEventListener('click', openResume);

// Redirect to profile when logged in

onload = () => {
    graphStock();
    if (document.getElementById('signedIn').innerHTML == 'true')
        window.location.replace(window.location.href + '#stocks');
};
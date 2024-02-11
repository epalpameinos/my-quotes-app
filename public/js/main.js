
const deleteBtn = document.querySelectorAll('.del');
const quoteOrange = document.querySelectorAll('article.green');
const quoteGreen = document.querySelectorAll('article.orange');


Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteQuote);
});

Array.from(quoteOrange).forEach((el) => {
    el.addEventListener('click', makeOrange);
});

Array.from(quoteGreen).forEach((el) => {
    el.addEventListener('click', makeGreen);
});

async function deleteQuote() {
    const quoteId = this.parentNode.dataset.id;
    try {
        const response = await fetch('quotes/deleteQuote', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'quoteIdFromJSFile': quoteId
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(error) {
        console.log(error);
    }
}

async function makeOrange() {
    const quoteId = this.dataset.id;
    try {
        const response = await fetch('quotes/makeOrange', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'quoteIdFromJSFile': quoteId
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(error) {
        console.log(error);
    }
}

async function makeGreen() {
    const quoteId = this.dataset.id;
    try {
        const response = await fetch('quotes/makeGreen', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'quoteIdFromJSFile': quoteId
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(error) {
        console.log(error);
    }
}



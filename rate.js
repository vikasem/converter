let input = document.querySelector('#input')
let result = document.querySelector('#result')
let selectHaving = document.querySelector('#havingmoney');
let selectGet = document.querySelector('#getmoney');
let rates = {};
console.log(selectGet)


getRate();

async function getRate(){
    let reply = await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    let jsObject = await reply.json();
    let result = await jsObject;

    for(let key in result.Valute) {
        let newOption = new Option(result.Valute[key].CharCode, result.Valute[key].CharCode)
        selectHaving.append(newOption)    
    }

    for(let key in result.Valute) {
        let newOption = new Option(result.Valute[key].CharCode, result.Valute[key].CharCode)
        selectGet.append(newOption)
        console.log(result.Valute[key].CharCode)
    }

    for(let key in result.Valute) {
        rates[key] = result.Valute[key]
       
    }
}

input.oninput = convertValute

selectHaving.oninput = convertValute

selectGet.oninput = convertValute

function convertValute() {
    if(selectHaving.value == selectGet.value) {
        result.value = input.value
    } else if (selectHaving.value == 'RUB') {
        result.value = (input.value / rates[selectGet.value].Value).toFixed(3)
    } else if (selectGet.value == 'RUB') {
        result.value = (input.value * rates[selectHaving.value].Value).toFixed(3)
    } else {
        result.value = (input.value * (rates[selectHaving.value].Value / rates[selectGet.value].Value)).toFixed(3);
    }
}
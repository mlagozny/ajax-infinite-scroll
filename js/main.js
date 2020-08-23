const getData = () => {
    if (!preloading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(response => response.json())
            .then(data => {

                let body = document.body;
                // utworzenie lini horyzontalnej i dodanie jej na końcu listy użytkowników
                let hr = document.createElement('hr');
                body.appendChild(hr);


                // pętla for of do wyświetlenia pobranych danych użytkowników
                for (let user of data) {
                    let id = document.createElement('p');
                    let userName = document.createElement('p');
                    let userUrl = document.createElement('p');

                    id.innerText = `User ID: ${user.id}`;
                    userName.innerText = `User Name: ${user.name}`;
                    userUrl.innerHTML = `User URL: ${user.website}<br />`;

                    body.appendChild(id);
                    body.appendChild(userName);
                    body.appendChild(userUrl);

                    hidePreloader();
                }
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            })
    }


}

// zmienna do podliczenia scrollowania
let endOfThePage = 0;

// "flaga" zmienna do zablokowania przed podwójnym załadowaniem danych 
let preloading = false;

// funcka wyświetlająca preloader
const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log('showPreloader()');
    preloader.style.display = 'block';
    preloading = true;
}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log('hidePreloader()');
    preloader.style.display = 'none';
    preloading = false;
}

const scroolToEndOfPage = () => {
    let d = document.documentElement;
    let scrollHeight = d.scrollHeight;
    let scrollTop = d.scrollTop;
    let clientHeight = d.clientHeight;

    // Funkcja Math.ceil zaokrągla ułamki w górę

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(sumScrollTopClientHeight)

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);

    if (sumScrollTopClientHeight >= scrollHeight) {

        endOfThePage += 1
        console.log(`Scroll to end of the page: ${endOfThePage}`);

        getData();
    }


    console.log(`dziła()`)
}

window.addEventListener('scroll', scroolToEndOfPage);
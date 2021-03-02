async function getData(url) {
    await fetch(url)
        .then(response => response.json())
        .then((data) => {
            for (let product of data.products) {
                const article = document.createElement('article');
                article.setAttribute('class', 'card');
                const html = 
                `<section class="card-image-container">
                    <img class="card-image" src="https:${product.image}" alt="Image">
                </section>
                <section class="card-content-container">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>De: R$${product.oldPrice}</p>
                    <p class="price">Por: R$${product.price}</p>
                    <p>ou ${product.installments.count}x de R$${product.installments.value}</p>
                    <button>Comprar</button>
                </section>`;
                article.innerHTML = html;
                document.querySelector('.card-container').appendChild(article);
            }
            endpoint = 'https://' + data.nextPage;
        });
}

let endpoint = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`;
getData(endpoint);

const btnMoreProducts = document.querySelector('#more-products');
btnMoreProducts.addEventListener('click', () => getData(endpoint));
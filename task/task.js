// Напишите код, который выводит на страницу список товаров с
// указанием к какой категории товар принадлежит.
// По адресу "https://danit.com.ua/products"
// вы можете получить список всех товаров.
// В качестве ответа вы получите массив объектов.
// В каждом объекте в поле "category" - id конкретной категории.

// По адресу "https://danit.com.ua/categories" - информация о всех категориях.

// Используйте async/await.
async function getListProducts(
  urlProducts = "https://danit.com.ua/products",
  urlCategory = "https://danit.com.ua/categories"
) {
  const response = await fetch(urlProducts);
  const productInfo = await response.json();
  console.log(productInfo);

  const response2 = await fetch(urlCategory);
  const categoriesInfo = await response2.json();
  console.log(categoriesInfo);

  const products = productInfo.map(product => {
    const category = categoriesInfo.find(
      category => category.id === product.category
    );
    // console.log(category);
    return {
      category: category.name,
      name: product.name
    };
  });
  console.log(products);

  const content = products
    .map(product => `<li>${product.category}: ${product.name}</li>`)
    .join("");
  const ulString = `<ul>${content}</ul>`;
  document.body.insertAdjacentHTML("afterbegin", ulString);
}

getListProducts();

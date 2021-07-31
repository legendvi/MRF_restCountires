"use strict";

const request = new XMLHttpRequest();

request.open("GET", "https://restcountries.eu/rest/v2/all", true);
request.send();

request.onload = function () {
  const data = JSON.parse(this.response);
  console.log(data);
  let body = document.body;
  //   console.log(data);
  for (let i = 0; i < 10; i++) body.innerText += ` ${data[i]["name"]}  `;
  const asiaCountires = data.filter((coun) => coun.region === "Asia");

  console.log("1. Name of all countires in Asia");
  asiaCountires.forEach((coun, i) => console.log(coun["name"]));

  console.log("2. Name of all countries with population less than 2 Lacs");

  const smallCounties = data.filter((coun) => coun.population < 200000);
  smallCounties.forEach((coun) => console.log(coun.name));

  const totalPopulation = data.reduce((accu, cur) => accu + cur.population, 0);
  console.log("3. Total Population of the world");
  console.log(totalPopulation);
  console.log("4. Counties Using USD as currency");
  const usd = data.filter((coun) => {
    for (let i in coun["currencies"]) {
      if (coun["currencies"][i].code === "USD") {
        return coun;
      }
    }
  });
  console.log(usd.length);
};

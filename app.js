import fetch from "node-fetch";

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      console.log('Fetching from cache', n);
      return cache[n];
    }
    else {
      console.log('Calculating result', n);
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
};

const fetchPokemons = async (API) => {
  const request = await fetch(API)
    .then(response => response.json())
    .then(data => {
      return data;
    }
  );
  return request
};

const memoizedFetchPokemons = memoize(fetchPokemons);
console.time("dbsave");
console.log('1)',
  await memoizedFetchPokemons('https://pokeapi.co/api/v2/pokemon/1/'),
  await memoizedFetchPokemons('https://pokeapi.co/api/v2/pokemon/2/'),
  await memoizedFetchPokemons('https://pokeapi.co/api/v2/pokemon/3/'));
console.timeEnd("dbsave");
console.time("dbsave");
console.log('2)',
  await memoizedFetchPokemons('https://pokeapi.co/api/v2/pokemon/1/'),
  await memoizedFetchPokemons('https://pokeapi.co/api/v2/pokemon/2/'),
  await memoizedFetchPokemons('https://pokeapi.co/api/v2/pokemon/3/'),
  await memoizedFetchPokemons('https://pokeapi.co/api/v2/pokemon/4/'));
console.timeEnd("dbsave");

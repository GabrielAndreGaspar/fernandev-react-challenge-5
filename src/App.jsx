import { useEffect, useState } from 'react';

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {
  const [pokemons, setPokemons] = useState([])
  const [count, setCount] = useState(0)
  const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon')

  const fetchPokemons = async (url = nextPage) => {
     const response = await fetch(url).then(data => data.json())

     return response
  }

  const sortPokemons = pokemons => {
     return pokemons.sort((a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
    })
  }

  const fetchPokemonData = async url => {
    const response = await fetch(url).then(data => data.json())

    return response
  }

  const handleFetchPokemons = () => {
    fetchPokemons().then(async response => {
      setCount(response.count)
      setNextPage(response.next)

      await Promise
        .all(response.results.map(async ({ url }) => await fetchPokemonData(url)))
        .then(sortPokemons)
        .then(data => setPokemons([...pokemons, ...data]))
    })
  }

  useEffect(() => {
    if (!count || pokemons.length < count) handleFetchPokemons()
  }, [pokemons])

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      {pokemons.map(pokemon => (
        <div key={pokemon.id} style={{ display: 'flex', alignItems: 'center'}}>
          <img src={pokemon.sprites.front_default}/>
          <h3 style={{ marginRight: '5px' }}>{pokemon.name}</h3>
           - EXP: {pokemon.base_experience}
        </div>
      ))}
    </>
  );
}

export default App;

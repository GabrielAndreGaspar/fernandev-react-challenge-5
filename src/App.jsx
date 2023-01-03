import { useEffect, useState } from 'react';
import { Pokemon } from './Pokemon';

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

  const sortByAsc = (a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
  }

  const handleFetchPokemons = (cleanUp) => {
    fetchPokemons().then(async response => {
      if (cleanUp.abort) return

      if (!count) setCount(response.count)
       
      setNextPage(response.next)
      setPokemons([...pokemons, ...response.results].sort(sortByAsc))
    })
  }

  useEffect(() => {
    const cleanUp = { abort: false }

    if (!count || pokemons.length < count) handleFetchPokemons(cleanUp)

    return () => (cleanUp.abort = true)
  }, [pokemons])

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      {pokemons.map((pokemon) => <Pokemon key={pokemon.url} data={pokemon}/>)}
    </>
  );
}

export default App;

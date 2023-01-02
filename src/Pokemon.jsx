import { useEffect, useState } from "react"

export const Pokemon = ({ data }) => {
    const [pokemon, setPokemon] = useState(null)

    const fetchPokemonData = async () => {
        const response = await fetch(data.url).then(data => data.json())
    
        return response
    }

    useEffect(() => {
        fetchPokemonData().then(setPokemon)
    }, [])

    if (!pokemon) return <></>

    return (
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <img src={pokemon.sprites.front_default}/>
            <h3 style={{ marginRight: '5px' }}>{pokemon.name}</h3>
            - EXP: {pokemon.base_experience}
        </div>
    )
}
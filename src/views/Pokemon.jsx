import { useState, useEffect } from "react";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState({});
  const [id, setId] = useState("");
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await response.json();

        const opcionesFromJson = data.results || [];
        setOpciones(
          opcionesFromJson.map((pokemon) => ({
            value: pokemon.name,
            label: pokemon.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id && mostrarTarjeta) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const data = await response.json();
          setPokemon(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [id, mostrarTarjeta]);

  const mostrarTarjetaHandler = () => {
    setMostrarTarjeta(true);
  };

  const handleChange = (event) => {
    const nuevoId = event.target.value;
    console.log("Nuevo ID:", nuevoId);
    setId(nuevoId);
  };

  return (
    <div className="container">
      {!mostrarTarjeta && (
        <div className="form">
          <h1>Selecciona a un Pokemon</h1>
          <select
            className=""
            type="text"
            placeholder="Choose a Pokemon"
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            {opciones.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
          <button onClick={mostrarTarjetaHandler}>Ver Detalles</button>
        </div>
      )}

      {mostrarTarjeta && (
        <div className="card">
          <div className="img-pokemon-container">
            <img
              className="img-pokemon"
              src={pokemon.sprites?.front_default}
              alt=""
            />
          </div>
          <div className="info-pokemon">
            <h3 className="name">{pokemon.name}</h3>
            <ul>
              {pokemon.stats &&
                pokemon.stats.map((stat) => (
                  <li
                    key={stat.stat.name}
                  >{`${stat.stat.name}: ${stat.base_stat}`}</li>
                ))}
            </ul>
            <div className="type">
                {pokemon.types &&
                  pokemon.types.map((type) => (
                    <button className={`type-button ${type.type.name}`} key={type.type.name}>{type.type.name}</button>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

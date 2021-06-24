import Head from "next/head";
import styles from "../styles/Home.module.css";
import styleModal from '../styles/Modal.module.css'
import Link from "next/link";
import { GetServerSideProps } from 'next';
import { useState, useEffect } from "react";
import { PropsPokemon } from '../interfaces/PropsPokemon'
import { PokemonResult } from "../interfaces/PokemonResult";
import { PokemonData } from '../interfaces/PokemonData';
import { PokeTypes } from '../interfaces/PokeTypes';
import { PokemonType } from '../types';
import Modal from '../components/Modal'

const Home = (props: PropsPokemon) => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [pokemonId, setPokemonId] = useState(0)
  const [pokemones, setPokemones] = useState([{
    height: 0,
    name: '',
    weight: 0,
    order: 0,
    id: 0,
    types: [],
    sprites: {
      back_default: "",
      back_shiny: "",
      front_default: "",
      front_shiny: "",
    },
  }]);
  const [selectPoke, setSelectPoke] = useState({
    height: 0,
    id: 0,
    name: "",
    order: 0,
    sprites: {
      back_default: "",
      back_shiny: "",
      front_default: "",
      front_shiny: "",
    },
    types: [

    ],
    weight: 0,
  });

  const [gState, setGState] = useState({
    next: "",
    previous: "",
    data: {
      results: [],
    },
  })


  const getPokemonData = async (pokemones: PokemonResult[]) => {
    try {
      const newPokemons = await Promise.all(pokemones.map(async (pokemon: PokemonResult) => {
        const getPokemon = await fetch(pokemon.url);
        const obj = await getPokemon.json();
        return obj
      }));

      console.log('NEW ->', newPokemons);

      setPokemones(newPokemons);
    } catch (error) {
      console.error('Get Pokemon Data Error ->', error)
    }
  }

  useEffect(() => {
    getPokemonData(props.pokemones.results);
    setGState({
      ...gState,
      next: props.pokemones.next
    })
  }, [])

  console.log('pokemones del estado', pokemones)

  const searchPokemon = () => {
    setPokemones(pokemones.filter((pokemon: any) => hasNameOrId(search, pokemon)))
  }

  /**
   * @name checkType
   * @description check the pokemon type and return the type color
   * @param {Enum} pokemonType the current pokemon type
   */
  const checkType = (pokemonType: PokemonType) => {
    switch (pokemonType) {
      case PokemonType.FIRE:
        return "#FF8C00"
      case PokemonType.GRASS:
        return "#32CD32"
      case PokemonType.BUG:
        return "#6B8E23"
      case PokemonType.DARK:
        return "#2F4F4F"
      case PokemonType.DRAGON:
        return "#6A5ACD"
      case PokemonType.ELECTRIC:
        return "#FFD700"
      case PokemonType.FAIRY:
        return "#ff88ee"
      case PokemonType.FIGHTING:
        return "#B22222"
      case PokemonType.FLYING:
        return "#6495ED"
      case PokemonType.GHOST:
        return "#4B0082"
      case PokemonType.GROUND:
        return "#DEB887"
      case PokemonType.ICE:
        return "#7FFFD4"
      case PokemonType.NORMAL:
        return "#E6E6FA"
      case PokemonType.POISON:
        return "#BA55D3"
      case PokemonType.PSYCHIC:
        return "#EE82EE"
      case PokemonType.ROCK:
        return "#CD853F"
      case PokemonType.SHADOW:
        return "#000000"
      case PokemonType.STEEL:
        return "#C0C0C0"
      case PokemonType.UNKNOWN:
        return ""
      case PokemonType.WATER:
        return "#7B68EE"
      default:
        return ""
    }
  }

  /**
   * @name hasNameOrId
   * @description search a pokemon with the name or id
   * @param {String} search current search state
   * @param {PokemonData} pokemon the current pokemon data
   */
  const hasNameOrId = (search: string, pokemon: PokemonData) => {
    const isNumber = +search;

    if (isNaN(isNumber)) {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
    } else {
      return pokemon.id === isNumber;
    }
  }

  const fetchMoreCharacters = async () => {
    try {
      const response = await fetch(`${gState.next}`);
      const data = await response.json();

      console.log(data, gState.next)

      /*    setState({
           data: {
             info: data.info,
             results: [].concat(state.data.results, data.results),
           },
          }); */
    } catch (error) {
      return error
    }
  };

  /**
   * @name selectPokemon
   * @description set the selected pokemon into the state
   * @param {Number} id pokemon id
   */
  const selectPokemon = (id: number) => {
    setSelectPoke(pokemones.find((pokemon: any) => pokemon.id == id) || selectPoke);
  }


  /*   const buttonCharacters = () => {
      if (this.state.nextPage <= 34) {
        return (
          <button
            className={styles.buttonFetch}
            onClick={() => this.fetchCharacters()}
          >
            Ver mas personajes
          </button>
        );
      }
    };  */

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={show == false ? styles.menu : styles.menuShow}>
        <div>
          <img className={styles.logo} src="/logo.png" alt="Logo pokemon" />
          <img className={styles.avatar} src="/avatar.png" alt="Avatar" />
          <h2 className={styles.avatarName}>ASHK123</h2>
          <p className={styles.level}>Level 1</p>
          <Link href="/">
            <a className={styles.logout}>
              <img src="/Logout.svg" alt="" />
              <h4>LOG OUT</h4>
            </a>
          </Link>
        </div>
      </div>
      <Modal showModal={showModal}>
        <button type='button' onClick={() => {
          setShowModal(!showModal);
        }}></button>
        <div className={styleModal.container}>
          <div className={styleModal.cardImg}>
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${selectPoke.id}.png`} alt="Pokemon Image" />
            <div>
              <img src={selectPoke.sprites.front_default} alt="" />
              <img src={selectPoke.sprites.back_default} alt="" />
            </div>
          </div>
          <div className={styleModal.dataPoke}>
            <h1>{selectPoke.name}</h1>
            {selectPoke.types.map((pokeType: PokeTypes) => (<h3 className={styles.typeColor} style={{ backgroundColor: checkType(pokeType.type.name as PokemonType) }} >
              {pokeType.type.name}
            </h3>))}
            <div>
              <h3>Pokedex Number</h3>
              <p>{selectPoke.id}</p>
            </div>
            <div>
              <h3>Height</h3>
              <p>{selectPoke.height}</p>
            </div>
            <div>
              <h3>Weight</h3>
              <p>{selectPoke.weight}</p>
            </div>
            <div>
              <h3>Shiny</h3>
              <div>
                <img src={selectPoke.sprites.front_shiny} alt="" />
                <img src={selectPoke.sprites.back_shiny} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <main className={styles.main}>
        <div className={styles.burgerMenu}>
          <i></i>
          <i className={styles.imgBurger} onClick={() => {
            setShow(!show)
          }}></i>
          <img className={styles.logoHeader} src="/logo.png" alt="Logo Pokemon" />
          <i></i>
        </div>
        <div className={styles.inputSearch}>
          <input type="text" placeholder="Search" value={search} onChange={({ target }) => setSearch(target.value)} />
          <button type="button" onClick={searchPokemon} >
            <img src="/Search.svg" alt="" />
          </button>
        </div>
        <div className={styles.containerPokemon} >
          {pokemones.map((result: any) => {
            return (
              <div key={result.id} className={styles.cardPokemon} onClick={() => {
                setShowModal(!showModal);
                selectPokemon(result.id)
              }}>
                <div>
                  <h2>{result.name}</h2>
                  <p>{result.id}</p>
                  <img src={`https://pokeres.bastionbot.org/images/pokemon/${result.id}.png`} alt="Pokemon img" />
                  <div className={styles.containerTypes}>
                    {result.types.map((pokeType: PokeTypes) => (<h3 className={styles.typeColor} style={{ backgroundColor: checkType(pokeType.type.name as PokemonType) }} >
                      {pokeType.type.name}
                    </h3>))}
                  </div>
                </div>
              </div>)
          })}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pokemones: data,
    },
  };
}

export default Home;

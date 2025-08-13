"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button"
import { Heart, Search } from 'lucide-react';
import Gamecard from "./mycomponents/gamecard";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const [results, setResults] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [activePage, setActivePage] = useState("allGames")
  const [favourites, setFavourites] = useState([])
  const [fetchedFavourites, setFetchedFavourites] = useState([])
  const isFirstRender = useRef(true);



  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("favouritegames", JSON.stringify(favourites));
    // console.log("Favs Updated");
    // console.log(favourites);
  }, [favourites])



  useEffect(() => {
    const localFavourites = JSON.parse(localStorage.getItem("favouritegames"));
    if (localFavourites === null) {
      setFavourites([])
    }
    else {
      setFavourites(localFavourites);
      // console.log("Favs Loaded!");
    }
    // console.log("API is", apiKey);
  }, [])


  const handleClick = (e) => {
    if (e.target.id === "allGames") {
      setActivePage("allGames")
    }
    if (e.target.id === "favourites") {
      setActivePage("favourites");
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.trim() !== "") {
        searchGames(searchValue);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchValue]);


  const handleInput = (e) => {
    setSearchValue(e.target.value);
    searchGames(e.target.value);
  }


  async function searchGames(query) {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?search=${query}&key=${apiKey}`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching game:", error);
    }
  }
  async function fetchFavourites() {
    const updatedFavourites = await Promise.all(
      favourites.map(async (favID) => {
        try {
          const response = await fetch(
            `https://api.rawg.io/api/games/${favID}?key=${apiKey}`
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching game:", error);
        }
      })
    )
    setFetchedFavourites(updatedFavourites);
    // console.log(updatedFavourites);
    // console.log(updatedFavourites[0].parent_platforms[0].platform.name);

  }






  return (
    <div className="canvas  flex justify-center py-10 bg-[#232946] min-w-screen min-h-screen">
      <div className="app-wrapper text-white w-[70%] max-sm:w-[90%]">
        <header className="flex flex-col gap-10">
          <div className="first-row">
            <h1 className="text-white  text-8xl max-md:text-6xl max-sm:text-6xl font-extrabold">Next Pixel</h1>
            <h2 className="text-white  text-3xl font-semibold">Game Finder and DB</h2>
          </div>
          <div className="secondrow  flex ml-auto w-[500px] max-md:w-full gap-2">
            <Button id="favourites" className={activePage == "favourites" && "bg-[#455089]  text-white hover:bg-[#5e668b]"} onClick={(e) => { handleClick(e); fetchFavourites() }}>
              Favourites<Heart className={activePage == "favourites" && "fill-white"} />
            </Button>
            <Button id="allGames" className={activePage == "allGames" && "bg-[#455089]  text-white hover:bg-[#5e668b]"} onClick={handleClick}>
              All <Search className={activePage == "favourites" && "fill-white"} />
            </Button>
            <div className={`input-wrapper rounded-sm bg-white relative  w-full flex items-center justify-center transition-all duration-300 ease-in-out ${activePage === "favourites" && "bg-zinc-400 hover:cursor-not-allowed"}`}>
              <input type="text" name="search" id="search" className={`text-black pr-10 w-full  outline-none px-3 `} placeholder={activePage === "favourites" ? "Switch to the all tab to search" : "Search"} onChange={handleInput} value={searchValue} disabled={activePage === "favourites"} />
              <Search className="absolute text-[#8C8C8C] right-3 pointer-events-none" />
            </div>
          </div>
        </header>
        <div className="grid-wrapper   w-full flex items-center justify-center flex-wrap gap-y-5 gap-x-7 mt-5">
          {
            activePage == "allGames" && (
              results?.length > 0 ? (
                results?.map(result => (
                  <Gamecard key={result.id} platforms={result.parent_platforms} favourites={favourites} setFavourites={setFavourites} gameID={result.id} name={result.name} image={result.background_image} released={result.released} rating={result.rating} maturity={result.esrb_rating?.name ?? "none "} />
                ))
              ) : (
                <div className="text-zinc-500 mt-[20%]">No games yet, start by searching</div>
              )
            )
          }
          {
            activePage == "favourites" && (
              fetchedFavourites?.length > 0 ? (
                fetchedFavourites?.map(result => (
                  <Gamecard key={result.id} platforms={result.parent_platforms} favourites={favourites} setFavourites={setFavourites} gameID={result.id} name={result.name} image={result.background_image} released={result.released} rating={result.rating} maturity={result.esrb_rating?.name ?? "none "} />
                ))
              ) : (
                <div className="text-zinc-500 mt-[20%]">No games yet, start by searching</div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

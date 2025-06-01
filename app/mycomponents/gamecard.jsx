import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GameBadge from './gamebadge';


const Gamecard = (props) => {

    const [releaseDate, setReleaseDate] = useState("");
    const [publishers, setPublishers] = useState([])
    const [tempresults, setTempResults] = useState("")
    const [isFavourite, setIsFavourite] = useState(false)
    const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;


    useEffect(() => {
        const dateString = props.released;
        const date = new Date(dateString);
        const readable = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        setReleaseDate(readable);
    }, [])

    useEffect(() => {
        if (props.favourites.includes(props.gameID)) {
            setIsFavourite(true);
        }
    }, [])


    useEffect(() => {
        async function getPublishers() {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games/${props.gameID}?key=${apiKey}`
                );
                const data = await response.json();
                setPublishers(data.publishers[0].name === undefined ? "" : data.publishers[0].name)
                setTempResults(data)
            } catch (error) {
                console.error("Error fetching developer:", error);
            }
        }
        getPublishers();
    }, [])

    const handleFavourite = () => {
        if (props.favourites.includes(props.gameID)) {

            const updated = props.favourites.filter(fav => fav !== props.gameID)
            props.setFavourites(updated);
            setIsFavourite(false);
        }
        else {
            props.setFavourites([...props.favourites, props.gameID])
            setIsFavourite(true);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="card-wrapper  hover:cursor-pointer border-2 border-black pb-5 rounded-2xl  bg-white min-w-[270px] flex-1 hover:scale-105 min-h-60 flex flex-col overflow-hidden transition-all hover:shadow-lg shadow-[#455089]">
                    <div className="cover-wrapper h-40 overflow-hidden">
                        <img src={props.image} alt="game image" className='object-cover' />
                    </div>
                    <div className="info-wrapper  gap-4 px-3 py-5 flex flex-col flex-grow">
                        <div className="text-rapper  text-black">
                            <h1 className='text-2xl font-bold'>{props.name}</h1>
                            <span className='flex gap-1'>
                                <h2>{publishers == "" ? "" : `${publishers}`}</h2>
                            </span>
                        </div>
                        <div className="badges flex items-center mt-auto text-black ">
                            {/* <h3>Xbox,Switch,PC</h3> */}
                            <GameBadge platforms={props.platforms} />
                            {/* ${isFavourite ? "border"} */}
                            <Button  size="icon" className={`group size-6 ml-auto border-2 border-black`} onClick={(e)=>{e.stopPropagation(); handleFavourite();}}>
                                <Heart className={`  ${isFavourite? "fill-red-600 group-hover:fill-red-400": "fill-none group-hover:fill-black"}`}/>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className={"min-w-[60vw] rounded-2xl flex max-lg:flex-col gap-9 p-10 bg-[#232946]"}>
                <div className="image w-[100%]">
                    <img className='rounded-2xl border-2 border-black' src={props.image} alt="game-image" />
                </div>
                <div className="info mt-3 w-full">
                    <DialogHeader>
                        <DialogTitle className={"text-6xl font-bold"}>{props.name}</DialogTitle>
                        <DialogDescription className={"flex  justify-center text-white mt-2 flex-col gap-5"}>
                            <span> {publishers == "" ? "" : `${publishers} •`}  {releaseDate} &bull; Rated: {props.maturity}</span>
                            <span>{props.rating == "0" ? "none" : `Rating: ${props.rating}/5 ⭐`}</span>
                            <Button className={`w-[220px] ${isFavourite && "bg-[#455089]  text-white hover:bg-[#5e668b]"}`} onClick={handleFavourite}>
                                {isFavourite ? "Remove from Favourites" : "Add to Favourites"}<Heart className={isFavourite && "fill-white"} />
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog >

    )
}

export default Gamecard
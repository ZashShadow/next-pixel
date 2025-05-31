import React from 'react'
import { useState, useEffect } from 'react'

const GameBadge = (props) => {
    const [platformNames, setPlatformNames] = useState([])
    useEffect(() => {
        // console.log("Platforms are",props.platforms);
        
        const names = props.platforms.map((platforms)=>{
            return platforms.platform.name;
        })
        // console.log(props.platforms.platform.name, props.platforms.platform.id);
        setPlatformNames(names)
        
    }, [])
    // useEffect(() => {
    //     console.log("Platform IDs Are",platformNames);
    // }, [platformNames])
    
    
    return (
        <span className='flex gap-1.5'>
            {platformNames.includes("PC") && <span className='relative'><img src="/pc.png" alt="badge" className="size-6 border-2 border-black rounded-sm object-cover"/></span>}
            {platformNames.includes("Nintendo") && <span className='relative'><img src="/nintendo.jpg" alt="badge" className="size-6 border-2 border-black rounded-sm object-cover"/></span>}
            {platformNames.includes("PlayStation") && <span className='relative'><img src="/ps.webp" alt="badge" className="size-6 border-2 border-black rounded-sm object-cover"/></span>}
            {platformNames.includes("Xbox") && <span className='relative'><img src="/xbox.webp" alt="badge" className="size-6 border-2 border-black rounded-sm object-cover"/></span>}
        </span>
    )
}

export default GameBadge
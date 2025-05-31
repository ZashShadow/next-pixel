import React from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Gamemodal = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className={"min-w-[60vw] rounded-2xl flex gap-9 p-10 bg-[#232946]"}>
        <div className="image w-[100%]">
          <img className='rounded-2xl border-2 border-black' src="https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg" alt="game-image" />
        </div>
        <div className="info mt-3 w-full">
          <DialogHeader>
            <DialogTitle className={"text-6xl font-bold"}>Elden Ring</DialogTitle>
            <DialogDescription className={"flex  justify-center text-white mt-2 flex-col gap-5"}>
              <span><h2>Bandai Namco &bull; Aug 27, 2019 &bull; Rated:M</h2></span>
              <span>Rating: 4/5 ⭐</span>
              <Button className={"w-[180px]"}>
                Add to Favourites<Heart />
              </Button>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default Gamemodal
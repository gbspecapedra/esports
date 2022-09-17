import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import { useEffect, useState } from "react";
import logoImg from "./assets/logo.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import { GameBanner } from "./components/GameBanner";
import { Game } from "./models";

import "./styles/main.css";

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then(({ data }) => {
      setGames(data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return <GameBanner key={game.id} game={game} />;
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;

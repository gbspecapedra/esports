import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { styled } from "@stitches/react";
import { CaretDown, Check, GameController } from "phosphor-react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { Input } from "../components/Form";
import { Game } from "../models";
import { api } from "../services/api";

const StyledTrigger = styled(Select.Trigger, {
  "&[data-placeholder]": {
    color: "rgb(113 113 122 / 1)",
  },
});

export function CreateAdModal() {
  const [games, setGames] = useState<Pick<Game, "id" | "title">[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    api.get("/games").then(({ data }) => {
      setGames(data);
    });
  }, []);

  const handCreateAd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) return;

    try {
      await api.post(`/games/${data.game}/ads`, {
        ...data,
        yearsPlaying: Number(data.yearsPlaying),
        weekDays: weekDays.map(Number),
        useVoiceChannel: data.useVoiceChannel === "on" ? true : false,
      });

      alert("Created succesfully!");
    } catch (error) {
      alert("Error!");
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black text-zinc-500">
          Publique um anúncio
        </Dialog.Title>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handCreateAd}>
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root name="gameId">
              <StyledTrigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between items-center">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </StyledTrigger>

              <Select.Portal>
                <Select.Content className="bg-zinc-900 py-3 px-4 rounded text-sm text-white">
                  <Select.Viewport>
                    {games.map(({ id, title }) => (
                      <Fragment key={id}>
                        <Select.Item
                          value={id}
                          className="flex justify-between items-center cursor-pointer"
                        >
                          <Select.ItemText>{title}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check className="w-4 h-4 text-emerald-400" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Separator className="m-2" />
                      </Fragment>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              name="useVoiceChannel"
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

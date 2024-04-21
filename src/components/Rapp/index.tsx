// Colocar o siste no ar

// Não repetir até ter passado por todos
// Conseguir pausar ou recomeçar
// Permitir configurar o tempo
// Bugs quando clica em parar

import { useEffect, useState } from "react";
import boombap from "../../assets/sounds/boom_bap.mp3";
import detroit from "../../assets/sounds/detroit.mp3";
import grime from "../../assets/sounds/grime.mp3";
import trap from "../../assets/sounds/trap.mp3";
import "./style.css";

const detroitAudio = new Audio(detroit);
const trapAudio = new Audio(trap);
const boombapAudio = new Audio(boombap);
const grimeAudio = new Audio(grime);

const beats = [
    ["Detroit", detroitAudio],
    ["Boom bap", boombapAudio],
    ["Grime", grimeAudio],
    ["Trap", trapAudio],
];

export default function Rapp() {
    const [number, setNumber] = useState(5);
    const [comecou, setComecou] = useState(false);
    const [beatSelecionado, setBeatSelecionado] = useState("");
    const [beat, setBeat] = useState<HTMLAudioElement>();
    const [palavras, setPalavras] = useState<string[]>([]);
    const [palavraAtual, setPalavraAtual] = useState("");

    useEffect(() => {
        if (comecou) {
            const interval2 = setInterval(() => {
                number > 1 ? setNumber(() => number - 1) : setNumber(() => 5);
            }, 1000);
            return () => clearInterval(interval2);
        }
    }, [comecou, number]);

    useEffect(() => {
        if (comecou) {
            const interval = setInterval(() => {
                const indiceAleatorio = Math.floor(Math.random() * palavras.length);
                setPalavraAtual(palavras[indiceAleatorio]);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [comecou, palavras]);

    const selecionarBeat = (beat: HTMLAudioElement) => {
            setBeat(beat);
    };

    const controlarBotao = () => {
        if (comecou) {
            parar();
        } else {
            startPlay();
        }
    };

    const startPlay = () => {
        if (beat) {
            setComecou(true);
            beat?.play();
        } else {
            alert("O beat não foi selecionado!")
        }
    };

    const parar = () => {
        setComecou(false);
        beat?.pause();
    };

    const quebraPalavras = (palavras: string) => {
        const palavrasQuebradas = palavras.split("\n");
        console.log(palavrasQuebradas);
        return palavrasQuebradas;
    };

    const botaoBeatSelecionado = (beat: any[]) => {
        if (!comecou) {
            selecionarBeat(beat[1])
            setBeatSelecionado(beat[0])
        }
    }

    const adicionarTexto = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!comecou) {
            setPalavras(quebraPalavras(e.target.value))
        }
    }

    return (
        <main>
            <div className="coluna_esquerda">
                <div className="beat">
                    <ul>
                        {beats.map((beat: any[], index: number) => (
                            <li key={index}>
                                <button onClick={() => botaoBeatSelecionado(beat)} className={`botao ${beat[0] == beatSelecionado ? "botao_selecionado" : ""}`}>{beat[0]}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="palavras">
                    <textarea
                        className="input_palavras"
                        name="palavras"
                        id="palavras"
                        placeholder="Insira as palavras"
                        cols={20}
                        rows={10}
                        onChange={(e) => adicionarTexto(e)}
                        value={palavras.join("\n")}
                    ></textarea>
                </div>
            </div>
            <div className="coluna_direita">
                <button onClick={() => controlarBotao()} className={`botao ${!comecou ? "botao_comecar" : "botao_parar"}`}>{comecou ? "Parar" : "Começar!"}</button>
                {/* <svg width="200" height="200" viewBox="-25 -25 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" className="circuloInterno">
                            <circle r="90" cx="100" cy="100" fill="transparent" stroke="#e0e0e0" strokeWidth="16px" strokeDasharray="565.48px" strokeDashoffset="0"></circle>
                            <circle r="90" cx="100" cy="100" stroke="#767de5" strokeWidth="16px" strokeLinecap="round" strokeDashoffset={`${count}px`} fill="transparent" strokeDasharray="565.48px"></circle>
                            <text x="72px" y="118px" fill="#008f4c" fontSize="53px" fontWeight="bold" className="numero">{number}</text>
                        </svg> */}
                <div className="container_palavra_selecionada">
                    <span className="contador">
                        {number}
                    </span>
                    <p className="palavra_selecionada">
                        {palavraAtual}
                    </p>
                </div>
            </div>
        </main>
    );
}

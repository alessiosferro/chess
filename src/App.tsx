import './App.css';
import {useCallback, useEffect, useRef, useState} from "react";
import lightPawnImage from './assets/light-pawn.svg';
import darkPawnImage from './assets/dark-pawn.svg';

import lightBishopImage from './assets/light-bishop.svg';
import darkBishopImage from './assets/dark-bishop.svg';


import lightKnightImage from './assets/light-knight.svg';
import darkKnightImage from './assets/dark-knight.svg';


import lightTowerImage from './assets/light-tower.svg';
import darkTowerImage from './assets/dark-tower.svg';

import lightKingImage from './assets/light-king.svg';
import darkKingImage from './assets/dark-king.svg';

import lightQueenImage from './assets/light-queen.svg';
import darkQueenImage from './assets/dark-queen.svg';



let chessboard: {
    name: 'tower' | 'bishop' | 'knight' | 'pawn' | 'queen' | 'king' | 'EMPTY';
    player: 'white' | 'black' | ''
}[][] = [
    [
        {
            name: 'tower',
            player: 'white'
        },
        {
            name: 'knight',
            player: 'white'
        },
        {
            name: 'bishop',
            player: 'white'
        },
        {
            name: 'queen',
            player: 'white'
        },
        {
            name: 'king',
            player: 'white'
        },
        {
            name: 'bishop',
            player: 'white',
        },
        {
            name: 'knight',
            player: 'white',
        },
        {
            name: 'tower',
            player: 'white',
        }
    ],
    [
        {
            name: 'pawn',
            player: 'white',
        },
        {
            name: 'pawn',
            player: 'white',
        },
        {
            name: 'pawn',
            player: 'white',
        },
        {
            name: 'pawn',
            player: 'white',
        },
        {
            name: 'pawn',
            player: 'white',
        },
        {
            name: 'pawn',
            player: 'white',
        },
        {
            name: 'pawn',
            player: 'white',
        },
        {
            name: 'pawn',
            player: 'white',
        }
    ],
    [
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        }
    ],
    [
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        }
    ],
    [
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        }
    ],
    [
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        },
        {
            player: '',
            name: 'EMPTY',
        }
    ],
    [
        {
            name: 'pawn',
            player: 'black',
        },
        {
            name: 'pawn',
            player: 'black',
        },
        {
            name: 'pawn',
            player: 'black',
        },
        {
            name: 'pawn',
            player: 'black',
        },
        {
            name: 'pawn',
            player: 'black',
        },
        {
            name: 'pawn',
            player: 'black',
        },
        {
            name: 'pawn',
            player: 'black',
        },
        {
            name: 'pawn',
            player: 'black',
        }
    ],
    [
        {
            name: 'tower',
            player: 'black'
        },
        {
            name: 'knight',
            player: 'black'
        },
        {
            name: 'bishop',
            player: 'black'
        },
        {
            name: 'queen',
            player: 'black'
        },
        {
            name: 'king',
            player: 'black'
        },
        {
            name: 'bishop',
            player: 'black',
        },
        {
            name: 'knight',
            player: 'black',
        },
        {
            name: 'tower',
            player: 'black',
        }
    ]
]

function App() {
    const [context2d, setContext2d] = useState<CanvasRenderingContext2D | null>(null);

    const lightPawnRef = useRef<HTMLImageElement>(null);
    const lightTowerRef = useRef<HTMLImageElement>(null);
    const lightQueenRef = useRef<HTMLImageElement>(null);
    const lightKingRef = useRef<HTMLImageElement>(null);
    const lightBishopRef = useRef<HTMLImageElement>(null);
    const lightKnightRef = useRef<HTMLImageElement>(null);

    const darkPawnRef = useRef<HTMLImageElement>(null);
    const darkTowerRef = useRef<HTMLImageElement>(null);
    const darkQueenRef = useRef<HTMLImageElement>(null);
    const darkKingRef = useRef<HTMLImageElement>(null);
    const darkBishopRef = useRef<HTMLImageElement>(null);
    const darkKnightRef = useRef<HTMLImageElement>(null);

    const gameLoop = useCallback(() => {
        if (!context2d) return;

        context2d.clearRect(0, 0, 800, 800);

        drawChessBoard(context2d);

        drawPlayers(context2d, {
            lightPawn: lightPawnRef.current as HTMLImageElement,
            lightTower: lightTowerRef.current as HTMLImageElement,
            lightBishop: lightBishopRef.current as HTMLImageElement,
            lightKnight: lightKnightRef.current as HTMLImageElement,
            lightKing: lightKingRef.current as HTMLImageElement,
            lightQueen: lightQueenRef.current as HTMLImageElement,
            darkPawn: darkPawnRef.current as HTMLImageElement,
            darkTower: darkTowerRef.current as HTMLImageElement,
            darkBishop: darkBishopRef.current as HTMLImageElement,
            darkKnight: darkKnightRef.current as HTMLImageElement,
            darkKing: darkKingRef.current as HTMLImageElement,
            darkQueen: darkQueenRef.current as HTMLImageElement
        });

        requestAnimationFrame(gameLoop);
    }, [context2d]);

    useEffect(() => {
        gameLoop();
    }, [gameLoop]);

    return (
        <main className="main-container">
            <canvas ref={el => el && setContext2d(el.getContext('2d') as CanvasRenderingContext2D)}
                    className="chessboard-canvas" height={800} width={800}/>

            <img hidden ref={lightPawnRef} width={100} height={100} src={lightPawnImage} alt=""/>
            <img hidden ref={darkPawnRef} width={100} height={100} src={darkPawnImage} alt=""/>

            <img hidden ref={lightTowerRef} width={100} height={100} src={lightTowerImage} alt=""/>
            <img hidden ref={darkTowerRef} width={100} height={100} src={darkTowerImage} alt=""/>

            <img hidden ref={lightBishopRef} width={100} height={100} src={lightBishopImage} alt=""/>
            <img hidden ref={darkBishopRef} width={100} height={100} src={darkBishopImage} alt=""/>

            <img hidden ref={lightKnightRef} width={100} height={100} src={lightKnightImage} alt=""/>
            <img hidden ref={darkKnightRef} width={100} height={100} src={darkKnightImage} alt=""/>

            <img hidden ref={lightQueenRef} width={100} height={100} src={lightQueenImage} alt=""/>
            <img hidden ref={darkQueenRef} width={100} height={100} src={darkQueenImage} alt=""/>

            <img hidden ref={lightKingRef} width={100} height={100} src={lightKingImage} alt=""/>
            <img hidden ref={darkKingRef} width={100} height={100} src={darkKingImage} alt=""/>
        </main>
    )
}

type Player = 'white' | 'black';

type Pieces = {
    darkPawn: HTMLImageElement;
    darkKnight: HTMLImageElement;
    darkTower: HTMLImageElement;
    darkBishop: HTMLImageElement;
    darkKing: HTMLImageElement;
    darkQueen: HTMLImageElement
    lightPawn: HTMLImageElement;
    lightKnight: HTMLImageElement;
    lightTower: HTMLImageElement;
    lightBishop: HTMLImageElement;
    lightKing: HTMLImageElement;
    lightQueen: HTMLImageElement
}

function drawPlayers(context2d: CanvasRenderingContext2D, metadata: Pieces) {
    const {
        lightPawn,
        darkPawn,
        lightQueen,
        darkKing,
        darkKnight,
        darkQueen,
        darkTower,
        lightBishop,
        lightKing,
        darkBishop,
        lightTower,
        lightKnight
    } = metadata;

    const pieceImageMap = {
        pawn: (player: Player) => player === 'white' ? lightPawn : darkPawn,
        knight: (player: Player) => player === 'white' ? lightKnight : darkKnight,
        bishop: (player: Player) => player === 'white' ? lightBishop : darkBishop,
        queen: (player: Player) => player === 'white' ? lightQueen : darkQueen,
        king: (player: Player) => player === 'white' ? lightKing : darkKing,
        tower: (player: Player) => player === 'white' ? lightTower : darkTower,
    } as const;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const { name, player } = chessboard[i][j];

            if (player === "" || name === 'EMPTY') continue;

            const image = pieceImageMap[name](player) as HTMLOrSVGImageElement;

            if (image) {
                context2d.drawImage(image,
                    j * 100,
                    i * 100,
                    100,
                    100
                );
            }
        }
    }
}

function drawChessBoard(context2d: CanvasRenderingContext2D) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            context2d.fillStyle = i % 2 === 0 ?
                j % 2 === 0 ? '#F7EAD7' : '#C77836' :
                j % 2 === 0 ? '#C77836' : '#F7EAD7';

            context2d.fillRect(i * 100, j * 100, 100, 100);
        }
    }
}

export default App

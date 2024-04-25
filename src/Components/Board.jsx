import {useState,useEffect,useRef} from 'react'
import "./Board.css"
import ScoreBoard from "./Scoreboard";

const Board = () => {
    const board = useRef(Array(9).fill(null))
    const [player, setPlayer] = useState("true");
    const [history, setHistory]=useState([]);
    const [sameIndex, setSameIndex]=useState(false)

  

    const modal = useRef(null)
    const [messages, setMessages] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [scores, setScores] = useState({ xscore: 0, oscore: 0 })

     const WIN_CONDITIONS = useRef([
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ])
 
    useEffect(() => {
        if (sameIndex) {
            setHistory(history => history)
            setSameIndex(!sameIndex)
      
        }
      if(gameOver)
      {
        board.current=Array(9).fill(null)
          setGameOver(!gameOver)
          setHistory([])
      }
 
  }, [sameIndex,gameOver]);

  
  const checkWinner = (board) =>{
   
    for (let i = 0; i<WIN_CONDITIONS.current.length; i++)
    {
      const[x, y, z] =  WIN_CONDITIONS.current[i]
      
      if(board[x] && board[x] === board[y] && board[y] === board[z])
      {
       return board[x];   
      }
    }
  }


//handleBoxClick function
    const handleBoxClick = (boxIndex) => {
        if (player) {
            board.current[boxIndex] = "x"
           // setPlayer(false)
        } else {
            board.current[boxIndex] = "o"
            //setPlayer(true)
        }

        setHistory([...history, boxIndex])
        setPlayer(!player)
if(!board.current.includes(null))
    {
      modal.current.style.setProperty("display", "block")
      setMessages("Tie!")
        }
        
     

    const winner = checkWinner(board.current);
  
    if(winner){
      if(winner === "O"){
        let {oScore} = scores;
        oScore +=1 
        setScores({
          ...scores, oScore})
      }
      else{
        let {xScore} = scores;
        xScore +=1 
        setScores({
          ...scores, xScore}) 
      }
      modal.current.style.setProperty("display", "block")
      setMessages("Player "+winner+" Wins!") 
    }    
  }

  const closeModal = () => {
    modal.current.style.setProperty("display", "none")
    setGameOver(!gameOver)
   }

 const handlePrevClick=()=>{
    for(let indexBoard = 0; indexBoard<9; indexBoard++){
      if(history[0]===indexBoard)
      {
        setSameIndex(!sameIndex)
        history.splice(0, 1);
        board.current.splice(indexBoard, 1, null);
        return
      }
    }
   }
    
    return (
        <div className='board'>
            <div className='board-square'>
                {board.current.map((value, index) => {
                    return <button key={index} className={`box
                    ${value === null ? "default"
                    : value === "x" ? "x" : "o"
                        }`}
                    onClick={()=>value===null && handleBoxClick(index)}
                    
                    >{value }</button>   
                })}
                
                <div ref={modal} className='modal'>
                     <div className='container'>
                         <h1>{messages}</h1>
                         <br/>
                        <button onClick={()=>closeModal()}>close</button>
                    </div>
                 </div>
            </div>
             <div className="board-action">
        <button className='prev-btn' onClick= {() => handlePrevClick()}>Previous Step</button>
        <button className="reset-btn" onClick={()=> setGameOver(!gameOver) }>Reset Board</button>
            </div>
            <div className="score">
        <ScoreBoard scores={scores}/>
    </div>
  </div>  


  
    )



}



export default Board
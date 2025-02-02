import React, { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";

const App: React.FC = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState<string[]>([]);
  const [tickets, setTickets] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>();
  const [endGame, setEndGame] = useState<boolean>(true);
  const [allPastWinners, setAllPastWinners] = useState<string[]>([])

  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    const fetchData = async () => {
      const storage = await fetchStorage();
      setPlayers(Object.values(storage.players));
      setTickets(storage.tickets_available);
      setWinner(storage.winner_address);
      setAllPastWinners(Object.values(storage.past_winners))
     
    };

    fetchData();
  }, []);

  // TODO 7.a - Complete onBuyTicket function
  const onBuyTicket = async () => {
    try{
      setLoading(true);
      await buyTicketOperation();
      alert("Bought a ticket")
      setLoading(false);

    }catch(error){
      console.log(error);
    }
    
  };

  // TODO 11.a - Complete onEndGame function
  const onEndGame = async () => {

    try{
      setLoading(true);
      await endGameOperation();
      alert("Game ended")
      setLoading(false);

      const storage = await fetchStorage();
      setWinner(storage.winner_address);
      setEndGame(true);

    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-dark text-light">
        {/* Ticket remaining display */}
        <div className="py-1">Tickets remaining: {tickets}</div>
        {/* Action Buttons */}
        {tickets > 0 ? (
          <button onClick={onBuyTicket} className="btn btn-danger btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            {loading ? "Loading" : "Buy Ticket"}
          </button>
        ) : (
          <button onClick={onEndGame} className="btn btn-success btn-lg">
            {/* TODO 11.b - Call onEndGame on click */}
            {/* TODO 11.c - Show "loading..." when buying operation is pending */}
            {loading ? "Loading" : "End Game"}
    
          </button>
        )}
        {/* List of Players */}
        <div className="mt-2">
          {players.map((player, index) => (
            <div key={index}>
              <b>Ticket {index + 1}:</b> {player}
            </div>
          ))}
        </div>
        <div className="m-5 text-warning">
        Past Season Winner is : <span className="text-success fs-4 fw-bolder">{endGame?winner:""}</span>
        <table
         
          className=" table text-light"
        >
          <thead>
            <tr>
              <th scope="col" className="fs-4 ">Seasons</th>
              <th scope="col" className="fs-4">Winners Address</th>
            </tr>
          </thead>
        {allPastWinners.map((eachFriend, index) => (
        
          <tbody>
            <tr>
              <td className="p-2 fs-5"><span className="fw-bold">Season {index+1}</span></td>
              <td className=" w-1/3 ">{eachFriend}</td>
            </tr>
          </tbody>
       
      ))}
       </table>
      </div>
      </div>
     
    </div>
  );
};

export default App;

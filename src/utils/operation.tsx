// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation

import { tezos } from "./tezos";

export const buyTicketOperation = async () => {
    try{
        // const contract = await tezos.wallet.at("KT1WT6AjrzNhUqXZgc2JVE8bvRgb9WmkUXrT");
        // const contract = await tezos.wallet.at("KT1BwyFqiVjuqYNToXUg9HzaSRRuuSzWswoS");
        const contract = await tezos.wallet.at("KT1PkzoNEgLXckshKWsMDzt5afkzpYX4Ujs8");// all past winner address
    const op = await contract.methods.buy_ticket().send({
        amount:1,
        mutez:false
    });
   await op.confirmation(1);
    }catch(error){
        throw error;
    }
};

// TODO 10 - Call end_game entrypoint in the Lottery contract by completing endGameOperation

export const endGameOperation = async () => {
    try{
        // const contract = await tezos.wallet.at("KT1WT6AjrzNhUqXZgc2JVE8bvRgb9WmkUXrT");
        // const contract = await tezos.wallet.at("KT1BwyFqiVjuqYNToXUg9HzaSRRuuSzWswoS"); // winner address
        const contract = await tezos.wallet.at("KT1PkzoNEgLXckshKWsMDzt5afkzpYX4Ujs8"); // all past winner address
    const op = await contract.methods.end_game().send();
   await op.confirmation(1);
    }catch(error){
        throw error;
    }
};

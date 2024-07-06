// TODO 8 - Fetch storage of the Lottery by completing fetchStorage
import axios from "axios";


export const fetchStorage = async()=>{


    // const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/KT1WT6AjrzNhUqXZgc2JVE8bvRgb9WmkUXrT/storage");
    // const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/KT1BwyFqiVjuqYNToXUg9HzaSRRuuSzWswoS/storage");
    const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/KT1PkzoNEgLXckshKWsMDzt5afkzpYX4Ujs8/storage");
    return res.data;
}
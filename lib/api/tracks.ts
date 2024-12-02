import { API_URL, authToken } from "@/config";
 
export const listTracks = async () =>{
    //fetch tracks: http://localhost:3000/track///use o ip da maquina pq o android é ruim
    
    const res = await fetch(`${API_URL}/track`,{
      headers:{
        Authorization: `Bearer ${authToken}`
      }
    });
    if(res.status == 401){
      throw new Error("Unauthorized. Please register or Sign-in");
    }
    if(res.status !== 200){
      throw new Error("error fetching tracks");
    }
    return await res.json()
   
}
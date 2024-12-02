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
export const getTrack = async (id: string) =>{
    const res = await fetch(`${API_URL}/track/${id}`,{
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
export const postTrack = async (data: {content: string}) =>{
    const res = await fetch(`${API_URL}/track`,{
        method: 'POST',
        headers:{
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      if(res.status == 401){
        throw new Error("Unauthorized. Please register or Sign-in");
      }
      if(res.status !== 200){
        console.log(res);
        throw new Error("Error creating track");
      }
      return await res.json()
}
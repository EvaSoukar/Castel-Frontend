import { useEffect, useState } from "react"
import axios from "../api/axios"

const Home = () => {
  const [castles, setCastles] = useState([]);

  useEffect(() => {
    const getCastles = async () => {
      const res = await axios.get("/castles")
      console.log(res)
      setCastles(res.data)
    }
    getCastles()
  }, [])
  

  return (
    <div>Home
      {
        castles.map((castle) => (
          <div>
            <h2>{castle.name}</h2>
            <p>{castle.description}</p>
            <img src={castle.images} alt="" />
          </div>
        ))
      }
    </div>
  )
}
export default Home
import { useNavigate } from "react-router-dom";

type CarouselCardProps = {
  castle: Castle;
}
const CarouselCard = ({ castle }: CarouselCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(castle._id)
    navigate(`/castles/${castle._id}`)
  }
  return (
    <div onClick={handleClick} className="cursor-pointer min-w-40 max-w-48 lg:max-w-64 flex-shrink-0 bg-white shadow-md rounded-xl overflow-visible">
      {castle.images.map(img => (
        <div className="aspect-[4/3] w-full rounded-t-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={img.url} alt={img.name} />
        </div>
      ))}
      <div className="space-y-1 p-3">
        <h6 className="h6 text-dark-brown">{castle.name}</h6>
        <span className="text-xs text-grey">{castle.address}</span>
        <p className="text-xs">From {castle.rooms[0].price}€</p>
      </div>
    </div>
  )
}
export default CarouselCard
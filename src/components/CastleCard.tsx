type CastleCardProps = {
  castle: Castle;
}

const CastleCard = ({ castle }: CastleCardProps) => {
  return (
    <div className="max-w-80 w-full flex flex-col gap-2 shadow-md rounded-md overflow-hidden">
      {castle.images.map(img => (
        <img className="max-h-52 h-full object-cover" src={img.url} alt={img.name} />
      ))}
      <div className="px-4 space-y-4">
        <div>
          <h4 className="h4">{castle.name}</h4>
          <span className="text-xs">{castle.address}</span>
        </div>
        <p className="line-clamp-2">{castle.description}</p>
        <div className="w-full border-b-1 border-dark-brown mx-auto"></div>
        <div className="flex justify-between items-center pb-4">
          <p>{castle.rooms[0].price} €</p>
          <button className="primary-btn">Read more</button>
        </div>
      </div>
    </div>
  )
}
export default CastleCard
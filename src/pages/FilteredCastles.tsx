import { MdOutlineLocationOn } from "react-icons/md";
import CastleCard from "../components/CastleCard";
import { useCastle } from "../contexts/CastleContext";
import COUNTRIES from "../constants/countries";
import { useFilter } from "../contexts/FilterContext";
import { useEffect, useState } from "react";

const FilteredCastles = () => {
  const { castles } = useCastle();
  const { selectedCountry, selectedCheckInDate, selectedCheckOutDate, selectedGuestsCount } = useFilter();
  const { actions } = useFilter();
  const [availableRooms, setAvailableRooms] = useState<Room[]>([])
  const [filteredCastles, setFilteredCastles] = useState<Castle[]>([])

  useEffect(() => {
    const allCastlesIDs = castles.map(castle => castle._id);

    setAvailableRooms([]);

    Promise.all(
      allCastlesIDs.map(id =>
        actions.getAvailableRooms(id!, selectedCheckInDate, selectedCheckOutDate, selectedGuestsCount)
      )
    ).then(results => {
      setAvailableRooms(results.flat());
    });
  }, [castles, selectedCheckInDate, selectedCheckOutDate]);

  useEffect(() => {
    setFilteredCastles(filterCastles());
  }, [castles, selectedCountry, selectedCheckInDate, selectedCheckOutDate, availableRooms]);

  const filterCastles = () => {
    let result = castles;

    // Filter by country if selected
    if (selectedCountry) {
      result = result.filter(c => c.country === selectedCountry);
    }

    if ((selectedCheckInDate && selectedCheckOutDate) || selectedGuestsCount) {
      const castleIdsWithAvailableRooms = new Set(availableRooms.map(room => room.castleId));
      result = result.filter(c => c._id && castleIdsWithAvailableRooms.has(c._id));
    }

    return result;
  };

  const countryNameFromCode = Object.values(COUNTRIES).find(country => country.value === selectedCountry)?.name;
  return (
    <div className="page-margin">
      <header className="mt-6 space-y-2 pb-4">
        {selectedCountry && (
          <>
            <h3 className="h3">Showing results for:</h3>
            <p className="flex gap-1 items-center">
              <MdOutlineLocationOn /> {countryNameFromCode}
            </p>
          </>
        )}

        <div className="flex justify-between items-center">
          <p>{filteredCastles.length} found</p>
          <button className="outline-btn">Filter</button>
        </div>
      </header>

      <div className="flex flex-col gap-8 items-center md:flex-row md:items-start flex-wrap">
        {filteredCastles.length > 0 ? (
          filteredCastles.map(c => (
            <CastleCard key={c._id} castle={c} />
          ))
        ) : (
          <p>No castles found.</p>
        )}
      </div>
    </div>
  )
}
export default FilteredCastles
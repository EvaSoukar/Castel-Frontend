import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { MdOutlineEvent, MdOutlineFilterAlt, MdOutlineLocationOn } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import COUNTRIES from "../constants/countries";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useFilter } from "../contexts/FilterContext";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";


const Hero = () => {
  const navigate = useNavigate();
  const {
    selectedCountry,
    selectedGuestsCount,
    setSelectedCountry,
    setSelectedCheckInDate,
    setSelectedCheckOutDate,
    setSelectedGuestsCount,
  } = useFilter();

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/FilteredCastles")
  };

  const onDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    const isoCheckInDate = start?.toISOString();
    const isoCheckOutDate = end?.toISOString();
    if (isoCheckInDate) {
      setSelectedCheckInDate(isoCheckInDate);
    }
    if (isoCheckOutDate) {
      setSelectedCheckOutDate(isoCheckOutDate);
    }
  };

  return (
    <div className="flex flex-col lg:flex-col-reverse lg:items-center lg:justify-center lg:h-[75vh] bg-none bg-center bg-cover lg:[background-image:url('https://images.unsplash.com/photo-1715603518834-02ffe9f996f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472')]">
      <div className="bg-center bg-cover flex items-center justify-center rounded-b-lg [background-image:url('https://images.unsplash.com/photo-1715603518834-02ffe9f996f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472')] lg:bg-none">
        <form onSubmit={handleSubmit} className="max-w-sm lg:max-w-max w-full max-h-3/4 mx-3 p-8 lg:py-6 my-8 bg-secondary/75 rounded-lg lg:rounded-full flex flex-col lg:flex-row items-center justify-center gap-2">
          <div className="search-input flex items-center gap-2">
            <MdOutlineLocationOn />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="text-sm w-full text-grey"
            >
              <option value="">Select Country</option>
              {Object.values(COUNTRIES).map(c => (
                <option key={c.name} value={c.value}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="bg-grey w-[1px] h-10 hidden lg:block"></div>
          <div className="search-input">
            <MdOutlineEvent />
            <DatePicker
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              selectsRange
              onChange={onDateChange}
            />
          </div>
          <div className="bg-grey w-[1px] h-10 hidden lg:block"></div>
          <div className="search-input">
            <AiOutlineUsergroupAdd />
            <div className="flex items-center justify-between input w-80">
              <span className="w-8">Guests</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGuestsCount(selectedGuestsCount - 1)}
                  disabled={selectedGuestsCount === 0}
                ><CiCircleMinus className="w-8 h-8 text-grey" /></button>
                <span className="w-8 text-center">{selectedGuestsCount}</span>
                <button
                  type="button"
                  onClick={() => setSelectedGuestsCount(selectedGuestsCount + 1)}
                ><CiCirclePlus className="w-8 h-8 text-grey" /></button>
              </div>
            </div>
          </div>
          <div className="bg-grey w-[1px] h-10 hidden lg:block"></div>
          {/* <div className="search-input">
            <MdOutlineFilterAlt />
            <input className="text-sm" type="text" placeholder="Filter" />
          </div> */}
          <button type="submit" className="primary-btn mt-8 lg:mt-0 lg:ml-4">
            Search
          </button>
        </form>
      </div>
      {/* Hero Text */}
      <div className="my-6 text-center flex flex-col justify-center items-center lg:bg-secondary/75 rounded-lg lg:py-12 px-3 md:px-16">
        <h1 className="h1 pb-4 lg:pb-6">Check Into a Fairytale</h1>
        <p className="max-w-80 lg:max-w-[480px] lg:text-xl">Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Castel, your storybook stay begins for real.</p>
      </div>
    </div>
  )
}
export default Hero
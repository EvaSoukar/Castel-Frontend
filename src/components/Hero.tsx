import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { MdOutlineEvent, MdOutlineFilterAlt, MdOutlineLocationOn } from "react-icons/md"

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-col-reverse lg:items-center lg:justify-center lg:h-[75vh] bg-none bg-center bg-cover lg:[background-image:url('https://images.unsplash.com/photo-1715603518834-02ffe9f996f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472')]">
      {/* Hero bg */}
      <div className="bg-center bg-cover flex items-center justify-center rounded-b-lg [background-image:url('https://images.unsplash.com/photo-1715603518834-02ffe9f996f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472')] lg:bg-none">
        {/* Search Bar */}
        <div className="max-w-sm lg:max-w-max w-full max-h-3/4 mx-3 p-8 lg:py-6 my-8 bg-secondary/75 rounded-lg lg:rounded-full flex flex-col lg:flex-row items-center justify-center gap-2">
          <div className="search-input">
            <MdOutlineLocationOn />
            <input className="text-sm" type="text" placeholder="Search Destination" />
          </div>
          <div className="bg-grey w-[1px] h-10 hidden lg:block"></div>
          <div className="search-input">
            <MdOutlineEvent />
            <input className="text-sm" type="text" placeholder="Select Date" />
          </div>
          <div className="bg-grey w-[1px] h-10 hidden lg:block"></div>
          <div className="search-input">
            <AiOutlineUsergroupAdd />
            <input className="text-sm" type="text" placeholder="Select Guests" />
          </div>
          <div className="bg-grey w-[1px] h-10 hidden lg:block"></div>
          <div className="search-input">
            <MdOutlineFilterAlt />
            <input className="text-sm" type="text" placeholder="Filter" />
          </div>
          <button className="primary-btn mt-8 lg:mt-0 lg:ml-4">
            Search
          </button>
        </div>
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
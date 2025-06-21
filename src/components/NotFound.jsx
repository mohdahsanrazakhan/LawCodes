import nf from "/nf.svg"

const NotFound = ({page}) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img src={nf} alt="No history found" className="w-48 mx-auto my-4" />
      <h4 className="text-[#a3a3a3] text-2xl mx-auto text-center">No {page} found.</h4>
    </div>
  )
}

export default NotFound;
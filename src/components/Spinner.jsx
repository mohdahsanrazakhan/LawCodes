// A gif spinner
import ghost from "/ghost.gif";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full py-8">
      <img src={ghost} alt="Loading..." className="w-16 h-16" />
    </div>
  )
}

export default Spinner;

// A simple circular spinner 
// const Spinner = () => (
//   <div className="flex justify-center items-center h-full py-8">
//     <div className="w-8 h-8 border-4 border-[#5c47c4] border-t-transparent rounded-full animate-spin"></div>
//   </div>
// );

// export default Spinner;
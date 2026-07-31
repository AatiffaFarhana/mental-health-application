import MoodTracker from "../components/MoodTracker";
import MoodChart from "../components/MoodChart";
import Suggestions from "../components/Suggestions";


function MoodTrackerPage(){
  return(
    <div className="container pt-2 px-6">
      <div className="page-title pt-32 text-center">
        {/* <h1>Mood Tracker</h1> */}
<p className="mt-2 text-xl leading-9 text-gray-600 max-w-4xl mx-auto text-center">          Taking a minute to understand your emotions is a small step towards better mental well-being. 
          Record today's mood and receive personal wellness suggestions. 
        </p>
      </div>
    
    <MoodTracker/>
    <MoodChart moodHistory={[]}/>
    {/* <Suggestions/> */}
    </div>
  )
}
export default MoodTrackerPage
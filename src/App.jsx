import Chat from "./components/chat";
import SideNav from "./components/sideNav";

export default function App() {

  

  return(
    <div className="w-[100%] bg-[#F5F7FA] h-[100vh] px-5 overflow-hidden pt-5">
      <div className="flex items-start h-[100%]  border-[#E2E8F0] bg-[#FFFFFF] rounded-2xl border-[3px]"> 
        <SideNav />
        <Chat />
      </div>
    </div>
  )
}
import { useState } from "react";
import Chat from "./components/chat";
import SideNav from "./components/sideNav";
import { saveChats, loadChats } from "../indexeddb";
import { useEffect } from "react";

export default function App() {

  const [chatArray, setChatArray] = useState([])


  useEffect(() => {
    const loadSavedChats = async () => {
        try {
            const savedChats = await loadChats();
            if (savedChats && savedChats.length > 0) {
                setChatArray(savedChats);
            }
        } catch (error) {
            console.error('Error loading chats:', error);
        }
    };

    loadSavedChats();
   
}, []);


useEffect(() => {
  const persistChats = async () => {
      try {
          await saveChats(chatArray);
      } catch (error) {
          console.error('Error saving chats:', error);
      }
  };

  if (chatArray.length > 0) {
      persistChats();
  }
}, [chatArray]);

  return(
    <div className="w-[100%] bg-[#F5F7FA] h-[100vh] overflow-x-hidden p-2 ">
      <div className="flex items-start h-[100%] w-[95%] mx-auto border-[#E2E8F0] bg-[#FFFFFF] rounded-2xl border-[3px] max-md:flex-col"> 
        <SideNav setChatArray={setChatArray} />
        <Chat chatArray={chatArray} setChatArray={setChatArray} />
      </div>
    </div>
  )
}
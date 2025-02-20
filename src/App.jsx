import { useState } from "react";
import Chat from "./components/chat";
import SideNav from "./components/sideNav";
import { saveChats, loadChats } from "../indexeddb";
import { useEffect } from "react";

export default function App() {

  const [chatArray, setChatArray] = useState([])
  const token1 = import.meta.env.VITE_TRANSLATE_API
  const token2 = import.meta.env.VITE_DETECT_API

  function addOriginTrialToken(token) {
    if (token) {
      const metaTag = document.createElement("meta");
      metaTag.httpEquiv = "origin-trial";
      metaTag.content = token;
      document.head.appendChild(metaTag);
    }
  }

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
    addOriginTrialToken(token1);
    addOriginTrialToken(token2)
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
import { useEffect } from "react";
import { useState } from "react"


export default function Chat() {
    const [Summarize, setSumarize] = useState(false)
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [isSupported, setIsSupported] = useState(true);
    const [translatorIsSupported, setTranslatorIsSupported] = useState(true);
    const [detector, setDetector] = useState(null);
    const [translator, setTranslator] = useState(null);
    const [formData, setFormData] =useState({
        text : "",
        language: ""
    })
    const [chatArray, setChatArray] = useState([])

    function handleChange(e){
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    }



    function summarizeBtn(){
        setSumarize(prev => !prev)
    }


    // initialize language detector
    const initializeDetector = async () => {
        const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
         const canDetect =languageDetectorCapabilities.available

        if (canDetect === 'readily') {
            setIsSupported(true);
            const detectorInstance = await self.ai.languageDetector.create();
            setDetector(detectorInstance);
          } 
        
        else{
            setIsSupported(false);
        }}

        //  initialize translator
        const initializeTranslator = async () => {
            const translatorCapabilities= await self.ai.translator.capabilities();
            const canTranslate = translatorCapabilities.available;
            if (canTranslate === 'readily') {
                console.log('Translation is readily available.');
                setTranslatorIsSupported(true);

            }
            else{
                setTranslatorIsSupported(false)
            }
        }

    useEffect(() => {
        
        initializeDetector();
        initializeTranslator();
    },[])

//  convert language code to language name
    const languageTagToHumanReadable = (languageTag, targetLanguage) => {
        const displayNames = new Intl.DisplayNames([targetLanguage], { type: 'language' });
        return displayNames.of(languageTag);
      };



    function sendMessageBtn(){
        if(formData.text.trim()){
            const newChat={
                id:Date.now(),
                userChat: formData.text,
                response: formData.text,
                Summarize: false
            }
            setChatArray([...chatArray, newChat])
            setFormData({
                ...formData,
                text: "",
                language: ""
            })
// language detection
            if (detector) {
                detector.detect(formData.text.trim())
                  .then((detectedLang) => {
                    const languageCode = detectedLang[0]?.detectedLanguage;
                    const languageName = languageTagToHumanReadable(languageCode, 'en');
                    setDetectedLanguage(languageName)
                  })
                  .catch((error) => {
                    console.error("Error detecting language:", error);
                  });
              }
              
            
        }
        
    }

  
 
    return(
        <div className=" w-[80%] flex p-10 flex-col items-start  gap-3 h-[100%]">
                <div className="flex flex-col items-center justify-between w-[100%] gap-1.5 h-[70%] pb-4 overflow-y-scroll">
                {chatArray.map((text, id)=>(
                 <div key={id} className="flex flex-col h-[180px]  w-[100%] justify-center gap-2">
                <div>
                    <div className="flex flex-col w-[60%] rounded-[8px] p-[20px] ml-[auto] bg-[#335CFF] text-white justify-end items-center bg-[]">
                    <p className="font-inter font-[400] text-[14px] text-start">{text.userChat}</p>      
                    </div>
               
                    <div className="flex justify-end bg-grey text-[14px] font-inter font-[400]"> <p>{detectedLanguage} </p></div>
                </div>

                <div className="flex w-[60%] rounded-[8px] p-[20px] bg-[#4d5355] text-white justify-start items-center">
                    <p>{text.response}</p>
                </div>
            </div>
             ))}
             </div>

          {chatArray.length<1 && <div className="flex flex-col w-[100%] items-center justify-center">
                <h1 className="font-pacifico font-[500] text-[64px] text-center"> Hello, welcome to Translate.ai</h1>
                <p className=" font-inter text-[16px] font-[400]">write something in the box and let us translate it for you.</p>
            </div>}
                    
            <div className="flex w-[70%] fixed bg-white mx-auto left-0 right-0 justify-center  shadow-2xl   rounded-[12px] flex-col border-[#CBD5E0] border-[1px] p-3 bottom-0 items-center mt-[20px] gap-2">
                <div className=" w-[100%]  ">
                    <textarea className="w-[100%] outline-none resize-none h-[80px] text-[14px] font-400 font-inter"  
                    name="text"
                    value={formData.text} 
                    onChange={handleChange}
                    id="text" 
                    placeholder="type the text you want to translate"></textarea>
                </div>
                <div className="flex items-center w-[90%] justify-between">
                    <div className="flex gap-4" >
                    <button onClick={summarizeBtn} className={` ${Summarize? "bg-[#335CFF]" : "bg-[#b1bce9]" } cursor-pointer w-[120px] h-[40px] font-inter text-[14px] font-[500] rounded-[8px]`}>Summarize</button>
                        <select
                         className="border-[2px] border-[#335CFF] outline-none text-[14px] font-[400] font-inter rounded-[8px]"
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                           id="language">
                            <option value="">Select tanslation language</option>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="pt">Portuguese</option>
                            <option value="ru">Rusian</option>
                            <option value="tr">Turkey</option>
                            <option value="es">Spanish</option>
                        </select>
                    </div>
                    <button onClick={sendMessageBtn} className="w-[60px] cursor-pointer h-[60px] flex justify-center items-center  bg-[#335CFF] rounded-[8px]"><img src="/send.png" alt="send" /></button>
                </div>
            </div>
        </div>
    )
}
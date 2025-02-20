import { useEffect } from "react";
import { useState } from "react"
import Spinner from "./spinner";
import Alert from "./detectoralert";
import TranslatorAlert from "./translatoralert";


export default function Chat({ chatArray, setChatArray}) {
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [isSupported, setIsSupported] = useState(true);
    const [formError, setFormError] = useState(false);
    const [error, setError] = useState(false)
    const [translatorIsSupported, setTranslatorIsSupported] = useState(true);
    const [detector, setDetector] = useState(null);
    const [responeLoading, setResponseLoading] = useState({});
    const [translator, setTranslator] = useState(null);
    const [formData, setFormData] =useState({
        text : "",
        language: ""
    })
   

    function handleChange(e){
    const { name, value } = e.target;
    setCharCount(value.length);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                setTranslatorIsSupported(true);
                if(sourceLanguage && formData.language){
                    const translatorInstance = await self.ai.translator.create({
                        sourceLanguage: sourceLanguage,
                        targetLanguage: formData.language,
                    });
                    
                    setTranslator(translatorInstance);
                
            }
        }
            else{
                setTranslatorIsSupported(false)
            }
        }

    useEffect(() => {
        initializeDetector();
    },[])

    useEffect(()=>{
        initializeTranslator();
    },[sourceLanguage, formData.language])

//  convert language code to language name
    const languageTagToHumanReadable = (languageTag, targetLanguage) => {
        const displayNames = new Intl.DisplayNames([targetLanguage], { type: 'language' });
        return displayNames.of(languageTag);
      };



// send button
const sendMessageBtn = async () => {
    if (!formData.text.trim() || !formData.language) {
        setFormError(true);
        return; 
    }
    setFormError(false);

    const chatId = Date.now();
    const newChat = {
        id: chatId,
        userChat: formData.text,
    };

    setChatArray([...chatArray, newChat]);
    setResponseLoading(prev => ({ ...prev, [chatId]: true }));

    try {

        if (!detector) {
            throw new Error("Language detector not initialized");
        }

    
        if (detector) {
            const detectedLang = await detector.detect(formData.text.trim());
            const languageCode = detectedLang[0]?.detectedLanguage;
            setSourceLanguage(languageCode);

            const languageName = languageTagToHumanReadable(languageCode, "en");
            setDetectedLanguage(languageName);

            const translatorInstance = await self.ai.translator.create({
                sourceLanguage: languageCode,
                targetLanguage: formData.language,
            });

            const translatedText = await translatorInstance.translate(formData.text.trim());
            setResponseLoading(prev => ({ ...prev, [chatId]: false }));;

            setChatArray(prev => prev.map(chat => {
                if (chat.id === chatId) {
                    return {
                        ...chat,
                        language: languageName,
                        response: translatedText,
                        
                    };
                }
                return chat;
            }));
        }
    } catch (error) {
        setChatArray(prev => prev.map(chat => {
            if (chat.id === chatId) {
                return {
                    ...chat,
                    language: "Error",
                    response: `Translation failed: ${error.message || "Please try again later"}`
                };
            }
            return chat;
        }));
    } finally {
        setResponseLoading(false);
        setFormData({ text: "", language: "" });
    }
};
 
    return(
        <div className=" w-[80%] max-md:p-[10px] flex p-10 flex-col h-screen items-start max-md:w-[100%]   gap-3 ">
            <div className="flex-1 w-[100%] overflow-y-auto p-10 max-md:flex max-md:p-0">
                {!isSupported &&<Alert/>}
                {!translatorIsSupported && <TranslatorAlert/>}
            <div className="w-4/5 mx-auto max-lg:w-[85%] max-md:w-[90%]">
            <div className="flex flex-col items-center  justify-center w-[100%] gap-1.5 pb-1 ">
            {chatArray.length>0? chatArray.map((text, id)=>(

                <div key={id} className="flex flex-col  w-[100%] justify-center gap-2">
                        <div>
                            <div className="flex flex-col w-[60%] rounded-[8px] p-[20px] ml-[auto] bg-[#335CFF] text-white justify-end items-center ">
                                <p className="font-inter font-[400] text-[14px] text-start">{text.userChat}</p>      
                            </div>
                    
                            <div className="flex justify-end bg-grey text-[14px] font-inter font-[400]"> 
                                <p>{text.language} </p>
                            </div>
                        </div>
                       
                        <div className="flex w-[60%] rounded-[8px] p-[20px] bg-[#4d5355] text-white justify-start items-center">
                        {responeLoading[text.id]? <Spinner /> : <p>{text.response}</p>}
                        </div>
              
                </div>
                
                ))
                :
                chatArray.length<1 && <div className="flex flex-col w-[100%] items-center justify-center">
                <h1 className="font-pacifico font-[500] text-[54px] max-lg:text-[40px] text-center"> Hello, welcome to Translate.ai</h1>
                <p className=" font-inter text-[16px] text-center font-[400]">write something in the box and let us translate it for you.</p>
                    </div>
                    }
                
            </div>
            </div>
            </div>

        
                    
            <div className="flex w-[70%] max-lg:w-[80%] max-md:w-[100%] bg-white mx-auto shadow-2xl rounded-[12px] flex-col border-[#CBD5E0] border-[1px] p-3 items-center mt-[20px] gap-2 ">
                <div className=" w-[100%]  ">
                    <textarea className="w-[100%] outline-none resize-none h-[80px] text-[14px] font-400 font-inter"  
                    name="text"
                    value={formData.text} 
                    onChange={handleChange}
                    id="text" 
                    placeholder="type the text you want to translate"></textarea>
                </div>
               
                <div className="flex items-center w-[90%] max-md:w-[95%] justify-between">
                    <div className="flex gap-4" >
                        <select
                         className="border-[2px] h-[40px] border-[#335CFF] outline-none text-[14px] font-[400] font-inter rounded-[8px]"
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                           id="language">
                            <option value="">Select language</option>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="pt">Portuguese</option>
                            <option value="ru">Rusian</option>
                            <option value="tr">Turkey</option>
                            <option value="es">Spanish</option>
                        </select>
                    </div>
                    <button onClick={sendMessageBtn} className={`w-[60px] cursor-pointer h-[50px] flex justify-center items-center  bg-[#335CFF] rounded-[8px] `}><img src="/send.png" alt="send" /></button>
                </div>
                <div>
                {formError && <p className="text-red-500 text-[14px] font-inter font-[400]">Please enter text and select language to translate</p>}
                </div>
            </div>
        </div>
    )
}
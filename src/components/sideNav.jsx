export default function SideNav({setChatArray}){

    function newChat(){
    setChatArray([])
}

    return(

        <div className="w-[20%] p-[12px] h-[100%] max-md:h-[fit-content] max-md:flex-row max-md:flex  max-md:w-[100%] max-md:gap-2 items-center justify-between max-md:border-b-[1px] max-md:border-r-0   border-[#E0E4EA] border-r-[1px] max-lg:w-[25%]">
            
            <div className="flex items-center justify-between w-[100%]"> 
                <div className="flex items-center justify-center ">
                <img src="/logo.png" alt="logo" />
                <p className="font-pacifico font-[400] text-[18px]">Translate.ai</p> 
                </div>

            </div>

            <button onClick={newChat} className="mt-[20px] cursor-pointer w-[60%] max-md:w-[180px] bg-[#335CFF] text-white rounded-[8px] h-[32px] font-inter text-[14px] font-[500] max-md:mt-0 "> New chat</button>
        </div>
    )
}
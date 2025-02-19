export default function SideNav({setChatArray}){
function newChat(){
    setChatArray([])
}

    return(

        <div className="w-[20%] p-[12px] h-[100%]  border-r-[#E0E4EA] border-r-[1px]">
            <div className="flex items-center justify-between"> 
            <div className="flex items-center">
               <img src="/logo.png" alt="logo" />
               <p className="font-pacifico font-[400] text-[18px]">Translate.ai</p> 
            </div>

            </div>

            <button onClick={newChat} className="mt-[20px] w-[100%] bg-[#335CFF] text-white rounded-[8px] h-[32px] font-inter text-[14px] font-[500] "> New chat</button>


        </div>
    )
}
export default function SideNav(){
    return(
        <div className="w-[20%] p-[12px] h-[100%]  border-r-[#E0E4EA] border-r-[1px]">
            <div className="flex items-center justify-between"> 
            <div className="flex items-center">
               <img src="/logo.png" alt="logo" />
               <p className="font-pacifico font-[400] text-[18px]">Translate.ai</p> 
            </div>

           {/* <button> <img src="/sidebar1.png" alt="" /></button> */}
            </div>

            <button className="mt-[20px] w-[100%] bg-[#335CFF] text-white rounded-[8px] h-[32px] font-inter text-[14px] font-[500] "> New chat</button>

            <div className="mt-[20px] ">
                <h1 className="text-[#717784] mb-[10px] text-[14px] font-inter font-[500]  ">Converations</h1>
                <div className="flex flex-col ml-[10px]" >
                    <div className="flex items-center justify-between gap-2 w-[100%] mb-[10px]">
                        <p className="text-[#2B303B] text-[14px] font-[500] font-inter whitespace-nowrap overflow-hidden text-ellipsis ">hhhhhhhhhhhhh mmmhhb </p>
                        <button><img src="/edit.png" alt="edit" /></button>
                        <button><img src="/delete.png" alt="/delete" /></button>
                    </div>

                </div>
            </div>

        </div>
    )
}
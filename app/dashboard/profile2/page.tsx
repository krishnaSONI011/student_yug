import Image from "next/image";


export default function Profile2(){
    return(
        <>
        <div className="flex justify-center mt-5">
            <Image src={"/logo.png"} alt="profile" width={100} height={100}  />
        </div>
        <div className="p-2">
            <h1 className="text-xl font-bold">Fixed  Information</h1>
        <p className="my-5 bg-yellow-200 p-2 text-amber-500 text-center border border-amber-500 rounded">You do not Change some Basic Information</p>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
            <div className="flex flex-col">
                <label>First Name</label>
                <input className="cursor-no-drop border bg-gray-100 p-2" value={"Krishna"}  disabled/>
            </div>
            <div className="flex flex-col">
                <label>Last Name</label>
                <input className="cursor-no-drop border bg-gray-100 p-2" value={"Soni"} disabled/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>Aapaar Id</label>
                <input type="text" className="cursor-no-drop border bg-gray-100 p-2" value={"123456789012"}  />
            </div>
            <div className="flex flex-col">
                <label>DOB</label>
                <input type="text" className="cursor-no-drop border bg-gray-100 p-2" value={"03-12-2001"} />
            </div>
        </div>
        <h1 className="text-xl mt-5 px-5 font-bold">Basic Information</h1>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>Email</label>
                <input type="email" className=" border bg-white p-2" value={"Krishna@gmail.com"}  />
            </div>
            <div className="flex flex-col">
                <label>Phone</label>
                <input type="text" className=" border bg-white p-2" value={"9898986686"} />
            </div>
        </div>
       <div className="grid grid-cols-1 gap-2 p-2">
       <div className="flex flex-col">
                <label>Address</label>
                <textarea  className=" border bg-white p-2" value={"Malviya Nagar , Bharatpur"}  />
            </div>
       </div>
        <div className="p-2">
            <h1 className="text-xl font-bold">
                School Information
            </h1>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>School Name</label>
                <input type="text" className=" border bg-white p-2" value={"Delhi Public School"}  />
            </div>
            <div className="flex flex-col">
                <label>School Code</label>
                <input type="text" className=" border bg-white p-2" value={"SB0001"} />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-2 p-2">
        <div className="flex flex-col">
                <label>School Address</label>
                <textarea  className=" border bg-white p-2" value={"NH-11 , near alok toll , Bharatpur"}  />
            </div>
            <div className="my-10 text-center">
                <button className="px-6 py-2 bg-[#204b73] text-white rounded-lg hover:bg-white hover:text-[#204b73] border border-[#204b73]">Submit</button>
            </div>
            {/* <div className="flex flex-col">
                <label></label>
                <input type="text" className=" border bg-gray-100 p-2" value={"SB0001"} />
            </div> */}
        </div>
        </>
    )
}
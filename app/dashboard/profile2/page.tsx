

export default function Profile2(){
    return(
        <>
        <div className="p-2">
            <h1 className="text-xl font-bold">Basic Information</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
            <div className="flex flex-col">
                <label>First Name</label>
                <input className=" border bg-gray-100 p-2" value={"Krishna"}  disabled/>
            </div>
            <div className="flex flex-col">
                <label>Last Name</label>
                <input className=" border bg-gray-100 p-2" value={"Soni"} disabled/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>Email</label>
                <input type="email" className=" border bg-gray-100 p-2" value={"Krishna@gmail.com"}  />
            </div>
            <div className="flex flex-col">
                <label>Phone</label>
                <input type="text" className=" border bg-gray-100 p-2" value={"9898986686"} />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>Aapaar Id</label>
                <input type="text" className=" border bg-gray-100 p-2" value={"123456789012"}  />
            </div>
            <div className="flex flex-col">
                <label>DOB</label>
                <input type="text" className=" border bg-gray-100 p-2" value={"03-12-2001"} />
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
                <input type="text" className=" border bg-gray-100 p-2" value={"Delhi Public School"}  />
            </div>
            <div className="flex flex-col">
                <label>School Code</label>
                <input type="text" className=" border bg-gray-100 p-2" value={"SB0001"} />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
                <label>Address</label>
                <input type="text" className=" border bg-gray-100 p-2" value={"NH-11 , near alok toll , Bharatpur"}  />
            </div>
            {/* <div className="flex flex-col">
                <label></label>
                <input type="text" className=" border bg-gray-100 p-2" value={"SB0001"} />
            </div> */}
        </div>
        </>
    )
}
import { Alert, Label, TextInput, Select, Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gaamOptions } from "../constants/data";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export default function CreateDaan() {
    const navigate = useNavigate();
    const [ daan , setDaan ] = useState({
        name: '',
        seva: '',
        taluko: 'abdasa',
        gaam: '',
        mobileNumber: '',
        paymentMethod: 'cash',
        amount: ''
    });
    const [ error, setError ] = useState(null);

    const handleSubmit = async(e)=> {
        e.preventDefault();
        try {
            setError(null);
            const response = await fetch("/api/daan/create",
            {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({daan : daan }),
            }
            );
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return;
            }
            navigate("/");     
        }catch(err){
            setError(err.message);
        }
    }
    return(
        <>
        {error && (<Alert color={"failure"} onDismiss={() => setError(null)} className="my-4 mx-auto sticky top-16 z-10" >{error}</Alert>)}
        <div className="w-full max-w-[630px] mx-auto my-16 p-4 border border-gray-200 rounded-lg shadow-lg" >
            <h2 className="text-3xl font-mono font-bold underline my-4 text-center" >Add Daata Details</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="name" value="Daata nu name" />
            </div>
            <TextInput id="name" type="text" placeholder="Enter name" required onChange={(e)=> { setDaan({ ...daan , name : e.target.value }) }} />
            </div>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="seva" value="seva" />
            </div>
            <TextInput id="seva" type="text" placeholder="Enter seva"  required  onChange={(e)=> setDaan({ ...daan , seva : e.target.value })} />
            </div>
            <div className="w-full flex flex-row gap-4">
                <div className="mb-2 block flex-1">
                    <Label htmlFor="taluko" value="taluko" className="mb-2" />
                    <Select id="taluko" type="text"  required onChange={(e)=> setDaan({ ...daan , taluko : e.target.value })} >
                        <option value="" disabled>Select</option>
                        <option value="abdasa" >Abdasa</option>
                        <option value="anjar" >Anjar</option>
                        <option value="bhachau" >Bhachau</option>
                        <option value="bhuj" >Bhuj</option>
                        <option value="gandhidham" >Gandhidham</option>
                        <option value="lakhpat" >Lakhpat</option>
                        <option value="mandvi" >Mandvi</option>
                        <option value="mundra" >Mundra</option>
                        <option value="nakhatrana" >Nakhatrana</option>
                        <option value="rapar" >Rapar</option>
                    </Select>
                </div>
                <div className="mb-2 block flex-1">
                    <Label htmlFor="gaam" value="gaam" className="mb-2" />
                    <Select id="gaam" type="text"  required onChange={(e)=> setDaan({ ...daan , gaam : e.target.value })}  >
                        <option value="">Select</option>
                        {
                            daan.taluko && (
                                gaamOptions.map((talukaData) => {
                                    if (talukaData.taluka === daan.taluko) {
                                        return talukaData.villages.map((village, indx) => (
                                            <option key={indx} value={village} >{village}</option>
                                        ));
                                    }
                                    return null;
                                })
                            )
                        }
                    </Select>
                </div>
            </div>
            <div className="mb-2 block">
                <Label htmlFor="mobileNumber" value="Contact Info" />
            </div>
            <TextInput id="mobileNumber" type="number" placeholder="Enter mobile No."  required onChange={(e)=> setDaan({ ...daan , mobileNumber : e.target.value})} />
            <div className="mb-2 block">
                <Label htmlFor="paymentMethod" value="Payment Method" />
            </div>
            <Select id="paymentMethod" type="text" placeholder="Enter payment Method"  required onChange={(e)=> setDaan({ ...daan , paymentMethod : e.target.value })}  >
                <option value="" disabled>Select</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="upi">Upi</option>
            </Select>
            <div className="mb-2 block">
                <Label htmlFor="amount" value="Amount Given" />
            </div>
            <TextInput id="amount" type="number" placeholder="₹2300"  required onChange={(e)=> setDaan({ ...daan , amount : e.target.value})} />

            <Button type="submit" gradientDuoTone={"purpleToBlue"} outline onClick={handleSubmit} >Create</Button>
        </form>
        <span className="p-8 inline-block" >
            <Link to={"/"} className="flex items-center gap-4 text-gray-600 hover:underline hover:text-black whitespace-nowrap" ><HiOutlineArrowCircleLeft />Go Back</Link>
        </span>
      </div>
      </>
    );
}
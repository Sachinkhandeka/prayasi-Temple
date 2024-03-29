import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Label, TextInput, Button, Select, Alert } from "flowbite-react";
import { gaamOptions } from "../constants/data";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export default function EditDaan() {
    const { id } = useParams();
    const [ daan , setDaan ] = useState({});
    const [ error, setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);


    //get daata whenever id changes
    useEffect(()=> {
        const getData = async()=> {
            try{
                setError(null);
                setSuccess(null);
                const response = await fetch(`/api/daan/${id}`);
                const data = await response.json();

                if(!response.ok) {
                    setError(data.message);
                    return ;
                }
                setDaan(data.daan);
            }catch(err) {
                setError(err.message);
            }
        }
        getData();
    }, [id]);

    //handle  edit daan function 
    const handleSubmit = async(e)=> {
        e.preventDefault();
        try{
            setError(null);
            setSuccess(null);
            const response = await fetch(`/api/daan/edit/${id}`,
            {
                method : "PUT",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({daan : daan }),
            }
            );
            const data = await response.json();

            if(!response.ok) {
                setError(data.message);
                return;
            }
            setSuccess(data.message);
            setDaan(data.updatedDaan);
        } catch(err) {
            setError(err.message);
        }
    }
    return(
        <>
        {error && (<Alert color={"failure"} onDismiss={() => setError(null)} className="my-4 mx-auto sticky top-16 z-10" >{error}</Alert>)}
        {success && (<Alert color={"success"} onDismiss={() => setSuccess(null)} className="my-4 mx-auto sticky top-16 z-10" >{success}</Alert>)}
        <div className="w-full max-w-[630px] mx-auto my-16 p-4 border border-gray-200 rounded-lg shadow-lg" >
            <h2 className="text-3xl font-mono font-bold underline my-4 text-center" >Edit Details</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="name" value="Daata nu name" />
            </div>
            <TextInput id="name" type="text" value={daan.name || ''}  required onChange={(e)=> { setDaan({ ...daan , name : e.target.value }) }} />
            </div>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="seva" value="seva" />
            </div>
            <TextInput id="seva" type="text" value={daan.seva || ''}  required  onChange={(e)=> setDaan({ ...daan , seva : e.target.value })} />
            </div>
            <div className="w-full flex flex-row gap-4">
                <div className="mb-2 block flex-1">
                    <Label htmlFor="taluko" value="taluko" className="mb-2" />
                    <Select id="taluko" type="text" value={daan.taluko || ''}  required onChange={(e)=> setDaan({ ...daan , taluko : e.target.value })} >
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
                    <Select id="gaam" type="text" value={daan.gaam || ''}  required onChange={(e)=> setDaan({ ...daan , gaam : e.target.value })}  >
                        <option value="" disabled>Select</option>
                        {
                            daan.taluko && (
                                gaamOptions.map((talukaData) => {
                                    if (talukaData.taluka === daan.taluko) {
                                        return talukaData.villages.map((village, indx) => (
                                            <option key={indx} value={village || ''} >{village}</option>
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
            <TextInput id="mobileNumber" type="number" value={daan.mobileNumber || ''}  required onChange={(e)=> setDaan({ ...daan , mobileNumber : e.target.value})} />
            <div className="mb-2 block">
                <Label htmlFor="paymentMethod" value="Payment Method" />
            </div>
            <Select id="paymentMethod" type="text" value={daan.paymentMethod || ''}  required onChange={(e)=> setDaan({ ...daan , paymentMethod : e.target.value })}  >
                <option value="" disabled>Select</option>
                <option value="">Select</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
                <option value="upi">Upi</option>
            </Select>
            <div className="mb-2 block">
                <Label htmlFor="amount" value="Amount Given" />
            </div>
            <TextInput id="amount" type="number" value={daan.amount || ''}  required onChange={(e)=> setDaan({ ...daan , amount : e.target.value})} />

            <Button type="submit" gradientDuoTone={"purpleToBlue"} outline onClick={handleSubmit} >Save Changes</Button>
        </form>
        <span className="p-8 inline-block" >
        <Link to={"/"} className="flex items-center gap-4 text-gray-600 hover:underline hover:text-black whitespace-nowrap" ><HiOutlineArrowCircleLeft />Go Back</Link>
        </span>
        
      </div>
      </>
    );
}
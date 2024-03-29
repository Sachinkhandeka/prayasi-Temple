import { useState , useEffect } from "react";
import { Table, Alert, Modal, Button, Dropdown } from "flowbite-react";
import { HiOutlineExclamationCircle, HiOutlineEye } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";


export default function DaanComp() {
    const location = useLocation();
    const [ daans , setDaans ] = useState([]);
    const [ error , setError ] = useState(null);
    const [ success , setSuccess ] = useState(null);
    const [ showModal , setShowModal ] = useState(false);
    const [ deleteId , setDeleteId ] =  useState(null);
    const [ filterData , setFilterData ] = useState({
        sortDirection : 'asc',
        paymentMethod : '',
        taluko :  '',
    });

    useEffect(()=> {
        const getDaanData = async()=> {
            try {
                const response = await fetch("/api/daan/");
                const data = await response.json();

                if(!response.ok)  {
                    setError(data.message);
                    return;
                }
                setDaans(data.daans);
            }catch(err) {
                setError(err.message);
            }
            
        }
        getDaanData();
    },[deleteId]);

    //setdeleteId
    const handleSetDeleteId = (id) => {
        setDeleteId(id);
        setShowModal(true);
    }
    //handle delete
    const handleDelete = async()=> {
        setShowModal(false);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch(`/api/daan/delete/${deleteId}`,{ method : "DELETE" });
            const data = await response.json();
            if(!response.ok) {
                setError(data.message);
                setShowModal(false);
                return ;
            }
            setSuccess(data.message);
            setDeleteId(null);
        }catch(err) {
            setError(err.message);
        }
    }

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search);
        if(filterData.sortDirection !== '') {
            urlParams.set('sortDirection', filterData.sortDirection);
        }
        if(filterData.taluko !== '') {
            urlParams.set('taluko', filterData.taluko);
        }
        if(filterData.paymentMethod !== '') {
            urlParams.set('paymentMethod' , filterData.paymentMethod);
        }
        const searchQuery = urlParams.toString();

        const handleSearch = async()=>{
            try {
                const  response =  await fetch(`/api/daan/?${searchQuery}`);
                const  data = await response.json();

                if(!response.ok) {
                    setError(data.message);
                    return;
                }
                setDaans(data.daans);
            }catch(err) { 
                setError(err.message);
            }
        }
        handleSearch();
    },[filterData])
    

    return (
        <>
        {error && (<Alert color={"failure"} onDismiss={() => setError(null)} className="my-4 mx-auto sticky top-16 z-10" >{error}</Alert>)}
        {success && (<Alert color={"failure"} onDismiss={() => setSuccess(null)} className="my-4 mx-auto sticky top-16 z-10" >{success}</Alert>)}
        <div className="mb-10 p-10 md:flex md:items-center md:gap-4 md:flex-1" >
            <h1 className="text-2xl font-mono font-light" >Filters :</h1>
            <div className="border border-gray-500 rounded-lg px-5 py-2 mb-2 w-52 md:w-auto"  >
                <Dropdown label="by taluka" inline>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' : 'abdasa'})}>Abdasa</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' : 'anjar'})}>Anjar</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' :'bhachau'})}>Bhachau</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' :'bhuj'})} >Bhuj</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' :'gandhidham'})} >Gandhidham</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' : 'lakhpat'})} >Lakhpat</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' : 'mandvi'})} >Mandvi</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' :'mundra'})} >Mundra</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' : 'nakhatrana'})} >Nakhatrana</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'taluko' : 'rapar'})} >Rapar</Dropdown.Item>
                </Dropdown>
            </div>
            <div className="border border-gray-500 rounded-lg px-5 py-2 w-52 md:w-auto mb-2"  >
                <Dropdown label="by payment Method" inline>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'paymentMethod' : 'cash'})}>Cash</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'paymentMethod' : 'bank'})}>Bank</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'paymentMethod' :'upi'})}>Upi</Dropdown.Item>
                </Dropdown>
            </div>
            <div className="border border-gray-500 rounded-lg px-5 py-2 mb-2 text-center w-52 md:w-auto"  >
                <Dropdown label="by Latest-Oldest" inline>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'sortDirection' : 'asc'})}>Latest</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilterData({...filterData, 'sortDirection' : 'desc'})}>Oldest</Dropdown.Item>
                </Dropdown>
            </div>
        </div>
        { daans && daans.length > 0 ?  (
        <div className="overflow-x-auto m-4">
          <Table className="border border-slate-200 shadow-lg rounded-lg h-full" >
            <Table.Head >
              <Table.HeadCell>daata name</Table.HeadCell>
              <Table.HeadCell>seva</Table.HeadCell>
              <Table.HeadCell>gaam</Table.HeadCell>
              <Table.HeadCell>taluko</Table.HeadCell>
              <Table.HeadCell>Mobile Number</Table.HeadCell>
              <Table.HeadCell>payment Method</Table.HeadCell>
              <Table.HeadCell>amount</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            { daans && (daans.map((daan)=> (
            <Table.Body className="divide-y" key={daan._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    { daan.name }
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white whitespace-nowrap" >{ daan.seva }</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white" >{ daan.gaam }</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white" >{ daan.taluko }</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white" >{ daan.mobileNumber }</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white" >{ daan.paymentMethod }</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white" >{daan.amount ? parseFloat(daan.amount).toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'INR'
                }) : ''}</Table.Cell>
                <Table.Cell>
                    <div className="flex justify-between gap-4" >
                        <Link to={`/daan/${daan._id}`} className="font-medium text-cyan-600 dark:text-cyan-500">
                            <HiOutlineEye />
                        </Link>
                        <Link to={`/daan/edit/${daan._id}`} className="font-medium text-cyan-600 dark:text-cyan-500">
                            <FaPencil />
                        </Link>
                        <MdDelete onClick={()=> handleSetDeleteId(daan._id)} color="red" className="cursor-pointer"/>
                    </div>
                  
                </Table.Cell>
               </Table.Row>
            </Table.Body>
            ))) }
          </Table>
          <Modal show={showModal} onClose={()=> setShowModal(false)} popup size={"md"}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Data?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete}>{"Yes, I'm sure"}</Button>
                            <Button color="gray" onClick={()=> setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
        ) : ( <p className="text-2xl mx-auto my-10 text-center" >You does not have any data yet!</p> ) }
        </>
      );
    
}
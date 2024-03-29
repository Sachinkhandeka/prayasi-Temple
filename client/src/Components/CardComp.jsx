import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Dropdown, Modal, Button } from "flowbite-react";
import { HiOutlineArrowCircleLeft, HiOutlineExclamationCircle } from "react-icons/hi";

export default function CardComp() {
  const navigate = useNavigate();
    const { id } = useParams();
    const [ error , setError ] = useState(null);
    const [ daan , setDaan ] = useState([]);
    const [ showModal , setShowModal ] = useState(false);

    useEffect(()=> {
        const getData = async()=> {
            try{
                const response = await fetch(`/api/daan/${id}`);
                const data = await response.json();

                if(!response.ok) {
                    console.log(data.message);
                }
                setDaan(data.daan);
            }catch(err) {
                console.log(err.message);
            }
        }
        getData();
    }, [id]);
    
  //handle delete
  const handleDelete = async()=> {
      setShowModal(false);
      setError(null);
      try {
          const response = await fetch(`/api/daan/delete/${id}`,{ method : "DELETE" });
          const data = await response.json();
          if(!response.ok) {
              setError(data.message);
              setShowModal(false);
              return ;
          }
          navigate("/");
      }catch(err) {
          setError(err.message);
      }
  }

    return (
      <>
      {error && (<Alert color={"failure"} onDismiss={() => setError(null)} className="my-4 mx-auto" >{error}</Alert>)}
      { daan ?  (
        <Card className="w-full max-w-[80%] mx-auto my-4 p-4">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <Dropdown.Item>
              <Link
                to={`/daan/edit/${id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                onClick={()=> setShowModal(true)}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/"} className="flex items-center gap-2 text-gray-600" ><HiOutlineArrowCircleLeft />Go Back</Link>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="pb-10 ">
          <h5 className="mb-1 text-4xl font-mono font-semibold first-letter:uppercase text-gray-900 dark:text-white text-center">{ daan.name }</h5>
          <hr className="my-4" />
          <div className="md:grid md:grid-cols-2 md:gap-10" >
            <div className="my-2 py-4 md:border-none border-b border-b-slate-400" >
              <span className="text-lg font-bold">Seva : </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">{ daan.seva }</span>
            </div>
            <div className="my-2 py-4 md:border-none border-b border-b-slate-400" >
              <span className="text-lg font-bold">Amount : </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                {daan.amount ? parseFloat(daan.amount).toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'INR'
                }) : ''}</span>
            </div>
            <div className="my-2 py-4 md:border-none border-b border-b-slate-400" >
              <span className="text-lg font-bold">Gaam : </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">{ daan.gaam }</span>
            </div>
            <div className="my-2 py-4 md:border-none border-b border-b-slate-400" >
              <span className="text-lg font-bold">Contact Info : </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">{ daan.mobileNumber }</span>
            </div>
            <div className="my-2 py-4 md:border-none border-b border-b-slate-400" >
              <span className="text-lg font-bold">Taluko : </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">{ daan.taluko }</span>
            </div>
            <div className="my-2 py-4 md:border-none border-b border-b-slate-400" >
              <span className="text-lg font-bold">Payment Method : </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">{ daan.paymentMethod }</span>
            </div>
          </div>
        </div>
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
      </Card>
      ) : ( <p className="text-2xl mx-auto my-10 text-center" >No Data Found</p> ) }
      </>
    );
}
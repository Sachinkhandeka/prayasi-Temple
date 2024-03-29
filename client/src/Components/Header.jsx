import { TextInput, Navbar , Modal, Button } from "flowbite-react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [ searchTerm , setSearchTerm ] = useState('');

     //handle search 
     useEffect(()=> {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search]);

    const handleSearch = (e)=> {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/daan/search?${searchQuery}`);
    }
    return (
        <Navbar className="border-b-2 sticky top-0 z-20" >
            <form onSubmit={handleSearch} className="flex gap-4 flex-wrap items-center">
                <TextInput 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} 
                    className="" 
                />
                 <Button type="submit" onClick={handleSearch} ><HiOutlineSearch /></Button>
            </form>
            <Navbar.Toggle />
            <Navbar.Collapse >
                <Navbar.Link active={ location.pathname === "/" } as={"div"} >
                    <Link to="/" className="uppercase p-4" >Daan</Link>
                </Navbar.Link>
                <Navbar.Link active={ location.pathname === "/daan/create" } as={"div"} >
                    <Link to="/daan/create" className="uppercase p-4">create</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
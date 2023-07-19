import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AllHouses from '../Components/AllHouses';

const Home = () => {

    // get all houses
    const [houses, setHouses] = useState([]);
    useEffect(() => {
        fetchHouses();
    }, []);
    const fetchHouses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/houses');
            setHouses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // search functionality 
    const [searchText, setSearchText] = useState('')

    return (
        <div>
            {/* navibar */}
            <div className="mx-8">
                <div className="navbar bg-green-300 px-4">
                    <div className="flex-1">
                        <a href='/' className="btn btn-ghost normal-case text-xl">daisyUI</a>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search by city, bedroom ...." className="input input-bordered w-24 md:w-auto" />
                        </div>
                    </div>
                </div>
            </div>
            {/* navibar */}


            <div className='lg:mx-24'>
                <h3 className="text-3xl font-semibold">Houses</h3>
                {/* {
                    houses?.filter(house => house?.city?.toLowerCase().includes(searchText?.toLowerCase()))
                        .map(house =>
                            <AllHouses house={house} />
                        )
                } */}

                {
                    houses?.filter(house => {
                        const searchTextLC = searchText?.toLowerCase();
                        const cityMatch = house?.city?.toLowerCase().includes(searchTextLC);
                        const bedroomsMatch = house?.bedrooms.toString().toLowerCase().includes(searchTextLC);
                        const bathroomsMatch = house?.bathrooms.toString().toLowerCase().includes(searchTextLC);
                        const roomSizeMatch = house?.roomSize.toString().toLowerCase().includes(searchTextLC);
                        const availabilityDateMatch = house?.availabilityDate.toString().toLowerCase().includes(searchTextLC);

                        // Return true if any of the property values match the searchText (if they are not null or undefined)
                        return cityMatch || bedroomsMatch || bathroomsMatch || roomSizeMatch || availabilityDateMatch;
                    })
                        .map(house =>
                            <AllHouses house={house} />
                        )
                }

            </div>
        </div>
    )
}

export default Home
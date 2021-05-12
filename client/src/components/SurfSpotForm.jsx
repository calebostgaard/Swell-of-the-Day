import React, { useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import '../components/Main.css';


export default (props) => {

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [airTemp, setAirTemp] = useState("");
    const [waterTemp, setWaterTemp] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [waveHeight, setWaveHeight] = useState("");
    const [errors, setErrors] = useState([]); 

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/surfspots/create', {
            name,
            city,
            location,
            airTemp,
            waterTemp,
            windSpeed,
            waveHeight,
        })
            .then(res => {
                console.log(res);
                props.addToDom(res.data)
                setName("");
                setCity("");
                setLocation("");
                setAirTemp("");
                setWaterTemp("");
                setWindSpeed("");
                setWaveHeight("");
                // navigate(`/`)
            })
            .catch(err=> {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <div id='surf'>
                <p id="navButtons"><Link to = "/">Home</Link> | <Link to = "/myspots">My Spots</Link> | <Link to = "/new">Add my own surf spot</Link></p>
            </div>
            <hr/>
            <h5>Your go-to surf spot not here? Add it here and only you will be able to see it (shhh...🤫)</h5>
            <br/>
            <form class="row g-3" onSubmit={onSubmitHandler}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <div class="col-md-4">
                    <label class="form-label">Name: </label><br/>
                    <input class="form-control" type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">City: </label><br/>
                    <input class="form-control"type="text" onChange={(e)=>setCity(e.target.value)} value={city}/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Location (Lat/Lon Format): </label><br/>
                    <input class="form-control" type="text" onChange={(e)=>setLocation(e.target.value)} value={location}/>
                </div>
                <br/><br/><br/><br/>
                {/* <p>
                    <label>Air Temp: </label><br/>
                    <input type="text" onChange={(e)=>setAirTemp(e.target.value)} value={airTemp}/>
                </p>
                <p>
                    <label>Water Temp: </label><br/>
                    <input type="text" onChange={(e)=>setWaterTemp(e.target.value)} value={waterTemp}/>
                </p>
                <p>
                    <label>Wind Speed: </label><br/>
                    <input type="text" onChange={(e)=>setWindSpeed(e.target.value)} value={windSpeed}/>
                </p>
                <p>
                    <label>Wave Height: </label><br/>
                    <input type="text" onChange={(e)=>setWaveHeight(e.target.value)} value={waveHeight}/>
                </p> */}
                <div class="col-12">
                {name.length < 3?
                    <input type="submit" className="btn btn-info" value="Add SurfSpot" disabled /> :
                    <input type="submit" className="btn btn-info" value="Add SurfSpot" />
                }
                </div>
            </form>
        </div>
    )
}

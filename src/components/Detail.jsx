import React, { useEffect, useState } from 'react'
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import UnrecognizedID from './UnrecognizedID';


export default props => {
    const { details, fetchItem } = props
    const [surfspot, setSurfSpot] = useState({})
    const [exists, setExists] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/surfspot/" + props.id)
        .then(res => {
                fetchItem(res.data.location);
                setSurfSpot(res.data)}
                )
            .catch( ()=> {
                setExists(false)
            })
    }, []);

    const deleteSurfSpot = () => {
        axios.delete('http://localhost:8000/surfspot/' + props.id)
            .then(res => {
                console.log(res);
                navigate(`/`)
            })
    };

    const editLink = (surfspotId) => {
        navigate(`/edit/${surfspotId}`)
    }
    
    return (
        exists ?

        <div>
            <div id='surf'>
                <p id="navButtons"><Link to = "/">Home</Link> | <Link to = "/new">My Spots</Link> | <Link to = "/new">Add my own surf spot</Link></p>
            </div>            <hr/>
            <h3>{surfspot.name}</h3>
            <h5>Current Conditions</h5>
            {/* <p>City: {surfspot.city}</p>
            <p>Location: {surfspot.location}</p>
            <p>Air Temp: {details && details.weather[0].maxtempF} °F</p>
            <p>Water Temp: {details && details.weather[0].hourly[0].waterTemp_F} °F</p>
            <p>Wind Speed: {details && details.weather[0].hourly[0].windspeedMiles} mph</p>
            <p>Wave Height: {details && details.weather[0].hourly[0].swellHeight_ft} ft</p>
            <p>Sunrise: {details && details.weather[0].astronomy[0].sunrise}</p>
            <p>Sunset: {details && details.weather[0].astronomy[0].sunset}</p> */}

            <table className="table">
                <tr>
                    <th>City:</th>
                    <td>{surfspot.city}</td>
                    <th>Location:</th>
                    <td>{surfspot.location}</td>
                </tr>
                <tr>
                    <th>Air Temp:</th>
                    <td>{details && details.weather[0].maxtempF} °F</td>
                    <th>Water Temp:</th>
                    <td>{details && details.weather[0].hourly[0].waterTemp_F} °F</td>
                </tr>
                <tr>
                    <th>Wind Speed:</th>
                    <td>{details && details.weather[0].hourly[0].windspeedMiles} mph</td>
                    <th>Wave Height:</th>
                    <td>{details && details.weather[0].hourly[0].swellHeight_ft} ft</td>
                </tr>
                <tr>
                    <th>Sunrise:</th>
                    <td>{details && details.weather[0].astronomy[0].sunrise}</td>
                    <th>Sunset:</th>
                    <td>{details && details.weather[0].astronomy[0].sunset}</td>
                </tr>
            </table>
{/* 
            <br/>
            <button className="btn btn-danger" onClick={(e)=>{deleteSurfSpot(surfspot._id)}}>
                        Delete {surfspot.name}
            </button> 
            <button className="btn btn-primary" onClick={(e)=>{editLink(surfspot._id)}}>
                        Edit
            </button>  
            <br/> */}
        </div>

        :

        <UnrecognizedID />

    )
}
import React from 'react'
import { Link, navigate } from '@reach/router';

export default props => {

    return (
        <div>
            <div id='surf'>
                <p id="navButtons"><Link to = "/">Home</Link> | <Link to = "/myspots">My Spots</Link> | <Link to = "/new">Add my own surf spot</Link></p>
            </div>            <p>This page is not yet ready</p>
            <p>Would you like to add this surf spot to our database? If so, click <Link to = "/new">here!</Link></p>
            <p><Link to = "/">Go Home</Link></p>
        </div>
    )
}



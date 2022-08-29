import React from "react";
import Speakers from "./Speakers";
import Person1 from '../images/person1.jpg'
import Person2 from '../images/person2.jpg'
import Person3 from '../images/person3.jpg'

// This is the Box Component which contains all the Speaker components.

class Box extends React.Component
{
    render()
    {
        return(
            <div className="box-main">
                <h4>Box 1</h4>
                <Speakers 
                    imgUrl={Person1}
                    sname="Speaker 1"
                    time="09:45"
                    color="red"
                />
                <Speakers 
                    imgUrl={Person2}
                    sname="Speaker 2"
                    time="06:35"
                    color="blue"
                />
                <Speakers 
                    imgUrl={Person3}
                    sname="Speaker 3"
                    time="04:30"
                    color="yellow"
                />
            </div>
        )
    }
}

export default Box
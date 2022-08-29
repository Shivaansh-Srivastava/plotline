
// This component was meant to contain the highlighted words in the box as tag. Unfortunately, I was not able to implement that feature.

import React from "react";

class Tags extends React.Component
{
    render()
    {
        return(
            <div className="tag">
                <p>{this.props.tag}</p>
            </div>
        )
    }
}

export default Tags
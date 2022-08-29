import React, { useCallback, useEffect, useRef, useState } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact, useSelected } from "slate-react";
import Tags from './Tags'

// This is the Speaker Component. This contains the profile photo, the name, the time and the slate editor.

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: `There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassa don't look even slightly believable. If you are going to use a passage.` }],
    },
]



const customEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true,
        })

        return !!match
    },

    toggleBoldMark(editor) {
        const isActive = customEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },
}

const Speakers = (props) => {

    const [highWords, SHW] = useState([])

    //    const [sel] = useSelected()

    //    console.log(sel);

    const [editor] = useState(() => withReact(createEditor()))
    // console.log(editor);
    useEffect(() => {

        console.log(highWords);

    }, [highWords])

    const renderLeaf = useCallback(p => <Leaf {...p} color={props.color} h={highWords} SHW={SHW} />, [])
    return (
        <div className="speaker-main">
            <table className="speaker-table">
                <tr>
                    <td>
                        <img src={props.imgUrl} alt="pic" className="speaker-image" />
                    </td>
                    <td>
                        <h3 className="speaker-name">{props.sname}</h3>
                    </td>
                    <td>
                        <h6 className="speaker-time">{props.time}</h6>
                    </td>
                </tr>
            </table>



            <Slate editor={editor} value={initialValue} >
                <Editable
                    // onSelectCapture={(e)=>console.log(e)}
                    renderLeaf={renderLeaf}
                    className="speakers-editor"
                    // onSelect={(e=>console.log(e.target))}
                    onKeyDown={(event) => {
                        if (event.key === 'h' && event.ctrlKey === true) {
                            event.preventDefault()
                            customEditor.toggleBoldMark(editor)
                        }
                    }}
                />
            </Slate>

<div className="speaker-tag-area">

            {highWords.map((high=>(
                <Tags tag={high}/>
            )))}
</div>

        </div>
    )
}

const Leaf = ({ attributes, children, leaf, color, SHW }) => {
    if (leaf.bold) {
        SHW(prevState => [...prevState, leaf.text])
        return (
            <span
                {...attributes}
                style={{
                    backgroundColor: color
                }}
            >
                {children}
            </span>
        )
    }
    else {
        return (
            <span {...attributes}>
                {children}
            </span>
        )
    }
}

export default Speakers;
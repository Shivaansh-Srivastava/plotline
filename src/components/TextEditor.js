import React,{useCallback, useState} from "react";
import Icon from "react-icons-kit";
import { createEditor, Editor, Transforms,Text,Path } from "slate";
import {Slate,Editable,withReact, ReactEditor,useSlateStatic,useSelected,useFocused} from 'slate-react'
import {bold} from 'react-icons-kit/feather/bold'
import {italic} from 'react-icons-kit/feather/italic'
import {underline} from 'react-icons-kit/feather/underline'
import {list} from 'react-icons-kit/feather/list'
import {alignLeft} from 'react-icons-kit/feather/alignLeft'
import {alignCenter} from 'react-icons-kit/feather/alignCenter'
import {link} from 'react-icons-kit/feather/link'
import {image} from 'react-icons-kit/feather/image'
import {plus} from 'react-icons-kit/feather/plus'
import {BsParagraph} from 'react-icons/bs'

const initialValue=[
    {
        type: 'paragraph',
        children: [{ text: `There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, or randomised wowhich don't look even slightly believable. If you are going to use a passage. There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, or randowowhich don't look even slightly believable. If you are going to use a passage.`}],
      },
      {
        type: 'image',
        src: 'path/to/image',
        alt: 'This is my image',
        children: [{ text: '' }],
      }
]

const CustomEditor={

    isUnderlineMarkActive(editor){
        const [match]=Editor.nodes(editor,{
                match: n => n.underline===true,
                universal: true,
            })
            return !!match
    },

    isItalicMarkActive(editor){
        const [match]=Editor.nodes(editor,{
            match: n => n.italic===true,
            universal: true,
        })
        return !!match
    },

    isBoldMarkActive(editor){
        const [match]=Editor.nodes(editor,{
            match: n => n.bold===true,
            universal: true,
        })
        return !!match
    },

    isListMarkActive(editor){
        const [match]=Editor.nodes(editor,{
            match: n=>n.list===true,
            universal: true,
        })
        return !!match
    },

    isLinkBlockActive(editor){
        const [match]=Editor.nodes(editor,{
            match: n => n.link===true,
            universal: true,
        })
        return !!match
    },

    // isLeftAlignActive(editor){
    //     const [match]=Editor.nodes(editor,{
    //         match: n=>n.type==='alignLeft'
    //     })
    //     return !!match
    // },

    isCodeBlockActive(editor){
        const [match]=Editor.nodes(editor,{
            match: n=>n.type==='code',
        })
        return !!match
    },

    toggleItalicMark(editor){
        const isActive=CustomEditor.isItalicMarkActive(editor)
        Transforms.setNodes(
            editor,
            {italic: isActive?null:true},
            {match: n=> Text.isText(n),split: true}
        )
    },

    toggleListMark(editor){
        const isActive=CustomEditor.isListMarkActive(editor)
        Transforms.setNodes(
            editor,
            {list: isActive?null:true},
            {match: n=>Text.isText(n),split: true}
        )
    },

    toggleUnderlineMark(editor){
        const isActive=CustomEditor.isUnderlineMarkActive(editor)
        Transforms.setNodes(
            editor,
            {underline: isActive?null:true},
            {match: n=>Text.isText(n),split:true}
        )
    },

    toggleBoldMark(editor){
        const isActive=CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            {bold: isActive?null:true},
            {match: n=>Text.isText(n),split: true}
        )
    },

    toggleLinkBlock(editor){
        const isActive=CustomEditor.isLinkBlockActive(editor)
        Transforms.setNodes(
            editor,
            {link: isActive?null:true},
            {match: n=>Text.isText(n),split: true}
        )
    },

    // toggleAlignLeftBlock(editor){
    //     const isActive=CustomEditor.isLeftAlignActive(editor)
    //     Transforms.setNodes(
    //         editor,
    //         {type: isActive?null:'alignLeft'},
    //         {match: n=>Editor.isBlock(editor,n)}
    //     )
    // },

    toggleCodeBlock(editor){
        const isActive=CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            {type: isActive?null:'code'},
            {match: n=> Editor.isBlock(editor,n)}
        )
    },
}

const Texteditor = () =>{
    const [editor] = useState(() => withReact(createEditor()))

    const renderElement = useCallback(props => {
        switch(props.element.type){
            case 'code':
                return <CodeElement {...props} />
            // case 'alignLeft':
            //      return <LeftAlign {...props} />
            default:
                return <DefaultElement {...props} />
        }
    },[])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    },[])

    return(
        <Slate editor={editor} value={initialValue}>
            <div className="texteditor-toolbar">
                <button 
                onMouseDown={event => {
                    event.preventDefault()
                    CustomEditor.toggleBoldMark(editor)
                }}
                style={{marginLeft: '30px'}}
                className="toolbar-btn"
                >
                    <Icon icon={bold} />
                </button>
                <button
                    className="toolbar-btn"
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleItalicMark(editor)
                    }}
                >
                    <Icon icon={italic} />
                </button>
                <button
                    className="toolbar-btn"
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleUnderlineMark(editor)
                    }}
                >
                    <Icon icon={underline} />
                </button>
                <button
                    className="toolbar-btn"
                >
                    <Icon icon={alignLeft} />
                </button>
                <button
                    className="toolbar-btn"
                >
                    <Icon icon={alignCenter} />
                </button>
                <button
                    className="toolbar-btn"
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleListMark(editor)
                    }}
                >
                    <Icon icon={list} />
                </button>
                <button
                    className="toolbar-btn"
                    onMouseDown={event => {
                        event.preventDefault()
                        CustomEditor.toggleLinkBlock(editor)
                    }}
                >
                    <Icon icon={link} />
                </button>
                <button
                    className="toolbar-btn"
                >
                    <Icon icon={image} />
                </button>
                <button
                    className="toolbar-btn"
                >
                    <Icon icon={plus} />
                </button>
            </div>
            <Editable 
                className="richtext-editor"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                    if(!event.ctrlKey)
                    {
                        return
                    }

                    switch(event.key){
                        case '`':{
                            event.preventDefault()
                            CustomEditor.toggleCodeBlock(editor)
                            break
                        }

                        case 'b':{
                            event.preventDefault()
                            CustomEditor.toggleBoldMark(editor)
                            break
                        }

                        case 'i':{
                            event.preventDefault()
                            CustomEditor.toggleItalicMark(editor)
                            break
                        }

                        case 'u':{
                            event.preventDefault()
                            CustomEditor.toggleUnderlineMark(editor)
                            break
                        }

                    }
                }}
            />
        </Slate>
    )
}

const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
      }
    
    if(leaf.list)
    {
        return(
        <ul {...attributes}>
            <li {...attributes}>
                {children}
            </li>
        </ul>
        )
    }
    
    if (leaf.link) {
        let url=prompt('Enter URL')
        children = <a href={url} onClick={() => window.open(url,'_blank')}>{children}</a>
    }
    
      if (leaf.italic) {
        children = <em>{children}</em>
      }
    
      if (leaf.underline) {
        children = <u>{children}</u>
      }
    
      return <span {...attributes}>{children}</span>
}

const CodeElement = props => {
    return(
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

const LeftAlign = props => {
    return <p style={{ textAlign:'left' }}>{props.children}</p>
}

// const Link = props => {
//     return(
//         <a {...props.attributes}>{props.children}</a>
//     )
// }


export default Texteditor
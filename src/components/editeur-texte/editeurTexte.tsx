"use client"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, List, ListOrdered, Underline } from "lucide-react"
import React, { useEffect, useState } from "react"

const extensions = [
    StarterKit,
    TextStyleKit,     
    TextAlign.configure({ 
        types: ['heading', 'paragraph'] 
    })
]

interface Props {
    onChange: React.Dispatch<React.SetStateAction<string>>
    html?: string,
    isEditable?: boolean
}

const EditeurTexte = ({ onChange, html = "", isEditable = true }: Props) => {
    const [content, setContent] = useState<string>(`<p>Saisissez votre texte ici...</p>`)    

    const editor = useEditor({
        immediatelyRender: false,
        editable: isEditable,        
        extensions,
        content,
        onUpdate: ({editor}) => {
            const html = editor.getHTML();
            setContent(html); 
            onChange(html);
        }            
    })    
    
    useEffect(() => {
        if (html && editor) {            
            editor.commands.setContent(html);
        }
    }, [html, editor]);    

    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor?.isActive("bold") ?? false,
                canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor?.isActive("italic") ?? false,
                canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
                isUnderline: ctx.editor?.isActive("underline") ?? false,
                canUnderline: ctx.editor?.can().chain().toggleUnderline().run() ?? false,
                isBulletList: ctx.editor?.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
                isAlignCenter: ctx.editor?.isActive({ textAlign: 'center' }),
                isAlignLeft: ctx.editor?.isActive({ textAlign: 'left' }),
                isAlignRight: ctx.editor?.isActive({ textAlign: 'right' }),
                isAlignJustify: ctx.editor?.isActive({ textAlign: 'justify' }),                
            }
        }
    })

    return (        
        <div className={`rounded-3xl p-4 w-full flex flex-col items-start justify-start gap-4 ${isEditable ? "h-64 border border-red-4" : "h-auto"}`}>
            <div className="overflow-auto w-full flex-1">
                <EditorContent className="text-base text-gris-12 w-full h-full focus:outline-none max-xs:text-sm" editor={editor}/>
            </div>
            <div className={`w-full carousel-horizontal items-center justify-start space-x-4 group ${isEditable ? "carousel" : "hidden"}`}>
                <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    disabled={!editorState?.canBold}                  
                    className={`cursor-pointer size-6 rounded-lg carousel-item items-center justify-center tooltip tooltip-right transition duration-200 ease-in-out hover:bg-red-4 ${editorState?.isBold ? "bg-red-5" : "bg-transparent"}`} data-tip="bold"
                >
                    <Bold strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    disabled={!editorState?.canItalic}
                    className={`size-6 rounded-lg carousel-item items-center justify-center tooltip tooltip-right transition duration-200 ease-in-out hover:bg-red-5 ${editorState?.isItalic ? "bg-red-5" : "bg-transparent"}`} data-tip="Italic"
                >
                    <Italic strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    disabled={!editorState?.canUnderline}
                    className={`size-6 rounded-lg carousel-item items-center justify-center transition tooltip tooltip-right duration-200 ease-in-out hover:bg-red-5 ${editorState?.isUnderline ? "bg-red-5" : "bg-transparent"}`}  data-tip="Underline"
                >
                    <Underline strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}                        
                    className={`size-6 rounded-lg carousel-item items-center justify-center transition tooltip tooltip-right duration-200 ease-in-out hover:bg-red-5 ${editorState?.isBulletList ? "bg-red-5" : "bg-transparent"}`}  data-tip="bullet list"
                >
                    <List strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}                        
                    className={`size-6 rounded-lg carousel-item items-center justify-center transition tooltip tooltip-right duration-200 ease-in-out hover:bg-red-5 ${editorState?.isOrderedList ? "bg-red-5" : "bg-transparent"}`}  data-tip="Ordered List"
                >
                    <ListOrdered strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleTextAlign("justify").run()}                        
                    className={`size-6 rounded-lg carousel-item items-center justify-center transition tooltip tooltip-right duration-200 ease-in-out hover:bg-red-5 ${editorState?.isAlignJustify ? "bg-red-5" : "bg-transparent"}`}  data-tip="Justify"
                >
                    <AlignJustify strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleTextAlign("center").run()}                        
                    className={`size-6 rounded-lg carousel-item items-center justify-center transition tooltip tooltip-right duration-200 ease-in-out hover:bg-red-5 ${editorState?.isAlignCenter ? "bg-red-5" : "bg-transparent"}`}  data-tip="Center"
                >
                    <AlignCenter strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleTextAlign("left").run()}                        
                    className={`size-6 rounded-lg carousel-item items-center justify-center transition tooltip tooltip-right duration-200 ease-in-out hover:bg-red-5 ${editorState?.isAlignLeft ? "bg-red-5" : "bg-transparent"}`}  data-tip="Left"
                >
                    <AlignLeft strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>
                <button
                    type="button" 
                    onClick={() => editor?.chain().focus().toggleTextAlign("right").run()}                        
                    className={`size-6 rounded-lg carousel-item items-center justify-center transition tooltip tooltip-left duration-200 ease-in-out hover:bg-red-5 ${editorState?.isAlignRight ? "bg-red-5" : "bg-transparent"}`}  data-tip="Right"
                >
                    <AlignRight strokeWidth={1.5} className="size-4 stroke-red-8" />
                </button>                    
            </div>
        </div>        
    )
}

export default EditeurTexte

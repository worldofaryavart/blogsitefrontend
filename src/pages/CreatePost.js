import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Navigate} from "react-router-dom";


const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image',
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev){
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.append("file",files[0]);
    ev.preventDefault();
    
    const response = await fetch('https://blogsitebackend-2moy.onrender.com/post', {
      method:'POST',
      body: data, 
      credentials:'include',
    });
    if (response.ok){
      setRedirect(true);
    }
  }

  if (redirect){
     return <Navigate to ={'/'}/>
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="title" 
        placeholder={"Title"} 
        value= {title} 
        onChange={ev =>setTitle(ev.target.value)} />
      <input type="summary" 
        placeholder={"Summary"} 
        value={summary} 
        onChange={ev=>setSummary(ev.target.value)}/>
      <input type="file" 
        onChange={ev=>setFiles(ev.target.files)}/>
      <ReactQuill 
        value={content} 
        modules={modules} 
        formats = {formats}
        onChange={newValue=>setContent(newValue)} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}

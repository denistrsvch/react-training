import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/buttons/MyButton";

const AddPostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''});
    }

    return (
        <form>
            <MyInput
                type="text"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                placeholder="Post name"/>
            <MyInput
                type="text"
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})}
                placeholder="Post description"/>
            <MyButton onClick={addNewPost}>Add post</MyButton>
        </form>
    );
};

export default AddPostForm;
import React, {useState, useMemo} from "react";
import './styles/Clear.css';
import './styles/App.css'
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/buttons/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'h', body: 'b'},
        {id: 2, title: 'b', body: 'a'},
        {id: 3, title: 'a', body: 'c'},
        {id: 4, title: 'c', body: 'h'},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false)

    const sortedPosts = useMemo(() => {
        console.log('Function sorted posts');
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <AddPostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Posts list"/>
        </div>
    );
}

export default App;

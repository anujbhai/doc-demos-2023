import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Navbar from "./layout/Navbar";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import PostPage from "./features/posts/PostPage";
import "./App.css";
import EditPostForm from "./features/posts/EditPostForm";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }
          />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/editPosts/:postId" element={<EditPostForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

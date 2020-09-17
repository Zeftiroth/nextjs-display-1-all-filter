import { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from 'next/router'
import Comments from '../../components/comments'
import Navbar from '../../components/nav'

function Post() {
    const [post, setPost] = useState([])
    const router = useRouter();
console.log(router.query);
    useEffect(() => {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${router.query.post}`)
        .then((response) => {
          console.log(response.data);
          let tempPost = response.data;
          setPost(tempPost);
          console.log(post)
        }).catch((error) => {
          console.log(error)
        });
    }, [router]);

    return (
      <div className="jumbotron jumbotron-fluid pt-0">
      <Navbar />
        <div className="container mt-3">
          <div className="display-4">
            Post
          </div>
          <hr></hr>
          <a className="card  btn text-left mt-2">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{post.body}</p>
                <footer class="blockquote-footer">
                  post by userID: {post.userId}
                </footer>
              </blockquote>
            </div>
            <div></div>
          </a>
          <div>
            <Comments postId={post.id} />
          </div>
        </div>
      </div>
    );
}

export default Post

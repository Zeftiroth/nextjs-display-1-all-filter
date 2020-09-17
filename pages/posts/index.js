import { useEffect, useState } from "react";
import axios from "axios";

import Link from 'next/link'



function AllPost() {
const [posts, setPosts] = useState([])





useEffect(() =>{
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        console.log(response.data)
        let tempPost = response.data
        setPosts(tempPost)
    });

}, [])


    return (
      <div className="jumbotron jumbotron-fluid pt-2">
          <div className="container">

        <div className="display-4">List of all post</div >
        <hr></hr>
        <div>
          {posts.map((allpost) => {
            return (
              <Link href={`/posts/${allpost.id}`} id={allpost.id}>
                <a className="card  btn text-left my-2">
                  <div className="card-header">{allpost.title}</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{allpost.body}</p>
                      <footer class="blockquote-footer">
                        post by userID: {allpost.userId}
                      </footer>
                    </blockquote>
                  </div>
                  <div></div>
                </a>
              </Link>
            );
          })}
        </div>
          </div>
      </div>
    );
}

export default AllPost

import { useEffect, useState } from "react";
import axios from "axios";



function Comments(postId) {
    const [comments, setComments] = useState([])
    const [search, setSearch] = useState("")
    const [select, setSelect] = useState("")
    const [filteredComments, setFilteredComments] = useState([])
    console.log(postId)
    
    
    useEffect(() => {
        axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId.postId}`
        ).then(response => {
            console.log(response.data)
            let tempComments = response.data
            setComments(tempComments)
        }).catch(err => console.log(err));
    },[postId])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(search)
        console.log(select)
        if (select == "name") {

            const newCom = comments.filter(comment => comment.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            console.log(newCom)
            if (newCom.length == 0) {
                alert("Invalid Search Query")
            }

            else
            setFilteredComments(newCom)
        }
        else if (select == "email") {
            const newCom = comments.filter(
              (comment) =>
                comment.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            console.log(newCom);
            if (newCom.length == 0) {
              alert("Invalid Search Query");
            } 
            else 
            setFilteredComments(newCom);
        }
        else if (select == "body") {
            const newCom = comments.filter(
              (comment) =>
                comment.body.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            console.log(newCom);
            if (newCom.length == 0) {
              alert("Invalid Search Query");
            } 
            else 
            setFilteredComments(newCom);
            
        }

        

    }

    const handleFormChange = (e) => {
        let criteria = e.target.value
        console.log(criteria)
        setSearch( criteria)

    }

    const handleSelectChange = (e) => {
        let sel = e.target.value
        console.log(sel)
        setSelect(sel)
    }

    const resetFilter = (e) => {
        e.preventDefault()
        setFilteredComments([])
        setSearch("")
        setSelect("")
    }

    return (
      <div>
        <form onSubmit={handleSubmit} className="form-group mt-3">
          <div className="input-group mb-3">
            <select
              onChange={handleSelectChange}
              value={select}
              className="custom-select col-2"
              id="inputGroupSelect02"
            >
              <option selected>Choose...</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="body">Body</option>
            </select>
            <div className="input-group-append col-8 px-0">
              <input
                type="text"
                className="form-control"
                placeholder="Enter keywords to filter results..."
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                onChange={handleFormChange}
                value={search}
              ></input>
            </div>
            <button
              className="btn btn-outline-secondary col-2"
              type="submit"
              id="button-addon1"
            >
              Filter
            </button>
            <button
              className="btn btn-outline-secondary col-1"
              type="button"
              id="button-addon1"
              onClick={resetFilter}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-arrow-counterclockwise"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
              </svg>
            </button>
          </div>
        </form>

        {/* comments */}
        {filteredComments.length > 0
          ? filteredComments.map((fcom) => {
              return (
                <div id={fcom.id} className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{fcom.body}</p>
                    <footer class="blockquote-footer">
                      commented by : {fcom.name}
                    </footer>
                  </blockquote>
                </div>
              );
            })
          : comments.map((comment) => {
              return (
                <div id={comment.id} className="card">
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{comment.body}</p>
                      <footer class="blockquote-footer">
                        commented by : {comment.name}
                      </footer>
                    </blockquote>
                  </div>
                </div>
              );
            })}
      </div>
    );
}

export default Comments

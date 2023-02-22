import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
	 let limit = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  // Sort posts by title or body
  const sortedPosts = [...posts].sort((a, b) => {
    const isReversed = sortOrder === "asc" ? 1 : -1;
    return isReversed * a.title.localeCompare(b.title);
  });

  // Filter posts by title or body
  const filteredPosts = sortedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle sort order
  const toggleSortOrder = () =>
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or body"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={toggleSortOrder}>
        {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
      </button>
      <div className="row card">
        {currentPosts.map((post) => (
          
           <div className="col-lg-3 col-md-6 col-sm-12">
             <h3>{post.title}</h3>
            <p>{post.body}</p>
           </div>
          
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default BlogPosts;

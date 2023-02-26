import { Container, Row, Col, ListGroup, Pagination, Form, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';



function Blog() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const pageSize = 10;
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedPosts = currentPosts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return b[sortBy].localeCompare(a[sortBy]);
    }
  });

  const filteredPosts = sortedPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const bodyMatch = post.body.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || bodyMatch;
  });

  return (
    <Container>
    <Row>
      <Col>
        <Form>
          <Form.Group controlId="search" className='mb-5' style={{ width: '50%', alignItems: 'center', justifyContent: 'center', marginLeft:'250px', marginTop:'20px'}}>
            <Form.Control type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
          </Form.Group>
        </Form>
      </Col>
    </Row>
    <Row xs={1} md={2} className="g-4">
      {filteredPosts.map((post) => (
         <Col>
         <Card>
           <Card.Body>
             <Card.Title>{post.title}</Card.Title>
             <Card.Text>
             {post.body}
             </Card.Text>
           </Card.Body>
         </Card>
       </Col>
      ))}
    </Row>
    
    <Row>
      <Col>
        <Pagination style={{marginLeft:'350px', marginTop:'20px'}}>
          {[...Array(Math.ceil(posts.length / pageSize)).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              active={pageNumber + 1 === currentPage}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Col>
      <Col>
          {/* <Form.Group controlId="sort">
          <Form.Label>Sort by:</Form.Label>
          <Form.Control as="select" value={sortBy} onChange={handleSortBy}>
              <option value="title">Title</option>
              <option value="body">Body</option>
              </Form.Control>Form.Control
            </Form.Group> */}
            
             
              </Col>
      </Row>
      </Container>
     
  );
          }
  export default Blog;
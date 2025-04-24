import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { GET } from "../../apicontroller/ApiController";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./SearchResults.css"; // We'll create this stylesheet

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const result = await GET(`category/search?search=${encodeURIComponent(query)}`);
        setResults(result.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to load search results. Please try again.");
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="search-results-page">
      <Container fluid>
        {/* Page Header */}
        <div className="search-results-header">
          <h1 className="search-title">Search Results for: "{query}"</h1>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : results.length === 0 ? (
          <div className="no-results">
            <p>No results found for "{query}". Please try another search term.</p>
          </div>
        ) : (
          <Row className="results-container">
            {results.map((item) => (
              <Col md={3} sm={6} xs={12} key={item.id} className="mb-4">
                <Link 
                  to={`/product/${item.SuperCatgory}-${item.spc_id}/${item.title.replaceAll(" ", "-")}-${item.id}`}
                  className="product-card-link"
                >
                  <Card className="product-card">
                    <div className="product-image-container">
                      <img
                        src={`${process.env.REACT_APP_AWS_URL}${item.image}`}
                        alt={item.title}
                        className="product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    <Card.Body className="product-info">
                      <h3 className="product-title">{item.title}</h3>
                      <div className="product-category">{item.SuperCatgory}</div>
                      {item.price && (
                        <div className="product-price">${parseFloat(item.price).toFixed(2)}</div>
                      )}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default SearchResults;
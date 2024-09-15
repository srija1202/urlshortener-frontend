/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';


const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://urlshortener-backend-lja7.onrender.com/api/url/shorten',
        { longUrl: originalUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.shortUrl) {
        setShortUrl(response.data.shortUrl); // Set the shortUrl state if present
        toast.success('URL shortened successfully!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">URL Shortener</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOriginalUrl" className="mb-3">
              <Form.Label>Enter a long URL:</Form.Label>
              <Form.Control
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Shortening...' : 'Shorten URL'}
            </Button>
          </Form>

          {/* Show shortened URL if it exists */}
          {shortUrl && (
            <div className="mt-4">
              <Card>
                <Card.Body>
                  <Card.Title>Shortened URL:</Card.Title>
                  <Card.Text>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default URLShortener;

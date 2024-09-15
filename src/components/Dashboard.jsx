/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/url/clicked-urls',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUrls(response.data);
      } catch (error) {
        toast.error('Failed to load URLs. Please try again.');
      }
    };

    fetchUrls();
  }, [navigate]);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">Your Shortened URLs</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Original URL</th>
                <th>Click Count</th>
              </tr>
            </thead>
            <tbody>
              {urls.length > 0 ? (
                urls.map((url) => (
                  <tr key={url.shortUrl}>
                    <td>
                      <a href={`http://localhost:5000/api/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td>{url.longUrl}</td>
                    <td>{url.clicked}</td> {/* Display the click count */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No URLs found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;

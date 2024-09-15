/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ActivateAccount() {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const activateAccount = async () => {
      try {
        const { data } = await axios.get(`https://urlshortener-backend-lja7.onrender.com/api/auth/activate/${token}`);
        setMessage(data.message);
        toast.success(data.message);
      } catch (err) {
        const errorMessage = 'Account activation failed';
        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    };

    activateAccount();
  }, [token]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Account Activation</Card.Title>
          <Card.Text className="text-center">
            {message}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ActivateAccount;

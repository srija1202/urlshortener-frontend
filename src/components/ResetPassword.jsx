/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleChange = (e) => {
    setNewPassword(e.target.value);
    if (touched) {
      setError(validatePassword(e.target.value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });
      toast.success('Password reset successful');
      setNewPassword('');
    } catch (err) {
      toast.error('Error occurred');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Reset Password</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter new password"
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ResetPassword;

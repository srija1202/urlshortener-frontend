/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      {/* Card Component */}
      <Container className="mt-5">
        <Card className="text-center">
          <Card.Header>Welcome to the URL Shortener Application</Card.Header>
          <Card.Body>
            <Card.Title>Shorten Your URLs Effortlessly</Card.Title>
            <Card.Text>
              Create short, shareable links and track their usage with ease.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;

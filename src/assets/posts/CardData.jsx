import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Modal, Form, Card, Container, CardBody } from 'react-bootstrap';

const CardData = () => {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      try {
        fetch('https://dummyjson.com/carts')
          .then(res => res.json())
          .then(console.log);

        return response;
      } catch (error) {
        console.log(error);
      }
    },
  });
  fetch('https://dummyjson.com/carts')
    .then(res => res.json())
    .then(console.log);
  return (
    <>
      {/* Add Product Button */}
      <Button variant="success" className="m-3">
        Add Product
      </Button>
      {/*Product Form Modal */}

      <Modal>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {data?.map(({ title, id, thumbnail, price }) => (
        <Container>
          <Card className="w-25">
            <img src={thumbnail} className="w-100" />
            <CardBody>
              <blockquote className="blockquote mb-0">
                <h3>{title}</h3>
                <p>describtion</p>
                <p><small className="fs-6">{price}</small></p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">2 year aniversary</cite><br />
                  <button className="btn btn-primary mx-2">Update</button>
                  <button className="btn btn-danger">Delete</button>
                </footer>

              </blockquote>
            </CardBody>
          </Card>
        </Container>
      ))}
    </>
  );
};

export default CardData;

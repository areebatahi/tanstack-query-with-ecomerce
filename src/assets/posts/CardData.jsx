import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Modal, Form, Card, Container, CardBody } from 'react-bootstrap';
import Swal from 'sweetalert2'


const CardData = () => {
  const [show, setShow] = useState(false);
  const [updatePost, setUpdatePost] = useState({ title, category,price,images});
  const queryClient = useQueryClient();

  // Fetch products
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const json = await response.json();
        return json.products;
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    },
  });

  // Delete product
  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          method: "DELETE",
        });
        return response.json();
      } catch (e) {
        console.error("Error deleting product:", e);
      }
    },
    onSuccess: (data, id) => {
      console.log("Product deleted:", data);
      queryClient.setQueryData(["products"], (curEl) =>
        curEl.filter((product) => product.id !== id)
      );
    },
  });


  // Update product
  const UpdatePostMutation = useMutation({
    mutationFn: async (id, title, category, price, images) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, title, category, price, images })

        });
        return response.json();
      } catch (e) {
        console.error("Error updating product:", e);
      }
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(["products"], (curEl) =>
        curEl.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    },
  });

  const handleUpdate = async (id, currentTitle, currentCategory, currentPrice, currentImages) => {
    let newTitle = document.getElementById('')

    if (newTitle || newCategory || newImages) {
      UpdatePostMutation.mutate({
        id,
        title: newTitle,
        category: newCategory,
        images: [newImages], // Wrap in an array
        price: newPrice,
      });
    } else {
      alert("All fields are required for updating the product!");
    }
  }

    // Handle create button click
    const handleShowClick = () => {
      setShow(true); // Show the create form
    };

  return (
    <>
      <div className="container">
        {/* Add Product Button   */}
        <Button variant="success" className="m-3">Add Product</Button>

        {/* Product Form Modal  */}
        <div className="row">
          {data?.map(({ id, title, category, price, images }) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={id}>
              <Card className="h-100">
                <Card.Img variant="top" src={images[0]} alt={title} style={{ objectFit: "contain", maxHeight: "200px" }} />
                <Card.Body>
                  <h5>{title}</h5> <p>{category}</p><p>${price}</p>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={() => handleUpdate(id, title, category, price, images)}>
                      Update
                    </Button>
                    <Button variant="danger" onClick={() => deletePostMutation.mutate(id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
     
      <div className="card p-3">
        <form>
          <label for="newTitle">Title:</label>
          <input type="text" className="input" id="newTitle" name="title" required></input>

          <label for="newCategory">Category:</label>
          <input type="text" className="input" id="newCategory" name="category" required></input>

          <label for="newPrice">Price:</label>
          <input type="number" className="input" id="newPrice" name="price" required></input>

          <input type="file" id="newImage" name="image" required></input>

        </form>
        <button className="btn btn-success m-2">Update</button>
      </div>
    </>
  );
};


export default CardData;

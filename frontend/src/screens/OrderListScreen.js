import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { ordersList } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderlist = useSelector((state) => state.orderlist);
  const { loading, error, orders } = orderlist;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //const userDelete = useSelector((state) => state.userDelete);
  //const { success: successDelete } = userDelete;

  //useEffect(() => {}, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      console.log("reach this point");
      dispatch(ordersList());
      console.log("dispatch run");
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandlerSubmit = (id) => {
    console.log(id);
    if (window.confirm("Are You Sure")) {
      //dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h2>Order List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`admin/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandlerSubmit(order._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
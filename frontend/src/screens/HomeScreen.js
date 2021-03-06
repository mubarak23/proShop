import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Meta from "../components/Meta";
//import axios from "axios";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productAction.js";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate.js";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  //const [products, setProducts] = useState([]);
  //useEffect(() => {
  //const fetchProducts = async () => {
  //const { data } = await axios.get("api/products");
  //setProducts(data);
  //};
  //fetchProducts();
  //}, []);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;
  console.log(pageNumber);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        //<h2>Loading...</h2>
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;

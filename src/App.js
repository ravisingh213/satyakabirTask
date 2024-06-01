import React, { useEffect, useState } from 'react';
import "./App.css"
import axios from 'axios';
import { Button, Card, CardBody, CardTitle, } from 'reactstrap'
import FilterCanvas from './FilterCanvas';

function App() {
  const [productData, setProductData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isOpenFilterCanvas, setIsOpenFilterCanvas] = useState(false);

  const handleFilterCanvas = async () => {
    try {
      const response = await axios.get('https://server.framekarts.com/api/v1/filter/getAllfilterField');
      setFilterOptions(response.data)
    } catch (error) {
      console.log(error);
    }
    setIsOpenFilterCanvas(true)
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.post('https://server.framekarts.com/api/v1/filter/filterBothProductAndContactLens?term=&sortBy=&pages=1', {});
      setProductData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <FilterCanvas setProductData={setProductData} isOpenFilterCanvas={isOpenFilterCanvas} setIsOpenFilterCanvas={setIsOpenFilterCanvas} filterOptions={filterOptions} />
      <div className='m-5'>
        <div className='row mb-3'>
          <div>
            <Button color="primary" className="filtre-btn-float-right mx-2" onClick={() => { handleFilterCanvas() }}>
              Filters
            </Button>
            <Button color='info' className="filtre-btn-float-right">
              Sort
            </Button>
          </div>
        </div>
        <div className="row">
          {
            productData.length > 0 ? productData.map((product, index) => {
              return (
                <div className="col-md-3 col-sm-6 mb-4" key={index}>
                  <Card
                  >
                    <img
                      alt="Sample"
                      src="https://tse2.mm.bing.net/th?id=OIP.ewOcIkOuiaDZHO5UKI9pfAHaE6&pid=Api&P=0&h=180"
                    />
                    <CardBody>
                      <CardTitle tag="h5">
                        <div className='row'>
                          <div className='col'>
                            {product?.title}
                          </div>
                          <div className='col text-end'>
                            &#8377;{product?.price}
                          </div>
                        </div>
                      </CardTitle>
                    </CardBody>
                    <Button>
                      Add to Cart
                    </Button>
                  </Card>
                </div>
              )
            }) : <div className='text-center text-danger'><b>No Product Found</b></div>
          }
        </div>
      </div >
    </>
  );
}

export default App;

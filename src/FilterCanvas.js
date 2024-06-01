import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Spinner } from 'reactstrap'

export default function FilterCanvas({ setProductData, isOpenFilterCanvas, setIsOpenFilterCanvas, filterOptions }) {
    const [filterName, setFilterName] = useState('brands');
    const [filterData, setFilterData] = useState({ brands: [] });
    const [loading, setLoading] = useState(false);


    const setFilterNameFunc = (name) => {
        setFilterName(name);
        if (!filterData[name]) {
            setFilterData({ ...filterData, [name]: [] });
        }
    }

    const handleFilterOption = (e, id) => {
        const updatedFilterData = { ...filterData };
        if (e.target.checked) {
            updatedFilterData[filterName] = [...(updatedFilterData[filterName] || []), id];
        } else {
            updatedFilterData[filterName] = (updatedFilterData[filterName] || []).filter(item => item !== id);
        }
        setFilterData(updatedFilterData);
    }

    const handleFilter = async () => {
        setLoading(true)
        try {
            const response = await axios.post('https://server.framekarts.com/api/v1/filter/filterBothProductAndContactLens?term=&sortBy=&pages=1', filterData);
            setProductData(response.data.data);
            setFilterData({ brands: [] })
            setLoading(false)
            setIsOpenFilterCanvas(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const toggle = () => {
        setIsOpenFilterCanvas(!isOpenFilterCanvas)
    }
    return (
        <Offcanvas isOpen={isOpenFilterCanvas} toggle={toggle}>
            <OffcanvasHeader toggle={toggle}>
                Filter By
            </OffcanvasHeader>
            <OffcanvasBody>
                <Row>
                    <Col className='border-end'>
                        <strong className={`d-block mb-2 filteroption ${filterName === "brands" && "text-primary"}`} onClick={() => { setFilterNameFunc('brands') }} >
                            Brands
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "category" && "text-primary"}`} onClick={() => { setFilterNameFunc('category') }}>
                            Category
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "collection" && "text-primary"}`} onClick={() => { setFilterNameFunc('collection') }}>
                            collection
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "contactLensDisposable" && "text-primary"}`} onClick={() => { setFilterNameFunc('contactLensDisposable') }}>
                            contactLensDisposable
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "frameColor" && "text-primary"}`} onClick={() => { setFilterNameFunc('frameColor') }}>
                            frameColor
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "frameMaterial" && "text-primary"}`} onClick={() => { setFilterNameFunc('frameMaterial') }}>
                            frameMaterial
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "frameShape" && "text-primary"}`} onClick={() => { setFilterNameFunc('frameShape') }}>
                            frameShape
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "frameSize" && "text-primary"}`} onClick={() => { setFilterNameFunc('frameSize') }}>
                            frameSize
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "frameType" && "text-primary"}`} onClick={() => { setFilterNameFunc('frameType') }}>
                            frameType
                        </strong>
                        <strong className={`d-block mb-2 filteroption ${filterName === "gender" && "text-primary"}`} onClick={() => { setFilterNameFunc('gender') }}>
                            gender
                        </strong>
                    </Col>
                    <Col>
                        <FormGroup check>
                            {
                                filterOptions[filterName]?.map((filterOption, index) => {
                                    return (
                                        <div key={`${filterName}-${filterOption?._id}`}>
                                            <Label check key={`${filterName}-label-${filterOption?._id}`}>
                                                {filterOption.name}
                                            </Label>
                                            <Input
                                                id={`${filterName}-${filterOption?._id}`}
                                                type="checkbox"
                                                onChange={(e) => { handleFilterOption(e, filterOption?._id) }}
                                                checked={filterData[filterName]?.includes(filterOption?._id) || false}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </FormGroup>
                    </Col>
                </Row>
            </OffcanvasBody>
            <Button color="primary" onClick={handleFilter} disabled={loading}>
                {loading ?
                    <Spinner
                        color="light"
                        size="sm"
                    >
                        Loading...
                    </Spinner> : "Apply Filter"
                }
            </Button>
        </Offcanvas>
    )
}

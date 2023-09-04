import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import Colorful from '@uiw/react-color-colorful';

interface Props {
    fetchCategories: () => void
}

function AddNewCategoryModal({ fetchCategories }: Props) {

    const [name, setName] = useState('')
    const [color, setColor] = useState('#30296e')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const addTodo = () => {
        axios.post('http://localhost:8080/todoCategories', { name: name, color: color }).then(() => {
            fetchCategories()
        })
    }

    return (
        <>
            <Button className='modal-button' onClick={handleShow}>
                <PlusLg />
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Container className='p-2'>
                            <Row className="mb-2">
                                <Col xs="4"> <label>Name</label> </Col>
                                <Col xs="8"> <input style={{borderRadius: "7px"}} type="text" name="name" value={name} onChange={event => setName(event.target.value)} className='w-100' /> </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="4"><label>Color</label></Col>
                                <Col xs="8"><Colorful
                                    style={{ width: '100%' }}
                                    color={color}
                                    onChange={(color) => {
                                        setColor(color.hexa);
                                    }}
                                    disableAlpha={true}
                                />
                                </Col>
                            </Row>
                        </Container>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { addTodo(); handleClose(); }}>
                        Add category
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddNewCategoryModal
import React from "react"
import Form from 'react-bootstrap/Form';

const Languages = (props) => {
    return (
        <Form onChange={props.onChange}>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Example multiple select</Form.Label>
                <Form.Control as="select">
                    <option> --- Select --- </option>
                    <option value={'en'}> English </option>
                    <option value={'arbi'}> Arabic </option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

export default Languages
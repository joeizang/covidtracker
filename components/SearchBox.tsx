import { Fragment } from "react";
import { Form, Row } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";

function SearchBox() {
    return (
        <Fragment>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <Form>
                    <FormGroup as={Row}>
                        <Form.Label><b>Search Countries by Name or Code</b></Form.Label>
                        <Form.Control type="text" size="lg" placeholder="germany or NG code for Nigeria..."/>
                    </FormGroup>
                </Form>
            </div>
            <hr />
        </Fragment>
    )
}

export default SearchBox;
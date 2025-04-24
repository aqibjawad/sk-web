import React, {useState, useEffect} from"react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./Jobs.scss";
import { GET } from "../../apicontroller/ApiController"

export default function Jobs() {

  const [careers, setCareer]= useState([]);

  useEffect(() => {

    GET(`career`).then((result) => {
      setCareer(result)
    })

}, [])

  return ( 
    <div id="jobs">
      <h3 style={{textAlign:'center'}}> Soukcenter Careers </h3>

      <Row>
        <Col>
          <p style={{textAlign:'center', fontSize:'25px'}}> 
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
             dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
             It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
             desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Col>
        <Col>
         <img src="/career.jpg" style={{height:'500px', width:'100%'}} />
        </Col>
      </Row>



      <div className="py-5">
        {careers&&careers .map(career => (
          <div className="jobs ">
            <div style={{ backgroundColor: "#F0FFFF" }}>
              <Container>
                <Row className="py-3 d-flex justify-content-between ">
                  <Col md={5} className="heading text-center">
                    <Link to={`/career/${career.title.replaceAll(' ', '-').toLowerCase()}-${career.id}`}>
                      <h6> {career.title} </h6>
                    </Link>
                  </Col>
                  <Col md={3} className="text-center">
                    <h6 className="text-muted"> {career.type} </h6>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

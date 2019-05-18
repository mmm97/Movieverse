import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { labels } from '../../var';

export default class NotFoundError extends Component {
  render() {
    return (
      <Container className="container-padding-extra">
        <Row>
          <Col xs="12" className="text-center">
            <div className="title-medium">
              {labels[this.props.lang].pageNotFound}
            </div>
          </Col>
          <Col xs="12" className="text-center">
            <img src={require('../../img/monster_404.svg')} 
              width="35%" className="aux-page-img" alt="404" />
          </Col>
          <Col xs="12" className="text-center margin-top-10">
            <Link to="/" className="link">
              {labels[this.props.lang].toTheMainPage}
            </Link>
          </Col>
        </Row>
      </Container>
    )
  }
}
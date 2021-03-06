import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Datepicker from '../datepicker'
import ReactFlagsSelect from 'react-flags-select'
import Axios from 'axios'
import ReactLoading from 'react-loading'
import {backend} from '../../var'
import {setToken} from '../../cookies'
import 'react-flags-select/css/react-flags-select.css';
import { labels } from '../../var'

export default class Register extends Component  {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleButton = this.handleButton.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCountry = this.handleCountry.bind(this)
    this.state = {
      email: "",
      username: "",
      password: "",
      name: "",
      birthdate: new Date(),
      country: "PT",
      gender: labels[this.props.lang].female,
      validated: false,
      fail: false,
      failMessage: '',
      loading: false
    }
  }

  handleChange(e) {
    let m = {}
    m[e.target.name] = e.target.value
    this.setState(m)
  }

  handleCountry(c) {
    this.setState({country: c})
  }

  handleButton(e) {
    this.setState({validated: true})
  }

  handleSubmit(e) {
    this.register()
    e.preventDefault();
  }

  register() {
    this.setState({loading: true})

    let data = {}
    data.email = this.state.email
    data.username = this.state.username
    data.password = this.state.password
    data.name = this.state.name
    data.birthdate = this.state.birthdate
    data.country = this.state.country
    data.gender = this.state.gender

    Axios.post(backend + '/register', data).then(x => {
      if (x.status === 200) {
        this.setState({
          fail: false,
        })
        setToken(x.data)
        this.props.handleSession()
      }
    })
    .catch(x => {
      this.setState({
        fail: true,
        failMessage: x.response.data
      })
    })
    .then(() => this.setState({loading: false}))
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} validated={this.state.validated}>
        <InputGroup className="input-margin">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-at"></i></InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="username"
            type="text"
            placeholder={labels[this.props.lang].username} 
            aria-describedby="inputGroupPrepend" 
            pattern=".{3,30}" 
            title={labels[this.props.lang].usernamePattern}
            onChange={this.handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="input-margin">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-envelope"></i></InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="email"
            type="email" 
            placeholder={labels[this.props.lang].email} 
            onChange={this.handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="input-margin">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-user"></i></InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="name"
            type="text" 
            placeholder={labels[this.props.lang].name} 
            pattern=".{3,50}" 
            title={labels[this.props.lang].namePattern}
            onChange={this.handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="input-margin">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-key"></i></InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="password"
            type="password" 
            placeholder={labels[this.props.lang].password} 
            pattern=".{8,30}" 
            title={labels[this.props.lang].passwordPattern} 
            onChange={this.handleChange}
            required
          />
        </InputGroup>
        <InputGroup className="input-margin">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-key"></i></InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control 
            name="cpassword"
            type="password" 
            placeholder={labels[this.props.lang].cPassword} 
            pattern={this.state.password}
            title={labels[this.props.lang].passwordMatch}
            required
          />
        </InputGroup>
        <InputGroup className="input-margin">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-birthday-cake"></i></InputGroup.Text>
          </InputGroup.Prepend>
          <div style={{ marginTop: "-2px" }}>
            <Datepicker
              selected={this.state.birthdate}
              change={this.handleChange} />
          </div>
        </InputGroup>
        <Row >
          <Col xs="12" sm="6" style={{ 'marginBottom':'0.7em' }}>
          <div className="left-right">
              <span className="label-country">{labels[this.props.lang].country}</span>
            <ReactFlagsSelect
              name="country"
              searchable={true}
              defaultCountry="PT"
              searchPlaceholder={labels[this.props.lang].country} 
              showSelectedLabel={false}
              onSelect={this.handleCountry}
            />
          </div>
          </Col>
          <Col xs="12" sm="6">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-venus-mars"></i></InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control 
                as="select" 
                className="no-validator" 
                name="gender"
                onChange={this.handleChange}
                value={this.state.gender}>
                <option value="Female">{labels[this.props.lang].female}</option>
                <option value="Male">{labels[this.props.lang].male}</option>
                <option value="Other">{labels[this.props.lang].other}</option>
              </Form.Control>
            </InputGroup>
          </Col>
        </Row>
        <Row>
        { this.state.fail ?
          <Col md="8" xs="6">
            <div className="error-message">
              {this.state.failMessage}
            </div>
          </Col> : ""
        }
          <Col>
          {this.state.loading ? 
            <ReactLoading type="bars" color="#4d4d4d" width="34pt" height="29pt" className="float-right"/> :
            <Button 
              className="float-right"
              variant="secondary" 
              type="submit"
              onClick={this.handleButton}>
              {labels[this.props.lang].submit} 
            </Button>
          }
          </Col>
        </Row>
      </Form>
    )
  }
}
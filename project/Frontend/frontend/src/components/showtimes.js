import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import MovieCard from './movie-card'
import Select from 'react-select'
import Axios from 'axios'
import {selectStyles, theaters, backend} from '../var'
import Loading from './aux_pages/loading'

const theaters_ = []
Object.keys(theaters).forEach(x => theaters_.push({ value: x, label: x}))

export default class PeopleSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theater: 'Cinemas NOS Braga Parque',
      movies: [],
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.getShowtimes = this.getShowtimes.bind(this)
  }

  handleChange(v) {
    this.setState({
      theater : v.value
    })
    this.getShowtimes(v.value)
  }

  componentDidMount() {
    document.title = "Showtimes | Movieverse"
    this.getShowtimes(this.state.theater)
  }

  getShowtimes(t) {
    this.setState({
      loading: true
    })
    const query = '?theater=' + theaters[t]
    Axios.get(backend + '/showtimes' + query).then(x => {
      this.setState({
        movies: x.data,
        loading: false
      })
    })
  }

  buildCards() {
    let l = []
    this.state.movies.forEach(x => {
      l.push(
        <Col lg="2" md="3" xs="4" key={this.state.movies.indexOf(x)}>
          <MovieCard 
            small
            img={'http://image.tmdb.org/t/p/w200/' + x.poster}
            title={x.name}
            info={x.date}
            id={x.id}
          />
        </Col>
      )
    })
    return l
  }

  render() {

    let to_render

    if (this.state.loading) {
      to_render = <Loading />
    }
    else if (this.state.movies.length > 0) {
      to_render = this.buildCards()
    }
    else {
      to_render = 
        <Col>
          <p>No movies found</p>
        </Col>
    }

    return (
      <div>
        <Jumbotron fluid>
          <Container className="text-center">
            <h1 className="jumbotron-text">Showtimes</h1>
            <Row >
              <Col md={{ span: 6, offset: 3 }} className="input-margin">
                <Select
                  placeholder="Theater"
                  isSearchable
                  options={theaters_}
                  styles={selectStyles}
                  onChange={this.handleChange}
                  value={{value: this.state.theater, label: this.state.theater}}
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container className="container-padding">
          <div className="title-medium">
            {this.state.theater}
          </div>
          <Row>
            {to_render}
          </Row>
        </Container>
      </div>
    )
  }
}
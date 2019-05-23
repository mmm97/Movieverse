import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MovieCard from '../movie-card'
import Button from 'react-bootstrap/Button'
import { labels, backend } from '../../var';
import { getToken } from '../../cookies'
import Axios from 'axios';

const limit = 12;

export default class MoviesCard extends Component {
  
  constructor(props) {
    super(props)    
    this.state = this.resetState()
    this.handleChange = this.handleChange.bind(this)
    this.showMore = this.showMore.bind(this)
  }

  resetState() {
      return {
        currentTab: 'recent',
        recent: this.buildMovieCards(this.props.movies.recent),
        favourites: this.buildMovieCards(this.props.movies.favourites),
        watchlist: this.buildMovieCards(this.props.movies.watchlist),
        recommended: this.buildMovieCards(this.props.movies.recommended),
        current: 1,
        loading: false,
        showMore: this.props.movies.recent.length >= 12
      }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user)
      this.setState(this.resetState())
  }

  buildMovieCards(tab) {
    let l = []
    tab.forEach(x =>
      l.push(
        <Col xs="4" md="3" key={x.id}>
          <MovieCard
            full
            img={'http://image.tmdb.org/t/p/w200/' + x.poster}
            id={x.id}  
          />
        </Col>
      )
    )
    return l
  }

  handleChange(tab) {    
    this.setState({
      currentTab: tab,
      current: 1,
      showMore: this.state[tab].length >= limit
    })
  }

  showMore() {
    if (this.state.current * limit === this.state[this.state.currentTab].length) {
      this.setState({
        loading: true
      })
      const query = this.state.currentTab + '?begin=' + this.state.current * limit + '&limit=24'
      Axios.get(backend + '/profile/' + query,
          { headers: { Authorization: "Bearer " + getToken() } }).then(x => {
        this.setState({
          [this.state.currentTab]: this.state[this.state.currentTab].concat(this.buildMovieCards(x.data)),
          current: this.state.current + 1,
          loading: false,
          showMore: x.data.length === 24
        })
      })
    }
    else {
      this.setState({
        current: this.state.current + 1,
        showMore: ((this.state.current + 1) * limit > this.state[this.state.currentTab].length ? false : true)
      })
    }
  }

  render() {
    
    return (
      <div className="info-card" ref={(el) => { this.card = el; }}>
        <Row>
          <Col lg="3" onClick={() => this.handleChange('recent')}
            className={"card-title " + (this.state.currentTab === "recent" ? "selected" : "")}>
            {labels[this.props.lang].recent}
          </Col>
          <Col lg="3" onClick={() => this.handleChange('favourites')}
            className={"card-title " + (this.state.currentTab === "favourites" ? "selected" : "")}>
            {labels[this.props.lang].favourites}
          </Col>
          <Col lg="3" onClick={() => this.handleChange('watchlist')}
            className={"card-title " + (this.state.currentTab === "watchlist" ? "selected" : "")}>
            {labels[this.props.lang].watchlist}
          </Col>
          <Col lg="3" onClick={() => this.handleChange('recommended')}
            className={"card-title " + (this.state.currentTab === "recommended" ? "selected" : "")}>
            {labels[this.props.lang].recommended}
          </Col>
        </Row>
        <Row className="box">
          {this.state[this.state.currentTab].length > 0 ?
            this.state[this.state.currentTab].slice(0, this.state.current * limit) :
            <Col xs="12" className="text-center">
              <p>No movies yet</p>
            </Col>
          }
        </Row>
          <Button 
              variant="secondary" 
              size="sm" 
              className="button-slim" 
              disabled={this.state.loading || !this.state.showMore}
              onClick={this.showMore}
          >
            {!this.state.loading && this.state.showMore ? labels[this.props.lang].showMore : "" }
            {this.state.loading ? labels[this.props.lang].loading : ""}
            {!this.state.showMore ? labels[this.props.lang].noMoreResults : ""}
          </Button>
      </div>
    )
  }
}
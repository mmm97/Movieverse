import React, { Component } from 'react';
import Banner from './banner'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import SellingPoint from './selling-point'
import MovieCard from './movie-card'
import StatsItem from './stats-item'
import logo from '../img/logo.png'
import '../styles/FrontPage.css'
import Axios from 'axios';
import { backend, labels } from '../var';

export default class FrontPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        users: '',
        movies: '',
        members: '',
        comments: '',
        releases: [],
        cards: undefined
      }
    }
    this.getInfo()
  }

  getInfo() {
    Axios.get(backend + '/frontpage').then(x => {
      this.setState({
        data: x.data
      })
      this.buildCards()
    })
  }

  componentDidMount() {
    document.title = "Movieverse"
  }

  buildCards() {
    let m = [], n = []
    this.state.data.releases.forEach(x => {
      m.push(
        <Col xs="6" sm="4" md="3" lg="4" key={this.state.data.releases.indexOf(x)}>
          <MovieCard 
            img={'http://image.tmdb.org/t/p/w200/' + x.poster} 
            title={x.name} 
            info={x.date}
            id={x.id} />
        </Col>
      )
    })
    this.state.data.news.forEach(x => {
      n.push(
        <Col xs="12" sm={this.state.data.news.indexOf(x) === 2 ? "12" : "6"} lg="12" key={this.state.data.news.indexOf(x)}>
          <a href={x.link}>
            <Card className="news-card-compact">
              <Card.Img variant="top" src={x.image} />
              <Card.Body>
                <Card.Title className="card-title">
                  {x.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
      )
    })
    this.setState({
      movieCards: m,
      newsCards: n
    })
  }

  render() {
    return (
      <div>
        <Banner handleSession={this.props.handleSession} lang={this.props.lang} />
        <Container className="container-padding">
          <Row>
            <Col md="12" lg="6">
              <Row>
                <Col xs="12" className="title text-center">
                  {labels[this.props.lang].newReleases}
                </Col>
              </Row>
              <Row>
                {this.state.movieCards}
              </Row>
            </Col>
            <Col md="12" lg="6">
              <Row>
                <Col xs="12" className="title text-center">
                  {labels[this.props.lang].latestNews}
                </Col>
              </Row>
              <Row>
                {this.state.newsCards}
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="bg-light-gray">
          <Container className="container-padding">
            <div className="title">
              {labels[this.props.lang].joinMovieverse}
            </div>
            <Row>
              <Col lg="6">
                <SellingPoint 
                  img={require('../img/heart.png')} 
                  text={labels[this.props.lang].sellPoint1} />
              </Col>
              <Col lg="6">
                <SellingPoint 
                  img={require('../img/popcorn.png')} 
                  text={labels[this.props.lang].sellPoint2} />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <SellingPoint 
                  img={require('../img/notebook.png')} 
                  text={labels[this.props.lang].sellPoint3} />
              </Col>
              <Col lg="6">
                <SellingPoint 
                  img={require('../img/achievement.png')} 
                  text={labels[this.props.lang].sellPoint4} />
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="container-padding stats">
          <div className="title">
            {labels[this.props.lang].statistics}
          </div>
          <Row>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem 
                img={require('../img/girl.png')} 
                name={labels[this.props.lang].users}
                number={formatNumber(this.state.data.users)} />
            </Col>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem 
                img={require('../img/watch.png')} 
                name={labels[this.props.lang].movies} 
                number={formatNumber(this.state.data.movies)} />
            </Col>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem 
                img={require('../img/actor.png')} 
                name={labels[this.props.lang].members}
                number={formatNumber(this.state.data.members)} />
            </Col>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem 
                img={require('../img/comments.png')} 
                name={labels[this.props.lang].comments}
                number={formatNumber(this.state.data.comments)} />
            </Col>
          </Row>
        </Container>
        <div className="bg-light-gray">
          <Container className="container-padding">
            <div className="title">
              {labels[this.props.lang].aboutUs}
            </div>
            <Row>
              <Col lg="6">
                <div className="about-text">
                  {labels[this.props.lang].aboutUsText}
                </div>
              </Col>
              <Col lg="6" md="auto" className="text-right">
                <img src={logo} width="80%" alt="" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      )
  }
}

const formatNumber = (n) => {
  const s = n.toString()
  if (s.length >= 4 && s.length <= 6)
    return (Math.round(n / 1000)).toString() + 'k'
  else if (s.length >= 7)
    return (Math.round(n / 100000)).toString() + 'M'
  else
    return n
}
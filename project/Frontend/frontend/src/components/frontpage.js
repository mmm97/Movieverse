import React, { Component } from 'react';
import Banner from './banner'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SellingPoint from './selling-point'
import MovieCard from './movie-card'
import StatsItem from './stats-item'
import logo from '../img/logo.png'
import '../styles/FrontPage.css'
import Axios from 'axios';
import { backend } from '../var';

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
    let l = []
    this.state.data.releases.forEach(x => {
      l.push(
        <Col sm="3" xs="6" key={this.state.data.releases.indexOf(x)}>
          <MovieCard 
            img={'http://image.tmdb.org/t/p/w200/' + x.poster} 
            title={x.name} 
            info={x.date}
            id={x.id} />
        </Col>
      )
    })
    this.setState({
      cards: l
    })
  }

  render() {
    return (
      <div>
        <Banner handleSession={this.props.handleSession} />
        <Container className="container-padding">
          <div className="title">
            NEW RELEASES
          </div>
          <Row>
            {this.state.cards}
          </Row>
        </Container>
        <div className="bg-light-gray">
          <Container className="container-padding">
            <div className="title">
              JOIN MOVIEVERSE TODAY!
            </div>
            <Row>
              <Col lg="6">
                <SellingPoint img={require('../img/heart.png')} text="Get to know your friends' movie tastes" />
              </Col>
              <Col lg="6">
                <SellingPoint img={require('../img/popcorn.png')} text="Catch up with the hottest new releases" />
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <SellingPoint img={require('../img/notebook.png')} text="Keep track of your entire movie history" />
              </Col>
              <Col lg="6">
                <SellingPoint img={require('../img/achievement.png')} text="Earn achievements watching movies" />
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="container-padding stats">
          <div className="title">
            STATISTICS
          </div>
          <Row>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem img={require('../img/girl.png')} name="Users" number={this.state.data.users} />
            </Col>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem img={require('../img/watch.png')} name="Movies" number={this.state.data.movies} />
            </Col>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem img={require('../img/actor.png')} name="Members" number={this.state.data.members} />
            </Col>
            <Col xs="12" sm="6" lg="3" className="stats-margin">
              <StatsItem img={require('../img/comments.png')} name="Comments" number={this.state.data.comments} />
            </Col>
          </Row>
        </Container>
        <div className="bg-light-gray">
          <Container className="container-padding">
            <div className="title">
              ABOUT US
            </div>
            <Row>
              <Col lg="6">
                <div className="about-text">
                  Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Curabitur nec magna lorem.  Etiam quis sapien convallis, eleifend arcu vel,
                  euismod tellus. Suspendisse porttitor est
                  nibh, id semper enim eleifend in.
                  Aliquam erat volutpat. Etiam finibus dui sed nunc semper condimentum. Vestibulum quis nulla quis quam pulvinar porttitor. Nullam ut dignissim justo.
                  Aliquam erat volutpat. Etiam finibus dui sed nunc semper condimentum. Vestibulum quis nulla quis quam pulvinar porttitor. Nullam ut dignissim justo.
                  Aliquam erat volutpat. Etiam finibus dui sed nunc semper condimentum. Vestibulum quis nulla quis quam pulvinar porttitor. Nullam ut dignissim justo.
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
import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

export default class HorizontalSlider extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      content: this.props.content,
      moreLink: this.props.more,
      loadMore: this.props.loadMore
    }
  }


  render() {
    console.log(this.state.content)
    var content = this.state.content.map(function(entry, i) {
      return <div className="hitem" key={i}>
        <a href={entry.href} target="_blank">
          <Image className="movieThumbnail" src={entry.src} />
        </a>
      </div>
    });
    return <div className="hcontainer">
      { content }
      {
        this.state.loadMore ? (
          <div className="hitem">
          <Link to={this.state.moreLink} className="showMoreMedia vertical-align">
            Show More&#160;<i className="fas fa-plus-circle"></i>
          </Link>
        </div>
        ) : ""
      }

    </div>
  }
}
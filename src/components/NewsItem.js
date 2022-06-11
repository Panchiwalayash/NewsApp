import React, { Component } from 'react'

export class NewsItem extends Component {
   
    render() {
        let {title,description,imageUrl,newsUrl,author,time}=this.props;
        return (
        
                <div className="card " >
                <img src={imageUrl} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className='card-text'><small className='text-muted'></small> by {author} and {new Date(time).toUTCString()}</p>
                    <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
                </div>
                </div>
            
        )
    }
}

export default NewsItem

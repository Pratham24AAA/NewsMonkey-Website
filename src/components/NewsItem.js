import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date , source} = props ;
    return (
      <div>
        <div className="card my-3 mx-3"  >
            <span class="translate badge rounded-pill bg-primary" style={{display: 'flex', justifyContent: 'flex-end' , position: 'absolute', right: '0'}}> {source} </span>
            <img src={imageUrl} className="card-img-top" alt="..." style={{ width: '100%', height: '240px'}}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"Anonymous"} at {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
        </div>
    )
}

export default NewsItem



// href={newsURL}.....this statement is used to load a page on clicking the readmore button in webpage and since newsUrl is a js component we enclosed it in a {}
// target="_blank" is used to load the news on the new tab
// title... is just to print ... after the title that is written in the webpage similar is done with the description as well
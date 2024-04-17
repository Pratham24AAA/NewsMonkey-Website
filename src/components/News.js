import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        console.log("I am a constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey- ${this.capitalizeFirstLetter(this.props.category)} News`;
    }
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updatenews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c0a9e5d19d4869bb09c630e122c79f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, 
            totalResults: parsedData.totalResults, 
            loading: false })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updatenews();
    }

    handlePrevClick = async () => {
        // console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df84ad601e094f56988540507f2e0f2a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 }, () => {
            this.updatenews();
        });
    }

    handleNextClick = async () => {
        //         console.log("Next");
        //         if (!(this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize)))) {
        //             let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df84ad601e094f56988540507f2e0f2a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //             this.setState({ loading: true })
        //             let data = await fetch(url);
        //             let parsedData = await data.json();
        //             console.log(parsedData);
        //             this.setState({
        //                 page: this.state.page + 1,
        //                 articles: parsedData.articles,
        //                 loading: false
        //             }
        //         )
        //     }
        this.setState({ page: this.state.page + 1 }, () => {
            this.updatenews();
        });
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1},  async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f6c0a9e5d19d4869bb09c630e122c79f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ 
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false });
        ;})
    }

    render() {
        return (
            <>
                <h1 className="text-center " style={{marginTop: '70px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : "Following a dominating Super Tuesday from former President Donald Trump, former U.N. Ambassador Nikki Haley "} imageUrl={element.urlToImage ? element.urlToImage : "https://images.firstpost.com/uploads/2024/03/Xiaomi-14-14-Ultra-launched-in-India-SDG-8-Gen-3-Leica-Cameras-Check-price-specs-launch-offers-2024-03-685bb7004b26ad456357ddef0c271c16-1200x675.jpg?im=FitAndFill=(1200,675)"}
                                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>

            </>

        )
    }
}

export default News


// this.state.articles.map function is written to iterate over all the news present in our API
// .slice(0,45) to limit the characters in the box of a news  and similar with the description
// key={elemet.url} should be given to make each object unique therefore we passed url which is unique for each object in the array


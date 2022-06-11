import React, { Component } from 'react'
import NewsItem from './NewsItem';
import PropsTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';


export class News extends Component {
     
  
    static defaultproto={
      country:'in',
      pageSize:20,
      category:"technology"
    }

     static propsTypes={
       country:PropsTypes.string,
       pageSize:PropsTypes.number,
       category:PropsTypes.string
     }

    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title=`${this.props.category} - My Newsapp`
    } 

    async update(){
      this.props.setProgress(0);
      this.setState({loading:true})
      let Url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.props.setProgress(30);

      let data=await fetch(Url);
      let parseData=await data.json();
      this.setState({articles:parseData.articles,totalResult:parseData.totalResults,loading:false});
      this.props.setProgress(100);
    }
    async componentDidMount(){
      this.update();

    }

    clickPrevious=async()=>{
     
      this.setState({page:this.state.page-1})
      this.update();
    }
    clickNext=async()=>{

    this.setState({page:this.state.page+1})
    this.update();
  }

  fetchMoreData=async()=>{
    this.setState({page:this.state.page+1})
      let Url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data=await fetch(Url);
      let parseData=await data.json();
      this.setState({articles:this.state.articles.concat(parseData.articles),totalResult:parseData.totalResults,loading:false});
  }
    
    render() {
        return (
        
                <>
                <h1 className='text-center mt-2'>Newsapp - {this.props.category} top headline</h1>
              <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length!==this.totalResults}
              loader={<Spinner/>}
              >
               <div className="container">
              <div className='row  justify-content-center '> 
                {this.state.articles.map((elements)=>{
                  return <div className='card col-md-3 mx-2 my-2 ' style={{border:'none'}} key={elements.url}>
                  <NewsItem title={elements?elements.title:""} description={elements?elements.description:''} imageUrl={elements?elements.urlToImage:''} newsUrl={elements?elements.url:''}  author={!elements?elements.author:'unknown'} time={elements.publishedAt}/>
                </div>})
                } 
              </div>
              </div>
              </InfiniteScroll>
              </>
        )
    }
}

export default News

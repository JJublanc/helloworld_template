import React from 'react';
import articles from './articles/content.json';
import './BlogPage.css';
import {Link} from 'react-router-dom';

class Blog extends React.Component {
    render() {
        return (
            <div>
                <h1>Mon Blog</h1>
                {articles.map((article, index) => (
                    <ArticlePreview
                        key={index}
                        id={article.id}
                        title={article.title}
                        summary={article.summary}
                        image={require("" + article.image)}
                    />
                ))}
            </div>
        );
    }
}

class ArticlePreview extends React.Component {
    render() {
        return (
            <Link to={`/article/${this.props.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                <div className='article'>
                    <img src={this.props.image}
                         alt=""
                         height='10%'
                         width='10%'
                    />
                    <div>
                        <h2>{this.props.title}</h2>
                        <p>{this.props.summary}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Blog;
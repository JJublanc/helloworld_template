import React from 'react';
import image1 from './articles/pink-algae-5389441_1280.jpg'
import image2 from './articles/mountains-8540738_1280.jpg'
import './BlogPage.css'
class Blog extends React.Component {
    render() {
        return (
            <div>
                <h1>Mon Blog</h1>
                <Article
                    title="Article 1"
                    summary="Ceci est un résumé pour l'article 1."
                    image={image1}
                />
                <Article
                    title="Article 2"
                    summary="Ceci est un résumé pour l'article 2."
                    image={image2}
                />
            </div>
        );
    }
}

class Article extends React.Component {
    render() {
        return (
            <div className='article'>
                <img src={this.props.image}
                     alt="logo"
                     height='10%'
                     width='10%'/>
                <div>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.summary}</p>
                </div>
            </div>
        );
    }
}

export default Blog;
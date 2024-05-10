import '../App.css';
import React from 'react';
import { useParams } from 'react-router-dom';

function Article() {
  let { id } = useParams();
    return (
            <h1>Article {id}</h1>
    );
}

export default Article;
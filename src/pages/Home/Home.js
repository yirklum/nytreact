import React, { Component } from "react";
// import DeleteButton from "../../components/DeleteButton";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import {Form, Input, TextArea} from "../../components/Form";
import Search from "../../pages/Search"
import Results from "../../pages/Results"
import Saved from "../../pages/Saved"


class Home extends Component {
  state = {
    articles: [],
    savedArticles: [],
    title: "",
    startYear: "",
    endYear: "",
    isOpen: false
  };

    componentDidMount() {
        this.setState(
            {
                articles: [],
                title: "",
                startYear: "",
                endYear: ""
            }
        )
        this.loadSavedArticles();
    }

    loadArticles = (keyWord, startYear, endYear) => {
        API.getArticles(keyWord, startYear, endYear)
            .then(res =>
                this.setState(
                    { 
                        articles: res.data.response.docs, 
                        title: "", 
                        startYear: "", 
                        endYear: ""
                    })    
                )
            .catch(err => console.log(err));
    };

    saveArticle = obj => {
        API.saveArticle(obj)
            .then(res => this.loadSavedArticles())
            .catch(err => console.log(err));
            this.loadSavedArticles();
    };

    loadSavedArticles = () => {
        API.getSavedArticles()
            .then(res =>
                this.setState(
                    {
                        savedArticles: res.data
                    }    
                ))
                .catch(err => console.log(err));
    };
  
    deleteArticle = id => {
        API.deleteArticle(id)
        .then(res => this.loadSavedArticles())
        .catch(err => console.log(err));
        this.loadSavedArticles();
    };


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
        [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title)
            this.loadArticles(
                this.state.title, 
                this.state.startYear, 
                this.state.endYear)
    };

    toggleModal = () => {
      this.setState({isOpen: !this.state.isOpen})
    }



    render() {
        return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Search
                        keyWord={this.state.title}
                        onChangeSearch={this.handleInputChange}
                        searchName="title"
                        searchPlaceholder="Topic (required)"

                        startYear={this.state.startYear}
                        onChangeStartYear={this.handleInputChange}
                        startYearName="startYear"
                        startYearPlaceholder="Start Year (required)"

                        endYear={this.state.endYear}
                        onChangeEndYear={this.handleInputChange}
                        endYearName="endYear"
                        endYearPlaceholder="End Year (required)"

                        disabled={!(this.state.title)}
                        onClick={this.handleFormSubmit}
                    />    
            
                    <Results
                        articles={this.state.articles}
                        saveArticle={this.saveArticle}
                        toggleModal={this.toggleModal}
                    />    

                    <Saved
                        savedArticles={this.state.savedArticles}
                        delete={this.deleteArticle}
                    />
            
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Home;

import axios from "axios";

export default {

  // Get article with given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },

  // Delete article with given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },

  // Save article to database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  // Get saved articles
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },

  // Search NYT API
  getArticles: function(keyword, startYear, endYear) {
    
    const authKey = "fbcf0b26206c4b9aae7d6eb569789e46";

    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + 
    "&q=" + keyword + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "0101";
  

    return axios.get(queryURL);
  }
};

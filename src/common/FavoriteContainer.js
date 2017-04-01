import React, { Component } from 'react';
import * as api from './../api/api';
import Favorite from './Favorite';

class FavContainer extends Component {

  constructor() {
    super();
    this.state = { loading: true };
    this.setFavorite = this.setFavorite.bind(this);
    this.reactToData = this.reactToData.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    api.fetchFavoriteByWordId(this.props.wordId).then(this.reactToData);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.wordId !== nextProps.wordId) {
      this.setState({loading: true});
      api.fetchFavoriteByWordId(nextProps.wordId).then(this.reactToData);}
  }

  setFavorite(e) {
    e.stopPropagation();
    this.setState({loading: true});
    var oldFavData = this.state.favoriteData;
    var newFavValue = !oldFavData.isFavorite;

    return api.toggleFavoriteByWordId(newFavValue, oldFavData.wordId).then(this.reactToData);
  }

  reactToData(newData) {
    this.setState({favoriteData: newData, loading: false});
  }

  render() {
    var favData = this.state.favoriteData;
    return <Favorite favoriteData={favData} favoriteAction={this.setFavorite} loading={this.state.loading}/>;
  }
}

export default FavContainer;
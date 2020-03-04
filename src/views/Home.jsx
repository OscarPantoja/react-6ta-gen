import React, { Component } from 'react'

import AppLoading from '../components/AppLoading'
import PostList from '../components/PostList'
import api from '../Lib/Api'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      loading: true
    }
  }

  async componentDidMount(posts) {

      this.setState({
        loading: true
      })

      const payload = await api.getPosts(posts)

      this.setState({
        payload,
        loading: false
      })

  }

  render() {
    if (this.state.loading) return <AppLoading />

    return <PostList list={this.state.posts} />
  }
}

export default Home

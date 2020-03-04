import React, { Component } from 'react'

import PostForm from '../components/PostForm'

import api from '../Lib/Api'

class Post extends Component {
  async onSubmit (post) {
    const payload = await api.newPost(post)

    window.alert(JSON.stringify(payload))
  }

  render () {
    return (
      <PostForm
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

export default Post

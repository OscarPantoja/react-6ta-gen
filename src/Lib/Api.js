async function login(email, password) {
  try {
    const response = await window.fetch('http://localhost:8080/user/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const payload = await response.json()


    window.sessionStorage.setItem('authorization', payload.data.token)
    return payload
  } catch (error) {
    window.alert('Ocurrio un error al iniciar sesión')
    return {
      data: {
        token: ''
      }
    }
  }
}

async function validateSession(token) {
  if (!token) {

    return {
      data: {
        token: ''
      }
    }
  }
  try {
    const response = await window.fetch('http://localhost:8080/user/validate-session', {
      headers: { authorization: token }
    })
    const payload = await response.json()
    return payload
  } catch (error) {
    window.alert('Ocurrio un error al iniciar sesión')
    return {
      data: {
        token: ''
      }
    }
  }
}

async function getPosts(posts) {
  if (!posts) {
    return {
      data: {
        posts: []
      }
    }
  }
  try {
    const response = await window.fetch('http://localhost:8080/posts', {
      headers: { authorization: token }
    })
    const token = window.sessionStorage.getItem('authorization')
    const payload = await response.json()
    payload.data.posts = payload.data.posts.map((badPost) => ({
      image: badPost.imageUrl,
      title: badPost.title,
      text: badPost.description,
      readTime: badPost.readingTime
    }))
    return payload
  } catch (error) {
    window.alert('Ocurrio un error al obtener los posts')
    return {
      data: {
        posts: []
      }
    }
  }
}

async function newPost(post){
  try {
    const token = window.sessionStorage.getItem('authorization')
    const response = await window.fetch('http://localhost:8080/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({
        title: post.title,
        author: post.author,
        imageUrl: post.image,
        readingTime: post.readTime,
        description: post.description
      })
    })
    const payload = await response.json()
    return payload
  } catch (error) {
    window.alert('Ocurrio un error al guardar el post')
    return {
      data: {
        posts: {
          _id:'',
          title: '',
        author: '',
        imageUrl: '',
        readingTime: '',
        description: ''
        }
      }
    }
  }
}

const api = {
  login,
  validateSession,
  getPosts,
  newPost
}

export default api


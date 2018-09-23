import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'


import ScrollToTop from './components/ScrollToTop'
import Meta from './components/Meta'
import Home from './views/Home'
import About from './views/About'
import Blog from './views/Blog'
import SinglePost from './views/SinglePost'
import Contact from './views/Contact'
import NoMatch from './views/NoMatch'
import Nav from './components/Nav'
import Footer from './components/Footer'
import GithubCorner from './components/GithubCorner'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import data from './data.json'
import { slugify } from './util/url'
import { documentHasTerm, getCollectionTerms } from './util/collection'

const PUBLIC_KEY = 345657

const RouteWithMeta = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={routeProps => (
      <Fragment>
        <Meta {...props} />
        <Component {...routeProps} {...props} />
      </Fragment>
    )}
  />
)

class App extends Component {
  state = {
    data
  }
  onToken = token => {
    const data = {
      token:token,
      amount : 111,
      idempotency_key:uuid(),
    }
    console.log(token)
    fetch("/.netlify/functions/purchase", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => {
      response.json().then(data => {
        console.log(data)
        if(data.status=='succeeded'){
          alert(`payment was successful`);
          this.submit(this.encodeData(token))
        }
      });
    });
  }
  encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }
  encodeData=token=>{
    const names = Object.keys(this.state)
    const userDataStrings = names.map(name=>`${name} : ${this.state[name]}`)
    const userData = userDataStrings.join('\n')
    const tokenString = JSON.stringify(token,null,3).replace(/[^\w\s:_@.-]/g,'')
    return`
  ${userData}
  stripe payment meta-data:${tokenString}`
  }
  submit = (data) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: this.encode({ "form-name": "purchase", "data":data })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));
  };

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection] || []

  render () {
    const globalSettings = this.getDocument('settings', 'global')
    const {
      siteTitle,
      siteUrl,
      siteDescription,
      socialMediaCard,
      headerScripts
    } = globalSettings

    const posts = this.getDocuments('posts').filter(
      post => post.status !== 'Draft'
    )
    const categoriesFromPosts = getCollectionTerms(posts, 'categories')
    const postCategories = this.getDocuments('postCategories').filter(
      category => categoriesFromPosts.indexOf(category.name.toLowerCase()) >= 0
    )

    return (
      <Router>
        <div className='React-Wrap'>
          <ScrollToTop />
          <ServiceWorkerNotifications reloadOnUpdate />
          <GithubCorner url='https://github.com/Jinksi/netlify-cms-react-starter' />
          <Helmet
            defaultTitle={siteTitle}
            titleTemplate={`${siteTitle} | %s`}
          />
          <Meta
            headerScripts={headerScripts}
            absoluteImageUrl={
              socialMediaCard &&
              socialMediaCard.image &&
              siteUrl + socialMediaCard.image
            }
            twitterCreatorAccount={
              socialMediaCard && socialMediaCard.twitterCreatorAccount
            }
            twitterSiteAccount={
              socialMediaCard && socialMediaCard.twitterSiteAccount
            }
          />

          <Nav />

          <Switch>
            <RouteWithMeta
              path='/'
              exact
              component={Home}
              description={siteDescription}
              fields={this.getDocument('pages', 'home')}
            />
            <RouteWithMeta
              path='/about/'
              exact
              // render={(_)=>{
              //   return(
              //     <div>
              //       <StripeCheckout token={this.onToken} stripeKey={PUBLIC_KEY}/>
              //     </div>
              //   )
              // }}
              component={About}
              fields={this.getDocument('pages', 'about')}
            />
            <RouteWithMeta
              path='/contact/'
              exact
              component={Contact}
              fields={this.getDocument('pages', 'contact')}
              siteTitle={siteTitle}
            />
            <RouteWithMeta
              path='/blog/'
              exact
              component={Blog}
              fields={this.getDocument('pages', 'blog')}
              posts={posts}
              postCategories={postCategories}
            />

            {posts.map((post, index) => {
              const path = slugify(`/blog/${post.title}`)
              const nextPost = posts[index - 1]
              const prevPost = posts[index + 1]
              return (
                <RouteWithMeta
                  key={path}
                  path={path}
                  exact
                  component={SinglePost}
                  fields={post}
                  nextPostURL={nextPost && slugify(`/blog/${nextPost.title}/`)}
                  prevPostURL={prevPost && slugify(`/blog/${prevPost.title}/`)}
                />
              )
            })}

            {postCategories.map(postCategory => {
              const slug = slugify(postCategory.title)
              const path = slugify(`/blog/category/${slug}`)
              const categoryPosts = posts.filter(post =>
                documentHasTerm(post, 'categories', slug)
              )
              return (
                <RouteWithMeta
                  key={path}
                  path={path}
                  exact
                  component={Blog}
                  fields={this.getDocument('pages', 'blog')}
                  posts={categoryPosts}
                  postCategories={postCategories}
                />
              )
            })}

            <Route render={() => <NoMatch siteUrl={siteUrl} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

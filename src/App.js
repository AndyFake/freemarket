import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import Store from './views/Store'
import Cart from './views/Cart'
import ProductPage from './views/ProductPage'
import Checkout from './views/Checkout'
import StoreHeader from './components/StoreHeader'

import Home from './views/Home'
import About from './views/About'
import Blog from './views/Blog'
import SinglePost from './views/SinglePost'
import Contact from './views/Contact'
import NoMatch from './views/NoMatch'

import Footer from './components/Footer'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import Meta from './components/Meta'
import ScrollToTop from './components/ScrollToTop'

import data from './data.json'
import { slugify } from './util/url'
import { documentHasTerm, getCollectionTerms } from './util/collection'

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
  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection] || []

  getPages = () => {
    const shown = [...this.state.data.pages].filter(page=>page.show)
    console.log(shown)
    return shown
  }

  render () {
    // console.log(this.state.data)
    // this.getPages()
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
    const storeIsHome = this.getDocument('pages','home').show

    return (
      <Router>
        <div className='React-Wrap'>
          <ScrollToTop />
          <ServiceWorkerNotifications reloadOnUpdate />
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
          <StoreHeader 
            title={siteTitle}
            links={
              [
                'store',
                ...data.pages.filter(p=>p.show).map(p=>p.name)
              ]
            }
          />
          <Switch>
            <RouteWithMeta
              path='/'
              exact
              component={storeIsHome ? Home : Store}
              description={siteDescription}
              fields={storeIsHome ? 
                        this.getDocument('pages','home') :
                        this.getDocuments('products')
                      }
              title={storeIsHome?'Home':'Store'}            
            />
            <RouteWithMeta
              path='/store/'
              exact
              component={Store}
              description={siteDescription}
              fields={this.getDocuments('products')}
              title={'Store'}
            />
            <RouteWithMeta
              path='/cart/'
              exact
              component={Cart}
              description={siteDescription}
              title={'Cart'}
            />
            <RouteWithMeta
              path='/checkout/'
              exact
              component={Checkout}
              description={siteDescription}
              title={'Checkout'}
            />
            {this.getDocument('pages', 'about').show&&
            <RouteWithMeta
              path='/about/'
              exact
              component={About}
              fields={this.getDocument('pages', 'about')}
            />
            }
            {this.getDocument('pages', 'contact').show&&
            <RouteWithMeta
              path='/contact/'
              exact
              component={Contact}
              fields={this.getDocument('pages', 'contact')}
              siteTitle={siteTitle}
            />
            }
            {this.getDocument('pages', 'blog').show&&
            <RouteWithMeta
              path='/blog/'
              exact
              component={Blog}
              fields={this.getDocument('pages', 'blog')}
              posts={posts}
              postCategories={postCategories}
            />
            }
            {this.getDocument('pages', 'blog').show&&
            posts.map((post, index) => {
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

            {data.products.map(product => {
              const path = slugify(`/${product.title}`)
              return (
                <RouteWithMeta
                  key={path}
                  path={path}
                  exact
                  component={ProductPage}
                  fields={product}
                  title={product.productName}
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
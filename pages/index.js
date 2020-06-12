import Layout from '../components/Layout';
import Link from 'next/link';
import Header from '../components/Header';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import HomeCard from '../components/blog/HomeCard';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';

const Index = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {


  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const loadMore = () => {
      let toSkip = skip + limit;
      listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setLoadedBlogs([...loadedBlogs, ...data.blogs]);
              setSize(data.size);
              setSkip(toSkip);
          }
      });
  };
  const loadMoreButton = () => {
      return (
          size > 0 &&
          size >= limit && (
              <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                  Load More
              </button>
          )
      );
  };
  const showAllBlogs = () => {
      return blogs.map((blog, i) => {
          return (
            <Link href={`/blogs/${blog.slug}`}>
              <article id="home-card" key={i}>
                <HomeCard blog={blog} />
                <hr/>
              </article>
            </Link>
          );
      });
  };
  const showLoadedBlogs = () => {
      return loadedBlogs.map((blog, i) => (
          <article id="home-card" key={i}>
              <HomeCard blog={blog} />
          </article>
      ));
  };
    return (
      <Layout>
          <article className="home-container">
            <section>
                <Header/>
                  <img id="home-img" src="static/images/robot.png" alt="robot"/>
                  <h3 id="min-title">HERE AND NOW</h3>
                  <h1 id="maj-title">THE FUTURE</h1>
                  <div id="blue-box"></div>
                  <button id="button-go">Let's Go</button>
                  <p id="subtitle">For people that think about the future, about how to improve their lives, as well as the lives of others.</p>
                  <div id="angle-1"></div>
                  <p id="description-1">GRAPHENE EXOSKELETON</p>
                  <div id="angle-2"></div>
                  <p id="description-2">ARTIFICIAL INTELLIGENCE</p>
                  <div className="vr-1"></div>
                  <div className="vr-2"></div>
                  <div className="vr-3"></div>
            </section>
          </article>
          <main id="new-article-list">
              <div className="container-fluid">
                  <header style={{ marginTop: "10px", maxWidth: "1500px"}}>
                      <div className="col-md-12 pt-5">
                          <h1 className="display-4 font-weight-bold text-center">
                              What's New
                          </h1>
                      </div>
                  </header>
              </div>
              <div id="home-card-container">{showAllBlogs()}</div>
              <div>{showLoadedBlogs()}</div>
              <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
          </main>
      </Layout>
    );
};

Index.getInitialProps = () => {
    let skip = 0;
    let limit = 3;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default withRouter(Index);

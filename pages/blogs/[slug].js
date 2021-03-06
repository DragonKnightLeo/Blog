import Head from 'next/head';
import Link from 'next/link';
import HomeBar from '../../components/HomeBar';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';

const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn" style={{
                  color: "white",
                  fontFamily: 'Abel',
                  fontSize: "0.75rem",
                  textTransform: "lowercase"}}>{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn" style={{
                  color: "white",
                  fontFamily: 'Abel',
                  fontSize: "0.75rem",
                  textTransform: "lowercase"}}>{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
              <div id="article-layout">
              <HomeBar />
                <main id="article"></main>
                  <section id="article-container-header">
                    <div id="article-tags" style={{ color: "white"}}>
                        {showBlogCategories(blog)}
                        /
                        {showBlogTags(blog)}
                    </div>
                    <h1 className=" pb-2 text-centers" style={{ color: "white"}}>{blog.title}</h1>
                    <p className="mt-2 mark" id="article-written">
                        Written by{' '}
                        <Link href={`/profile/${blog.postedBy.username}`}>
                            <a>{blog.postedBy.username}</a>
                        </Link>{' '}
                        | Published {moment(blog.updatedAt).fromNow()}
                    </p>
                  </section>
                  <section id="article-container-img">
                      <div className="row" style={{  }}>
                          <img
                              src={`${API}/blog/photo/${blog.slug}`}
                              alt={blog.title}
                              className="img img-fluid featured-image"
                          />
                      </div>
                  </section>
                  <section id="article-container">
                      <div>{renderHTML(blog.body)}</div>
                  </section>
                  <div id="article-related-blogs">
                      <h4 className="text-center h2">Related blogs</h4>
                      <div className="row">{showRelatedBlog()}</div>
                  </div>
              </div>
            </Layout>
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleBlog;

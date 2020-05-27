import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    return (
        <div id="blog-list-card">
            <section id="blog-card-written">
                <p>
                    Written by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.username}</a>
                    </Link>{' '}
                    | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <header id="blog-card-title">
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h2>{blog.title}</h2>
                    </a>
                </Link>
            </header>
            <section id="blog-card-img-container">
              <img
                  id="blog-card-img"
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
              />
            </section>
            <section id="blog-card-content">
                <div  className="pb-3">{renderHTML(blog.excerpt)}</div>
                <Link href={`/blogs/${blog.slug}`}>
                  <span id="blog-card-button-container">
                    <a id="blog-card-button" className="pt-2">Read More</a>
                  </span>
                </Link>
            </section>
            <section id="blog-card-tags-cats">
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
            </section>
        </div>
    );
};

export default Card;

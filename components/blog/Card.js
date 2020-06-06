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
        <div>
            <section id="blog-card-img-container" style={{ backgroundImage: `url(${API}/blog/photo/${blog.slug})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "30% 50%"}}>
            </section>
            <section id="blog-card-written">
                <p>
                    Written by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.username}</a>
                    </Link>{' '}
                    | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section id="blog-card-content">
                <div className="blog-excerpt" style={{ fontSize: "0.9rem"}}>{renderHTML(blog.excerpt)}</div>
                <Link href={`/blogs/${blog.slug}`}>
                  <ul className="explore-more-container">
                    <li style={{ listStyleType: "none"}}>
                      <a className='animated-arrow'>
                        <span className='the-arrow -left'>
                          <span className='shaft'></span>
                        </span>
                        <span className='main'>
                          <span className='text'>
                            Explore More
                          </span>
                          <span className='the-arrow -right'>
                            <span className='shaft'></span>
                          </span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </Link>
            </section>
            <header id="blog-card-title-container">
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                      <h2 id="blog-card-title">{blog.title}</h2>
                    </a>
                </Link>
            </header>
            {/*<section id="blog-card-tags-cats">
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
            </section>*/}
        </div>
    );
};

export default Card;

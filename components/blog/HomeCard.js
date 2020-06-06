import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const HomeCard = ({ blog }) => {
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
          <section>
            <Link href={`/blogs/${blog.slug}`}>
              <span>
                <a className="home-card-read-more">Read More</a>
              </span>
            </Link>
          </section>
          <header>
              <Link href={`/blogs/${blog.slug}`}>
                  <a>
                      <h2 id="home-card-title" style={{ color: "white", fontFamily: "'Alegreya SC', serif"}}>{blog.title}</h2>
                  </a>
              </Link>
          </header>
        </div>
    );
};

export default HomeCard;

import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
    return (
      <Layout>
          <article className="overflow-hidden">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12 text-right">
                          <h1 id="header">
                              Azimuth Blog
                          </h1>
                          <p id="subheader">Are cryptocurrencies the money of the future or just another short term investment? What is hidden under the hood? This guide will show you the ins and outs of the crypto world.</p>
                      </div>
                      <div class="science">
                        <div class="isthis">
                          <span class="thisisscienceiguess"></span>
                          <span class="andthisistoo"></span>
                          <span class="thisistooofcourse"></span>
                        </div>
                      </div>
                  </div>
              </div>
          </article>
      </Layout>
    );
};

export default Index;

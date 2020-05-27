import Layout from '../components/Layout';
import Link from 'next/link';
import Header from '../components/Header';

const Index = () => {
    return (
      <Layout>
          <article className="Home">
            <section>
              <div className="container">
                <Header/>
                  <div className="row">
                      <div className="col-md-12 text-right">
                        <img id="home-img" src="static/images/robot.png" alt="robot"/>
                        <div className="vr-1"></div>
                        <div className="vr-2"></div>
                        <div className="vr-3"></div>
                        <h3 id="min-title">HERE AND NOW</h3>
                        <h1 id="maj-title">THE FUTURE</h1>
                        <div id="blue-box"></div>
                        <button id="button-go">Let's Go</button>
                        <p id="subtitle">For people that think about the future, about how to improve their lives, as well as the lives of others.</p>
                        <div id="angle-1"></div>
                        <p id="description-1">GRAPHENE EXOSKELETON</p>
                        <div id="angle-2"></div>
                        <p id="description-2">ARTIFICIAL INTELLIGENCE</p>
                      </div>
                    </div>
              </div>
            </section>
          </article>
      </Layout>
    );
};

export default Index;

import { SignUpButton } from "./sign-up-button";
import { siteName } from "./site";

const reasons = [
  "Tutorials by industry experts",
  "Peer & expert code review",
  "Coding exercises",
  "Access to our GitHub repos",
  "Community forum",
  "Flashcard decks",
  "New videos every week",
];

export default function Home() {
  return (
    <>
      <main>
        <article className="pricing" aria-labelledby="pricing-title">
          <section className="community">
            <h1 id="pricing-title">Join our community</h1>
            <p className="guarantee">30-day, hassle-free money back guarantee</p>
            <p className="pitch">Gain access to our full library of tutorials along with expert code reviews. Perfect for any developers who are serious about honing their skills.</p>
          </section>
          <section className="subscription" aria-labelledby="subscription-title">
            <h2 id="subscription-title">Monthly Subscription</h2>
            <p className="price"><span className="amount">$29</span> <span className="period">per month</span></p>
            <p className="value">Full access for less than $1 a day</p>
            <SignUpButton />
          </section>
          <section className="why-us" aria-labelledby="why-us-title">
            <h2 id="why-us-title">Why Us</h2>
            <ul>
              {reasons.map(reason => <li key={reason}>{reason}</li>)}
            </ul>
          </section>
        </article>
      </main>
      <footer><span className="site-name">{siteName}</span>. Challenge by <a href="https://www.frontendmentor.io/challenges/single-price-grid-component-5ce41129d0ff452fec5abbbc">Frontend Mentor</a>. Built by <a href="https://royeradames.com">Royer Adames</a>.</footer>
    </>
  );
}

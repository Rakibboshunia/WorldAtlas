import React from 'react'

const Contact = () => {
  return (
    <section className="section-contact">
      <h2 className="container-title">Contact Us</h2>

      <div className="contact-wrapper container">
        <form action="">
          <input
            type="text"
            className="form-control"
            required
            autoComplete="false"
            placeholder="Enter your name"
            name="username"
          />

          <input
            type="email"
            className="form-control"
            required
            autoComplete="false"
            placeholder="Enter your email"
            name="email"
          />

          <textarea
            className="form-control"
            rows="10"
            required
            autoComplete="false"
            placeholder="Enter your message"
            name="message"
          />
          <button type="submit" value="send">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact

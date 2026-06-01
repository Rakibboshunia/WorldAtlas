import toast from "react-hot-toast";
import { useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";

export const Contact = () => {
  const formRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData(formRef.current);
    const formInputData = Object.fromEntries(formData.entries());
    
    // Simulate API call/processing
    console.log("Submitted Data:", formInputData);
    
    // Show success toast
    toast.success(`Thanks for reaching out, ${formInputData.username}! We'll get back to you soon.`);
    
    // Clear the form fields
    formRef.current.reset();
  };

  return (
    <section className="section-contact">
      <h2 className="container-title">Contact Us</h2>

      <div className="contact-wrapper container">
        <form ref={formRef} onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name."
            name="username"
            required
            autoComplete="off"
          />

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email."
            name="email"
            required
            autoComplete="off"
          />

          <textarea
            className="form-control"
            rows="8"
            placeholder="Enter your message."
            name="message"
            required
            autoComplete="off"
          ></textarea>

          <button type="submit" className="btn-darken">
            Send Message <FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  );
};

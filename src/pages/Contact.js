import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <Wrapper>
      <h2 className="common-heading">Contact Page</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25822.003422461887!2d72.16744745960956!3d29.794549779455892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c8f03f6affdb3%3A0x1b9cf0432728b7c7!2sMailsi%2C%20Vehari%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1716966115776!5m2!1sen!2s"
        width="100%"
        height="400"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xayrzgrl"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              name="UserName"
              placeholder="username"
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="Email"
              placeholder="email"
              required
              autoComplete="off"
            />
            <textarea name="Message" placeholder="Enter you message"></textarea>
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

export default Contact;

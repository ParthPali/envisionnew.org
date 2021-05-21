import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NextSeo } from 'next-seo';
import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Contact() {
  const [email, setEmail] = React.useState('');
  const hcaptchaRef = React.useRef(null);

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Execute the hCaptcha when the form is submitted
    hcaptchaRef.current.execute();
  };

  const onHCaptchaChange = async (captchaCode) => {
    // If the hCaptcha code is null or undefined indicating that
    // the hCaptcha was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch('/api/hcaptcha', {
        method: 'POST',
        body: JSON.stringify({ email, captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        alert('Email registered successfully');
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || 'Something went wrong');
    } finally {
      // Reset the hCaptcha when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      setEmail('');
    }
  };

  return (
    <div className="max-h-full text-black bg-white">
      <NextSeo
        title="Contact | Project enVision U.S."
        description="Project enVision U.S. is a 501(c)-3 nonprofit organization dedicated to providing educational services to students everywhere."
        canonical="https://envisionnew.org/contact/"
        openGraph={{
          url: 'https://envisionnew.org/contact/',
          title: 'Project enVision U.S.',
          description:
            'Project enVision U.S. is a 501(c)-3 nonprofit organization dedicated to providing educational services to students everywhere.',
          site_name: 'Project enVision U.S.'
        }}
      />
      <Head>
        <title>Contact | Project enVision</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <section className="relative text-gray-600 body-font">
        <div className="container px-5 pt-24 pb-16 mx-auto">
          <div className="flex flex-col w-full mb-12 text-center">
            <h1 className="mb-6 text-6xl font-semibold text-black title-font">
              Contact Us
            </h1>
            <p className="mx-auto text-base text-xl font-semibold leading-relaxed text-gray-900 lg:w-2/3">
              Want to reach out? Fill out the form below and we'll get back to
              you as quickly as we can!
            </p>
          </div>
          <div className="mx-auto lg:w-1/2 md:w-2/3">
            <form
              action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfw7717IenntIJbLCOCfizrmu6g3mXIoKMR3ZVbyD_QrfUITw/formResponse"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap -m-2">
                <div className="w-1/2 p-2">
                  <div className="relative">
                    <label
                      for="contactName"
                      className="font-semibold leading-7 text-black text-md"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      placeholder="John Smith"
                      name="entry.314971597"
                      required
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                    ></input>
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="relative">
                    <label
                      for="contactEmail"
                      className="font-semibold leading-7 text-black text-md"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      onChange={handleChange}
                      placeholder="john@smith.com"
                      name="entry.2111510422"
                      required
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white bg-opacity-50 border border-gray-300 rounded outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                    ></input>
                  </div>
                </div>
                <div className="w-full p-2">
                  <div className="relative">
                    <label
                      for="contactMessage"
                      className="font-semibold leading-7 text-black text-md"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contactMessage"
                      name="entry.1147726578"
                      placeholder="Tell us what we can help you with!"
                      required
                      className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                    ></textarea>
                    <HCaptcha
                      id="test"
                      size="invisible"
                      ref={hcaptchaRef}
                      sitekey={process.env.HCAPTCHA_SITE_KEY}
                      onVerify={onHCaptchaChange}
                    />
                  </div>
                </div>
                <div className="w-full p-2">
                  <button
                    type="submit"
                    className="flex px-8 py-2 mx-auto text-lg text-black bg-white border-2 rounded"
                  >
                    Send
                  </button>
                </div>
                <div className="w-full p-2 pt-8 mt-8 text-center border-t border-gray-500">
                  <a className="text-indigo-500">support@envisionnew.org</a>
                  <p className="my-5 leading-normal">
                    San Jose, California, United States
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <br />
      <Footer link="https://github.com/envisionnew/envisionnew.org/edit/main/pages/contact.js" />
    </div>
  );
}

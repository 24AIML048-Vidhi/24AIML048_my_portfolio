import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from "./pages/Header";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import './App.css'

function App() {

  return (
    <>
      <Header name="Vidhi Patel" color="#0ea5e9" />
    <>
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>
    </>

      <div
        style={{
          height: "1px",
          width: "100%",
          background:"linear-gradient(to right, transparent, #7C3AED, #EC4899, transparent)",
        }}
      ></div>
      
      <section id="contact">
      <Footer
          name="Vidhi Patel"
          email="vidhipatel1796@gmail.com"
      />
      </section>
    </>
  )
}

export default App

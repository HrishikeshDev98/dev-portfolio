import React from 'react'
import Button from './form/Button'
import { FiGithub } from 'react-icons/fi'

const Banner = () => {
  return (
    <div className="section pt-[250px] h-full md:min-h-[90vh]  banner">
      <div className="container">
        <p className="text-base text-center font-light mb-2 text-light uppercase tracking-widest">
          Crafting Dynamic Web Solutions with Nextjs Expertise
        </p>
        <h2 className="heading mb-6 text-center text-light">
          Transorming Concepts into <br />
          Seamless <span className="text-secondary"> User Experiences</span>
        </h2>
        <p className="text-lg text-center font-light mb-6 text-light  tracking-widest">
          Hi! I’m Hrishikesh, a Next.js Developer based in India
        </p>
        <Button
          text="Github"
          className="max-w-fit flex mx-auto text-center"
          link="https://github.com/HrishikeshDev98"
          icon={<FiGithub />}
        />
      </div>
    </div>
  )
}

export default Banner

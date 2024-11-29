import React from 'react'
import "../css/final.css"
import  final  from "/assets/images/logo.png"

const Final = () => {
  return (
    <section className="final">
      <div>
        <div className="final-wrapper">
          <img src={final} alt="logo" />
          <h3>Thank You for using</h3>
          <h3>Kenko</h3>
        </div>
      </div>
    </section>
  )
}

export default Final

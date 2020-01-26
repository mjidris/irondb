import React from 'react'
import '../styles/Home.scss'

function Home() {
    return (
        <div className="Search">
        <body>
        <div className="container-fluid pt-3 pb-5" id="top-container">
            <div className="d-flex flex-row align-items-center justify-content-center mt-5 mb-2">
                <h1>Iron Meteorite Database</h1>
            </div>
            </div>
        <div className="container-fluid pt-3" id="bottom-container">
            <div className="d-flex flex-row align-items-center justify-content-center mt-5 mb-2">
                <h3>Start with a simple search:</h3>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center mb-4">
            <form action="/database" method="POST" class="border border-dark p-3">
                <div className="d-flex flex-row align-items-center justify-content-center ">
                <div className="col-md-3">
                    <label className="sr-only" for="name">Meteorite Name</label>
                    <input type="text" name="name" id="name" class="form-control" placeholder="meteorite name" />
                </div>
                <div className="col-md-2">
                    <label className="sr-only" for="group">group</label>
                    <select className="form-control" name="group">
                    <option value="group">group</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label className="sr-only" for="title">Paper Title</label>
                    <input type="text" name="title" id="title" class="form-control" placeholder="paper title" />
                </div>
                <div className="col-md-2">
                    <label className="sr-only" for="author">Author</label>
                    <input type="text" name="author" id="author" class="form-control" placeholder="author" />
                </div>
                <div className="col-md-2 col-sm-3">
                    <button className="btn btn-warning btn-block">Search</button>
                </div>
                </div>
            </form>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center mb-4">
            <h3> - or - </h3>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center">
            <a href="/database" class="btn btn-warning">Enter the Database</a>
            </div>
        </div>

        <div class="container-fluid fixed-bottom">
            <div class="d-flex flex-row align-items-center justify-content-center mb-0">
            <p><small>This website and work were created in partial fulfillment of Arizona State University Capstone Course “SER 401-402.”
                The work is a result of the Psyche Student Collaborations component of NASA’s Psyche Mission (<a href="https://psyche.asu.edu">https://psyche.asu.edu</a>).
                “Psyche: A Journey to a Metal World” [Contract number NNM16AA09C] is part of the NASA Discovery Program mission to solar system targets.
                Trade names and trademarks of ASU and NASA are used in this website for identification only.
                Their usage does not constitute an official endorsement, either expressed or implied, by Arizona State University or National Aeronautics and Space Administration.
                The content is solely the responsibility of the authors and does not necessarily represent the official views of ASU or NASA.
            </small></p>
            </div>
        </div>
        </body>
    </div>
    );
    
}

export default Home;
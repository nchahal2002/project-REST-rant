const React = require('react')
const Def = require('../default')

function show (data) {
    let comments = (
        <h3 className="inactive">
            No comments yet!
        </h3>
    )
    let rating = (
        <h3 className="inactive">
            Not yet rated
        </h3>
    )
    if (data.place.comments.length) {
        let sumRatings = data.place.comments.reduce((tot, c) => {
            return tot + c.stars
        }, 0)
        let averageRating = sumRatings / data.place.comments.length
        rating = (
            <h3>
                {Math.round(averageRating)} stars
            </h3>
        )
        comments = data.place.comments.map(c => {
            return (
                <div className="border">
                    <h2 className="rant">{c.rant ? 'Rant! ' : 'Rave! '}</h2>
                    <h4>{c.content}</h4>
                    <h3>
                        <strong>- {c.author}</strong>
                    </h3>
                    <h4>Rating: {c.stars}</h4>
                </div>
            )
        })
    }
    return (
        <Def>
            <main>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-sm-6">
                            <img src={ data.place.pic } alt={ data.place.name } />
                            <h3>
                                Located in {data.place.city}, {data.place.state}
                            </h3>
                        </div>
                        <div className="col-sm-6">
                            <h1>{ data.place.name }</h1>
                            <h2>Rating</h2>
                            {rating}
                            <h2>Description</h2>
                            <h3>
                                {data.place.showEstablished()}
                            </h3>
                            <h4>
                                Serving {data.place.cuisines}
                            </h4>
                            <p>Located in { data.place.city }, { data.place.state } and serving { data.place.cuisines }</p>
                        </div>
                        <div className="btn btn danger">
                            <a href={`/places/${data.id}/edit`} className="btn btn-warning">
                                Edit
                            </a>
                        </div>
                        <form method="POST" action={`/places/${data.id}?_method=DELETE` }>
                            <button type="submit" className="btn btn-danger">
                                Delete
                            </button>
                        </form>
                        <div className="row">
                            <h2>Comments</h2>
                            {comments}
                        </div>
                        <form method="POST" action={`/places/${data.place.id}/comment`}>
                            <div className="row">
                                    <h2>Got your Own Rant or Rave?</h2>
                                    <label htmlFor="content">Content</label>
                                    <input type="textarea" className="form-control" id="content" name="content" />
                                    <div className="col-sm-5">
                                        <label htmlFor="author">Author</label>
                                        <input type="text" className="form-control" id="author" name="author" />
                                    </div>
                                <div className="col-sm-4">
                                    <label htmlFor="stars">Star Rating</label>
                                    <div className="row">
                                        <input type="range" id="stars" name="stars" min="0.0" max="5.0" />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <label htmlFor="rant">Rant?</label>
                                    <div className="row">
                                        <input type="checkbox" id="rant" name="rant" />
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Add Comment!" />
                        </form>
                    </div>
                </div>
            </main>
        </Def>
    )
}

module.exports = show
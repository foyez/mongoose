const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

mongoose
  .connect('mongodb://foyez:testpass1@ds111648.mlab.com:11648/foyez-mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 20
  },
  // genre: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Genre'
  // },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  });

  return schema.validate(movie);
}

const createGenre = async name => {
  try {
    const genre = new Genre({ name });
    const result = await genre.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const createMovie = async (title, genreId, numberInStock, dailyRentalRate) => {
  const movieObj = { title, genreId, numberInStock, dailyRentalRate };
  const { error } = validateMovie(movieObj);
  if (error) {
    console.log(error.details[0].message);
    return;
  }

  try {
    const genre = await Genre.findById(genreId);
    if (!genre) {
      console.log('Invalid genre.');
      return;
    }

    const movie = new Movie({
      title,
      // HYBRID
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock,
      dailyRentalRate
    });
    const result = await movie.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createGenre('Sci-fi');
createMovie('Terminator', '5e57ef2c5f08a2268d5dfd53', 0, 0);
// createMovie('Terminator', new Genre({ name: 'Sci-fi' }), 0, 0);

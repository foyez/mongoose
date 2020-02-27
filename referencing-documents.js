const mongoose = require('mongoose');

mongoose
  .connect('mongodb://foyez:testpass1@ds111648.mlab.com:11648/foyez-mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB', err));

const Author = mongoose.model(
  'Author',
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  })
);

const createAuthor = async (name, bio, website) => {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
};

const createCourse = async (name, author) => {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
};

const listCourses = async () => {
  const courses = await Course.find()
    // .populate('author')
    // .populate('category', 'name')
    .populate('author', 'name -_id') // include: name & exclude: -name
    .select('name author');
  console.log(courses);
};

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')
// createCourse('Node Course', '5e57ce18a1eafb117a0061ba');

listCourses();

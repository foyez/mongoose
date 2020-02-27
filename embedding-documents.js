const mongoose = require('mongoose');

mongoose
  .connect('mongodb://foyez:testpass1@ds111648.mlab.com:11648/foyez-mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    // author: authorSchema
    // author: {
    //   type: authorSchema,
    //   required: true
    // }
    authors: [authorSchema]
  })
);

const createCourse = async (name, authors) => {
  try {
    const course = new Course({
      name,
      authors
    });

    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const listCourses = async () => {
  const courses = await Course.find();
  console.log(courses);
};

const updateAuthor = async courseId => {
  try {
    // const course = await Course.findById(courseId);
    // course.author.name = 'Mosh Hamedani';
    // course.save();

    // const course = await Course.updateOne(
    //   { _id: courseId },
    //   {
    //     $set: {
    //       'author.name': 'John Smith'
    //     }
    //   }
    // );

    const course = await Course.updateOne(
      { _id: courseId },
      {
        $unset: {
          author: ''
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
};

const removeAuthor = async (courseId, authorId) => {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
};

// createCourse('Node Course', new Author({ name: 'Mosh' }));
// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'John' })]);
// updateAuthor('5e57d87695e099195683fdfd');
// addAuthor('5e57e692bf9b4720421c9aea', new Author({ name: 'Foyez' }));
removeAuthor('5e57e9588e3ada229ce4c196', '5e57e9588e3ada229ce4c194');

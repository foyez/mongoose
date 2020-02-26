const mongoose = require('mongoose');

mongoose
  .connect('mongodb://foyez:testpass1@ds111648.mlab.com:11648/foyez-mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then('Connected to MongoDB...')
  .catch(err => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema(
  {
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'React.js Course',
    author: 'Mosh',
    tags: ['react', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  /* COMPARISON OPERATORS */
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  /* LOGICAL OPERATORS */
  // or
  // and

  // PAGINATION
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 }})
    // .find({ price: { $in: [10, 15, 20 ]}})
    // .find()
    // .or([{ author: 'Mosh' }, { isPublished: true }])
    // .find({ author: /^Mosh/ }) // Starts with Mosh (REGEX)
    // .find({ author: /Hamedani/ }) // Ends with Hamedani (REGEX)
    .find({ author: /.*Mosh.*/i }) // Contains Mosh
    // .limit(10)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  // .countDocuments();
  console.log(courses);
};

getCourses();

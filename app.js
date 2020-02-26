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
    isPublished: Boolean,
    price: Number
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'Golang Course',
    author: 'Colt Steel',
    tags: ['golang', 'backend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
};
// createCourse();

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
// getCourses();

const updateCourse = async id => {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()
  /*
  const course = await Course.findById(id);
  if (!course) return;

  // course.isPublished = true;
  // course.author = 'Another Author';
  course.set({
    isPublished: true,
    author: 'Another Author'
  });

  const result = await course.save();
  console.log(result);
  */

  // Approach: update first
  // Update directly
  // Optionally: get the updated document
  // const result = await Course.updateOne(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: 'Mosh',
  //       isPublished: false
  //     }
  //   }
  // );
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Jason',
        isPublished: true
      }
    },
    { new: true }
  );
  console.log(course);
};
updateCourse('5e569bf1695050374d5df5ad');

// Get all the published backend courses,
// that are $15 or more,
// or have the word 'js' in name
// sort them by their price in descending order,
// pick only their name, price and author,
// and display them
const exercise1 = async () => {
  const courses = await Course.find({ tags: 'backend', isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*js.*/ }])
    // .sort({ name: 1 })
    .sort('-price')
    .select({ name: 1, author: 1, price: 1 });
  console.log(courses);
};
// exercise1();

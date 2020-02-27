// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY
let author = {
  name: 'Mosh Hamedani'
};

let course = {
  author: 'id'
};

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
  author: {
    name: 'Mosh Hamedani'
  }
};

// Hybrid
let author = {
  name: 'Mosh'
  // 50 other properties
};

let course = {
  author: {
    id: 'ref',
    name: 'Mosh'
  }
};

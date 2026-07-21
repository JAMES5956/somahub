export interface Resource {
  id: number;
  title: string;
  grade: string;
  subject: string;
  type: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  featured: boolean;
  thumbnail: string;
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "Grade 8 Mathematics Exams",
    grade: "Grade 8",
    subject: "Mathematics",
    type: "Exams",
    description: "Term 2 Examination with Marking Scheme.",
    price: 150,
    rating: 5,
    downloads: 342,
    featured: true,
    thumbnail: "/images/resources/math.jpg",
  },
  {
    id: 2,
    title: "Grade 7 English Notes",
    grade: "Grade 7",
    subject: "English",
    type: "Notes",
    description: "Comprehensive CBC English Notes.",
    price: 120,
    rating: 4.8,
    downloads: 215,
    featured: false,
    thumbnail: "/images/resources/english.jpg",
  },
  {
    id: 3,
    title: "Grade 9 Integrated Science CAT",
    grade: "Grade 9",
    subject: "Integrated Science",
    type: "CAT",
    description: "Assessment with marking scheme.",
    price: 100,
    rating: 4.9,
    downloads: 180,
    featured: true,
    thumbnail: "/images/resources/science.jpg",
  },
  {
    id: 4,
    title: "Grade 6 Kiswahili Revision",
    grade: "Grade 6",
    subject: "Kiswahili",
    type: "Revision",
    description: "Revision questions and answers.",
    price: 80,
    rating: 4.7,
    downloads: 140,
    featured: false,
    thumbnail: "/images/resources/kiswahili.jpg",
  },
  {
    id: 5,
    title: "Grade 10 Biology Notes",
    grade: "Grade 10",
    subject: "Biology",
    type: "Notes",
    description: "Senior School Biology Notes.",
    price: 200,
    rating: 5,
    downloads: 97,
    featured: true,
    thumbnail: "/images/resources/biology.jpg",
  },
  {
    id: 6,
    title: "Grade 11 Chemistry Exams",
    grade: "Grade 11",
    subject: "Chemistry",
    type: "Exams",
    description: "CBC Chemistry Exam Papers.",
    price: 220,
    rating: 4.9,
    downloads: 126,
    featured: false,
    thumbnail: "/images/resources/chemistry.jpg",
  },
];
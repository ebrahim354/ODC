the public route => GET '/'
will send in some basic courses information







# STUDENTS

---

* student routes should be prefixed with `/student`
* student register => POST `/student/register`
body {
   email,password, phone, address, college, name
}

* verify your account after register => POST `/student/verify`
body{
  code, email
}

* student register => POST `/student/login`
body {
  email or phone, password
}

* student's profile is a combination of his latest revisions and his current in compmlete exam.
the latest revisions => GET `/student/profile`

* student enroll => GET `/student/enroll/:courseId`
* get student's current incomplete exam => GET `/student/exam`
* save exam changes and come retrive them later (before it expires) => POST `/student/save-answers/:examId`
body{
  answers[ 
     { answer, id }
  ]
}

* submit exam (before it expires) can't change it after=> POST `/student/submit/:examId`
body{
  answers[ 
    { answer, id }
  ]
}





# ADMINs

---

* admin routes should be prefixed with `/admin`

* admin log in => POST `/admin/login`
body {
  email, password
}

* see all the student of the system => GET `/admin/students`

* adding a new admin and send email that they are added (for super admins only) => POST `/admin/add-admin`
body {
  name, email, role, image
}

### CRUD operations on (category, course, trainer)

* get one detailed entity => GET `/admin/(course, category, trainer)`
* get all entities => GET `/admin/(courses, categories, trainers)/:id`
* set one entity => POST `/admin/(course, category, trainer)`
 body for course {
  name, level, category, instructors: string[]
}
 body for category {
  name
}
 body for trainer {
  name
}
* update one entity => PUT `/admin/(courses, categories, trainers)/:id`
body for course {
  name, level, category
}
body for category {
  name
}
body for trainer {
  name
}

* delete one entity => DELETE `/admin/(courses, categories, trainers)/:id`

### trainers crud and assigning for courses.

* assign a trainer for a course => POST `/admin/assign`
body {
  trainerId, courseId
}

* unassign a trainer for a course => POST `/admin/unassign`
body {
  trainerId, courseId
}
### viewing pending exams to review them (examReviewrs and super admin only). 

* view pending exams for specific course => GET `/admin/pending-exams/:courseId`
* view pending one pending exam => GET `/admin/pending-exam/:examId`

* accept an exam and create a revision
and send email to the accepted student => POST `/admin/accept/:examId`
body {
  maxDegree, minDegree, degree
}

* reject an exam and create a revision
and send email to the rejected student => POST `/admin/reject/:examId`
body {
  maxDegree, minDegree, degree
}

### adding,removing and viewing questions from the system.
* add a question to the system => POST `/admin/question`
options are optional.

body {
  content, category, options: string[]
}

* get all the questions of the system
(add some filters later e.g limit or category) => GET `/admin/questions`

* delete a question from the system => DELETE `/admin/questions/:questionId`

### control expiration dates for exams.

* expire all exams => POST `/expire`
* expire an exam => POST `/expire/:examId`
change exams expiration data => POST `/expires-in/:examId`
body{
  date
}

### control admins and roles (super admin only).
* set a role for an admin => POST `set-role/:targetId`
body {
   role
}

* adding a new admin and send email that they are added (for super admins only) => POST `/admin/add-admin`
body {
name, email, role, image
}

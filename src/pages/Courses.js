import { Fragment, useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
// import coursesData from '../data/coursesData';


export default function Courses() {

	const [courses, setCourses] = useState([]);

	// console.log(coursesData);
	// console.log(coursesData[0]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setCourses(data.map(course => {
				return (
					<CourseCard  key={course._id} courseProp={course} />
				)
			}))

		})
	}, [])	


	// const courses = coursesData.map(course => {
	// 	return (
	// 		<CourseCard  key={course.id} courseProp={course} />
	// 	)
	// })

	return (
		<Fragment>
			<h1 className="text-center my-3">Courses</h1>
			{courses}
		</Fragment>

	)
}
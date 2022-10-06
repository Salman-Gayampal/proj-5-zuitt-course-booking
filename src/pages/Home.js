import { Fragment } from "react";
import Banner from '../components/Banner';
import Highlights from "../components/Highlights";
// import CourseCard from "../components/CourseCard";

export default function Home() {
   
   const data = {
        title: "Zuitt Coding Bootcamp",
        content: "Opportunities for everyone, everywhere",
        destination: "/courses",
        label: "Enroll now!"
   }
   
    return (

        <Fragment>
            <Banner data={data} />
            <Highlights />
            {/* <CourseCard /> */}
        </Fragment>

    )
};
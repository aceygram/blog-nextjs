import AllBlogs from "../../../components/AllBlogs";
import Subscribe from '../../../components/Subscribe';


export default function Blog() {
    return (
        <div className="container-fluid p-0">
            <AllBlogs />
            <Subscribe sectionClassName='light-bg primary-text my-0 alternate p-5'/>
        </div>
    )
}
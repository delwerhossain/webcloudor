import { Router } from 'express';
import { CourseControllers } from './Course.controller';
import { CombineCourseReview } from '../../CombineControllers/SIngleCourseWithReviews';

const router = Router();

router.put('/:courseId', CourseControllers.updateCourse);
router.post('/', CourseControllers.CreateCourse);
router.get('/', CourseControllers.GetallCourse);
router.get('/best', CourseControllers.GetBestReview);
router.get(
  '/:courseId/reviews',
  CombineCourseReview.GetSingleCourseWithReviews,
);
router.get('/:courseId', CourseControllers.GetSingleCourse);
router.delete('/:courseId', CourseControllers.deleteCourse);



export const CourseRoutes = router;

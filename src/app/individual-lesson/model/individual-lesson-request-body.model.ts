export interface IndividualLessonRequestBody {
  title: string;
  startDateOfLesson: Date;
  endDateOfLesson: Date;
  description: string;
  subdomainName: string;
  tutorId: string;
  studentId: string;
}

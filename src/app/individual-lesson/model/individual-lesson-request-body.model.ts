export interface IndividualLessonRequestBody {
  title: string;
  startDateOfLesson: Date;
  endDateOfLesson: Date;
  description: string;
  subdomainAlias: string;
  tutorId: string;
  studentId: string;
  filesIds: number[];
}

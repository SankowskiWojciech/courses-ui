export interface IndividualLessonRequestBody {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  subdomainAlias: string;
  tutorId: string;
  studentId: string;
  filesIds: string[];
}

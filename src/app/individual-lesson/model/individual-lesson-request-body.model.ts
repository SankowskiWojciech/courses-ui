export interface IndividualLessonRequestBody {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  subdomainAlias: string;
  studentId: string;
  filesIds: string[];
}

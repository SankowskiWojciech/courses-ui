import { FileInformation } from 'src/app/file/model/file-information.model';

export interface IndividualLesson {
  lessonId: number;
  title: string;
  startDateOfLesson: Date;
  endDateOfLesson: Date;
  description: string;
  subdomainName: string;
  tutorEmailAddress: string;
  studentFullName: string;
  studentEmailAddress: string;
  filesInformation: FileInformation[];
}

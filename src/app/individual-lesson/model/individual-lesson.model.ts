import { FileInformation } from 'src/app/file/model/file-information.model';

export interface IndividualLesson {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  subdomainName: string;
  tutorEmailAddress: string;
  studentFullName: string;
  studentEmailAddress: string;
  filesInformation: FileInformation[];
}

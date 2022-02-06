import { FileInformation } from 'src/app/shared/feature/file/model/file-information.model';

export interface IndividualLesson {
  id: string;
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
